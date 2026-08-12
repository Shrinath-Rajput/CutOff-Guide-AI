import json
import logging
import os
import random
import re
import secrets
import threading
from datetime import datetime, timezone
from pathlib import Path
from urllib import error as urllib_error
from urllib import parse as urllib_parse
from urllib import request as urllib_request

from dotenv import load_dotenv
from flask import Blueprint, jsonify, redirect, request

from config import get_users_collection

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

FAST_TO_SMS_API_KEY = os.getenv("FAST_TO_SMS_API_KEY")
COMPANY_GOOGLE_AUTH_URL = os.getenv("COMPANY_GOOGLE_AUTH_URL")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_OAUTH_REDIRECT_URI = os.getenv(
    "GOOGLE_OAUTH_REDIRECT_URI",
    "http://localhost:5000/api/auth/google/callback",
)
FRONTEND_APP_URL = os.getenv("FRONTEND_APP_URL", "http://localhost:5173")
OTP_TTL_SECONDS = int(os.getenv("OTP_TTL_SECONDS", "300"))

OTP_SESSIONS = {}
OTP_PHONE_LOOKUPS = {}
OTP_LOCK = threading.Lock()


def build_otp_sms_message(otp):
    return f"Your verification OTP is {otp}. It is valid for 5 minutes."


def build_fast2sms_bulk_request(phone, message):
    return {
        "numbers": phone,
        "message": message,
        "route": "q",
        "language": "english",
        "flash": "0",
    }


def register_routes(app):
    api = Blueprint("api", __name__, url_prefix="/api")

    def create_or_update_user(payload):
        uid = (payload.get("uid") or "").strip()
        if not uid:
            phone = (payload.get("phone") or "").strip()
            email = (payload.get("email") or "").strip().lower()
            provider = (payload.get("provider") or "phone").strip()
            if phone:
                uid = f"{provider}-{phone}"
            elif email:
                uid = f"{provider}-{email}"
            else:
                uid = f"{provider}-{secrets.token_hex(6)}"

        name = (payload.get("name") or "User").strip()
        email = (payload.get("email") or "").strip().lower()
        phone = (payload.get("phone") or "").strip()
        provider = (payload.get("provider") or "phone").strip()
        photo_url = (payload.get("photoURL") or payload.get("photo") or "").strip()

        collection = get_users_collection()
        if collection is None:
            return jsonify({"status": "error", "message": "MongoDB is unavailable"}), 503

        now = datetime.now(timezone.utc)
        filter_query = {"uid": uid}
        if email:
            filter_query = {"$or": [{"uid": uid}, {"email": email}]}

        existing_user = collection.find_one(filter_query)
        if existing_user:
            collection.update_one(
                {"_id": existing_user["_id"]},
                {
                    "$set": {
                        "name": name or existing_user.get("name", "User"),
                        "email": email or existing_user.get("email", ""),
                        "phone": phone or existing_user.get("phone", ""),
                        "provider": provider or existing_user.get("provider", "phone"),
                        "photoURL": photo_url or existing_user.get("photoURL", ""),
                        "lastLogin": now,
                    }
                },
            )
            updated_user = collection.find_one({"_id": existing_user["_id"]})
            updated_user["_id"] = str(updated_user["_id"])
            # Also include a stable `id` field for frontend convenience
            updated_user["id"] = updated_user["_id"]
            return jsonify(
                {
                    "status": "success",
                    "message": "User authenticated",
                    "token": f"token-{uid}",
                    "user": updated_user,
                }
            )

        new_user = {
            "uid": uid,
            "name": name,
            "email": email,
            "phone": phone,
            "provider": provider,
            "photoURL": photo_url,
            "createdAt": now,
            "lastLogin": now,
        }
        result = collection.insert_one(new_user)
        new_user["_id"] = str(result.inserted_id)
        new_user["id"] = new_user["_id"]
        return jsonify(
            {
                "status": "success",
                "message": "User registered",
                "token": f"token-{uid}",
                "user": new_user,
            }
        )

    def _normalize_phone_for_sms(phone):
        digits = re.sub(r"\D", "", phone or "")
        if not digits:
            return ""

        # Local 10-digit Indian number -> prepend country code
        if len(digits) == 10:
            return f"91{digits}"

        # Leading 0 followed by 10 digits -> drop leading zero and prepend country code
        if digits.startswith("0") and len(digits) == 11:
            return f"91{digits[1:]}"

        # Already includes country code (e.g. 91xxxxxxxxxx)
        if digits.startswith("91") and len(digits) == 12:
            return digits

        # Fall back: accept numbers between 11 and 15 digits (international style)
        if 11 <= len(digits) <= 15:
            return digits

        return ""

    def _build_google_auth_url():
        params = {
            "client_id": GOOGLE_CLIENT_ID,
            "redirect_uri": GOOGLE_OAUTH_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "online",
            "prompt": "select_account",
        }
        return "https://accounts.google.com/o/oauth2/v2/auth?" + urllib_parse.urlencode(params)

    def _exchange_google_code(code):
        token_url = "https://oauth2.googleapis.com/token"
        data = urllib_parse.urlencode(
            {
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_OAUTH_REDIRECT_URI,
                "grant_type": "authorization_code",
            }
        ).encode("utf-8")

        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        request_obj = urllib_request.Request(token_url, data=data, headers=headers, method="POST")
        with urllib_request.urlopen(request_obj, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))

    def _fetch_google_user_info(access_token):
        request_obj = urllib_request.Request(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
            method="GET",
        )
        with urllib_request.urlopen(request_obj, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))

    def _build_frontend_callback_url(token, user):
        query = urllib_parse.urlencode(
            {
                "token": token,
                "uid": user.get("uid", ""),
                "name": user.get("name", ""),
                "email": user.get("email", ""),
                "photoURL": user.get("photoURL", ""),
            }
        )
        return f"{FRONTEND_APP_URL}/auth/google/callback?{query}"

    def _send_fast2sms_otp(phone, otp):
        if not FAST_TO_SMS_API_KEY:
            raise RuntimeError("FAST_TO_SMS_API_KEY is not configured")

        normalized_phone = _normalize_phone_for_sms(phone)
        if not normalized_phone:
            raise RuntimeError("Phone number is required")

        message = build_otp_sms_message(otp)
        request_params = build_fast2sms_bulk_request(normalized_phone, message)

        logging.info("[AUTH] Using plain Fast2SMS SMS route")
        logging.info("[AUTH] Fast2SMS endpoint: https://www.fast2sms.com/dev/bulkV2")
        logging.info("[AUTH] Fast2SMS route: q")

        # Write the request payload for local debugging without exposing the API key.
        try:
            debug_path = Path(__file__).resolve().parent / "fast2sms_debug.json"
            with open(debug_path, "w", encoding="utf-8") as fh:
                fh.write(json.dumps(request_params))
        except Exception:
            pass

        url = "https://www.fast2sms.com/dev/bulkV2"
        data = json.dumps(request_params).encode("utf-8")
        headers = {
            "authorization": FAST_TO_SMS_API_KEY,
            "Content-Type": "application/json",
        }
        req = urllib_request.Request(url, data=data, headers=headers, method="POST")

        try:
            with urllib_request.urlopen(req, timeout=20) as response:
                response_text = response.read().decode("utf-8", "ignore")
                status_code = response.status
                try:
                    response_json = json.loads(response_text)
                except Exception:
                    response_json = response_text
                logging.info("[AUTH] Fast2SMS HTTP status: %s", status_code)
                logging.info("[AUTH] Fast2SMS response: %s", response_json)
                return {"status_code": status_code, "body": response_text}
        except urllib_error.HTTPError as exc:
            error_body = exc.read().decode("utf-8", "ignore")
            try:
                error_json = json.loads(error_body)
            except Exception:
                error_json = error_body
            logging.info("[AUTH] Fast2SMS HTTP status: %s", exc.code)
            logging.info("[AUTH] Fast2SMS response: %s", error_json)
            raise RuntimeError(f"Fast2SMS request failed with HTTP {exc.code}: {error_body}") from exc
        except Exception as exc:
            logging.info("[AUTH] Fast2SMS request failed: %s", str(exc))
            raise RuntimeError(f"Fast2SMS request failed: {exc}") from exc

    def _store_otp(phone, otp, session_id=None):
        if session_id is None:
            session_id = secrets.token_hex(8)

        expires_at = int(datetime.now(timezone.utc).timestamp()) + OTP_TTL_SECONDS
        with OTP_LOCK:
            OTP_SESSIONS[session_id] = {"phone": phone, "otp": otp, "expires_at": expires_at}
            OTP_PHONE_LOOKUPS[phone] = session_id

        return session_id

    def _get_otp_session(session_id=None, phone=None):
        now = int(datetime.now(timezone.utc).timestamp())
        with OTP_LOCK:
            if session_id:
                entry = OTP_SESSIONS.get(session_id)
                if entry and entry.get("expires_at", 0) >= now:
                    return entry

            if phone:
                phone_session_id = OTP_PHONE_LOOKUPS.get(phone)
                if phone_session_id:
                    entry = OTP_SESSIONS.get(phone_session_id)
                    if entry and entry.get("expires_at", 0) >= now:
                        return entry

            return None

    def _consume_otp_session(session_id=None, phone=None, otp=None):
        with OTP_LOCK:
            entry = None
            if session_id:
                entry = OTP_SESSIONS.get(session_id)
            if not entry and phone:
                phone_session_id = OTP_PHONE_LOOKUPS.get(phone)
                if phone_session_id:
                    entry = OTP_SESSIONS.get(phone_session_id)

            if not entry:
                return False

            now = int(datetime.now(timezone.utc).timestamp())
            if entry.get("expires_at", 0) < now:
                OTP_SESSIONS.pop(session_id, None)
                OTP_PHONE_LOOKUPS.pop(phone, None)
                return False

            if otp is not None and str(entry.get("otp")) != str(otp):
                return False

            OTP_SESSIONS.pop(session_id, None)
            OTP_PHONE_LOOKUPS.pop(phone, None)
            return True

    @api.route("/")
    def home():
        return {
            "status": "success",
            "message": "CutOff Guide Backend Running Successfully",
        }

    @api.route("/health")
    def health_check():
        return {"status": "healthy"}

    @api.route("/auth/send-otp", methods=["POST"])
    def send_otp():
        payload = request.get_json(silent=True) or {}
        name = (payload.get("name") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        phone = (payload.get("phone") or "").strip()

        if not name:
            return jsonify({"status": "error", "message": "Name is required"}), 400
        if not email:
            return jsonify({"status": "error", "message": "Email is required"}), 400
        if not phone:
            return jsonify({"status": "error", "message": "Phone is required"}), 400
        # Normalize/validate phone rather than requiring strict E.164 from the UI
        normalized_phone = _normalize_phone_for_sms(phone)
        if not normalized_phone:
            return jsonify({"status": "error", "message": "Phone number is invalid"}), 400

        if not FAST_TO_SMS_API_KEY:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "FAST_TO_SMS_API_KEY is not configured in backend/.env",
                    }
                ),
                501,
            )

        otp = random.randint(100000, 999999)
        try:
            resp = _send_fast2sms_otp(normalized_phone, otp)
            # Parse provider body safely for decision making
            status_code = None
            parsed = None
            if isinstance(resp, dict):
                status_code = resp.get("status_code")
                body = resp.get("body")
                try:
                    parsed = json.loads(body) if body else None
                except Exception:
                    parsed = None

            # Determine success robustly: accept any 2xx HTTP status or provider success indicators
            success = False
            if status_code is not None:
                try:
                    status_int = int(status_code)
                    if 200 <= status_int < 300:
                        success = True
                except Exception:
                    pass

            if parsed:
                return_value = parsed.get("return")
                if return_value in (True, "true", "True", "1", 1):
                    success = True
                if str(parsed.get("status", "")).lower() == "success":
                    success = True
                if parsed.get("request_id"):
                    success = True

            # Log safe debugging info (no API keys or OTPs)
            logging.info("[AUTH] Fast2SMS debug - HTTP status: %s", status_code)
            logging.info("[AUTH] Fast2SMS debug - response: %s", parsed)
            logging.info("[AUTH] send-otp decision: %s", "SUCCESS" if success else "ERROR")

            if not success:
                # Surface provider message for debugging without exposing secrets
                raise RuntimeError(f"Fast2SMS error: {parsed or body}")
        except RuntimeError as exc:
            return jsonify({"status": "error", "message": str(exc)}), 502

        session_id = _store_otp(normalized_phone, otp)
        return jsonify({"status": "success", "message": "OTP sent successfully", "sessionId": session_id})

    @api.route("/auth/verify-otp", methods=["POST"])
    def verify_otp():
        payload = request.get_json(silent=True) or {}
        name = (payload.get("name") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        phone = (payload.get("phone") or "").strip()
        otp = (payload.get("otp") or "").strip()
        session_id = (payload.get("sessionId") or "").strip()

        if not name:
            return jsonify({"status": "error", "message": "Name is required"}), 400
        if not email:
            return jsonify({"status": "error", "message": "Email is required"}), 400
        if not phone:
            return jsonify({"status": "error", "message": "Phone is required"}), 400
        if not otp:
            return jsonify({"status": "error", "message": "OTP is required"}), 400
        # Normalize the phone for lookup
        normalized_phone = _normalize_phone_for_sms(phone)
        if not normalized_phone:
            return jsonify({"status": "error", "message": "Phone number is invalid"}), 400

        if not _consume_otp_session(session_id=session_id, phone=normalized_phone, otp=otp):
            return jsonify({"status": "error", "message": "OTP is invalid or expired"}), 400

        user_payload = {
            "uid": f"phone-{normalized_phone}",
            "name": name,
            "email": email,
            "phone": normalized_phone,
            "provider": "phone",
        }
        return create_or_update_user(user_payload)

    @api.route("/auth/login", methods=["POST"])
    def login_user():
        payload = request.get_json(silent=True) or {}
        return create_or_update_user(payload)

    @api.route("/auth/google", methods=["GET", "POST"])
    def google_auth():
        if request.method == "GET":
            if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
                return redirect(_build_google_auth_url())

            if COMPANY_GOOGLE_AUTH_URL:
                return redirect(COMPANY_GOOGLE_AUTH_URL)

            missing_vars = []
            if not GOOGLE_CLIENT_ID:
                missing_vars.append("GOOGLE_CLIENT_ID")
            if not GOOGLE_CLIENT_SECRET:
                missing_vars.append("GOOGLE_CLIENT_SECRET")
            if not COMPANY_GOOGLE_AUTH_URL:
                missing_vars.append("COMPANY_GOOGLE_AUTH_URL")

            return (
                jsonify(
                    {
                        "status": "error",
                        "message": (
                            "Google OAuth credentials are not configured. "
                            "Set "
                            + ", ".join(missing_vars)
                            + " in backend .env."
                        ),
                    }
                ),
                501,
            )

        payload = request.get_json(silent=True) or {}
        return create_or_update_user(payload)

    @api.route("/auth/google/callback", methods=["GET"])
    def google_auth_callback():
        error = request.args.get("error")
        if error:
            return jsonify({"status": "error", "message": f"Google auth failed: {error}"}), 400

        code = (request.args.get("code") or "").strip()
        if not code:
            return jsonify({"status": "error", "message": "Missing authorization code from Google callback."}), 400

        if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": (
                            "Google auth credentials are not configured. "
                            "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend .env."
                        ),
                    }
                ),
                501,
            )

        try:
            token_response = _exchange_google_code(code)
            access_token = token_response.get("access_token")
            if not access_token:
                raise RuntimeError("Failed to obtain access token from Google")

            user_info = _fetch_google_user_info(access_token)
            email = (user_info.get("email") or "").strip().lower()
            name = (user_info.get("name") or user_info.get("given_name") or "Google User").strip()
            picture = (user_info.get("picture") or "").strip()

            if not email:
                return (
                    jsonify(
                        {"status": "error", "message": "Google account did not return an email address."}
                    ),
                    400,
                )

            user_payload = {
                "uid": f"google-{email}",
                "name": name,
                "email": email,
                "provider": "google",
                "photoURL": picture,
            }

            create_response = create_or_update_user(user_payload)
            if isinstance(create_response, tuple):
                response_obj, status_code = create_response
            else:
                response_obj = create_response
                status_code = 200

            if status_code != 200 and status_code != 201:
                return create_response

            response_json = json.loads(response_obj.get_data(as_text=True))
            token = response_json.get("token")
            user = response_json.get("user") or {}
            callback_url = _build_frontend_callback_url(token, user)
            return redirect(callback_url)
        except Exception as exc:
            logging.exception("Google callback error")
            return (
                jsonify({"status": "error", "message": f"Google callback failed: {exc}"}),
                502,
            )

    @api.route("/auth/register", methods=["POST"])
    def register_user():
        payload = request.get_json(silent=True) or {}
        return create_or_update_user(payload)

    app.register_blueprint(api)
