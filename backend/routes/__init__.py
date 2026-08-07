from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from config import get_users_collection


def register_routes(app):
    api = Blueprint("api", __name__, url_prefix="/api")

    @api.route("/")
    def home():
        return {
            "status": "success",
            "message": "CutOff Guide Backend Running Successfully",
        }

    @api.route("/health")
    def health_check():
        return {"status": "healthy"}

    @api.route("/auth/register", methods=["POST"])
    def register_user():
        payload = request.get_json(silent=True) or {}
        uid = (payload.get("uid") or "").strip()
        if not uid:
            return jsonify({"status": "error", "message": "uid is required"}), 400

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
        return jsonify(
            {
                "status": "success",
                "message": "User registered",
                "token": f"token-{uid}",
                "user": new_user,
            }
        )

    app.register_blueprint(api)
