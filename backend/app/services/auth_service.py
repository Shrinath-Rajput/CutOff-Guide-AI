import os
import random
import secrets
import json
import urllib.request as urllib_request
import urllib.error as urllib_error
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException
from app.core.config import settings

OTP_TTL_SECONDS = 300

async def _store_otp(phone: str, otp: int, db, session_id: str = None) -> str:
    if session_id is None:
        session_id = secrets.token_hex(8)
    
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(seconds=OTP_TTL_SECONDS)
    
    otp_doc = {
        "session_id": session_id,
        "phone": phone,
        "otp": str(otp),
        "created_at": now,
        "expires_at": expires_at,
        "verified": False
    }
    
    # Store in MongoDB 'otps' collection
    await db.otps.insert_one(otp_doc)
    return session_id

async def _consume_otp_session(session_id: str, phone: str, otp: str, db) -> bool:
    query = {"phone": phone}
    if session_id:
        query["session_id"] = session_id
        
    # Find the latest OTP for this phone/session
    otp_doc = await db.otps.find_one(query, sort=[("created_at", -1)])
    
    if not otp_doc:
        return False
        
    if otp_doc.get("verified"):
        return False
        
    # Ensure timezone awareness matches
    now = datetime.now(timezone.utc)
    expires_at = otp_doc.get("expires_at")
    
    # If expires_at is naive, make it aware (motor sometimes returns naive depending on setup)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
        
    if now > expires_at:
        return False
        
    if str(otp_doc.get("otp")) != str(otp):
        return False
        
    # Mark as verified and consume
    await db.otps.update_one(
        {"_id": otp_doc["_id"]},
        {"$set": {"verified": True, "verified_at": now}}
    )
    return True

async def send_otp_sms(phone: str, db) -> dict:
    otp = random.randint(100000, 999999)
    print(f"OTP generation: SUCCESS")
    
    normalized_phone = phone.replace("+91", "").replace(" ", "").strip()
    if not normalized_phone.isdigit() or len(normalized_phone) < 10:
        raise HTTPException(status_code=400, detail="Invalid phone number format")
        
    print(f"SMS provider: Fast2SMS")
    print(f"SMS request: SENT TO PROVIDER for +91{normalized_phone}")
    
    is_development = settings.OTP_MODE.lower() == "development"
    
    if is_development:
        print(f"\n=====================================")
        print(f"   [DEVELOPMENT OTP MODE ACTIVE]")
        print(f"   MOCK SMS DELIVERED TO {normalized_phone}")
        print(f"   YOUR OTP IS: {otp}")
        print(f"=====================================\n")
        session_id = await _store_otp(phone, otp, db)
        return {"session_id": session_id, "dev_otp": str(otp)}
        
    api_key = settings.FAST_TO_SMS_API_KEY
    if not api_key:
        raise HTTPException(status_code=500, detail="SMS provider configuration is missing")

    message = f"Your verification OTP is {otp}. It is valid for 5 minutes."
    request_params = {
        "numbers": normalized_phone,
        "message": message,
        "route": "q",
        "language": "english",
        "flash": "0",
    }
    
    url = "https://www.fast2sms.com/dev/bulkV2"
    data = json.dumps(request_params).encode("utf-8")
    headers = {
        "authorization": api_key,
        "Content-Type": "application/json",
    }
    req = urllib_request.Request(url, data=data, headers=headers, method="POST")

    print("SMS provider request initiated")
    try:
        with urllib_request.urlopen(req, timeout=10) as response:
            response_text = response.read().decode("utf-8", "ignore")
            status_code = response.status
            try:
                response_json = json.loads(response_text)
            except Exception:
                response_json = response_text
                
            print(f"Provider HTTP status: {status_code}")
            
            # Determine success based on HTTP code and Fast2SMS "return" field
            is_success = (status_code == 200)
            if isinstance(response_json, dict) and response_json.get("return") is False:
                is_success = False
                
            print(f"Provider success: {is_success}")
            print(f"Provider response: {response_json}")
            
            if status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to send SMS via provider")
                
            if not is_success:
                error_msg = response_json.get("message", "Unknown Fast2SMS error")
                raise HTTPException(status_code=500, detail=f"SMS API Error: {error_msg}")

            session_id = await _store_otp(phone, otp, db)
            return_data = {"session_id": session_id}
            
            if isinstance(response_json, dict) and "request_id" in response_json:
                return_data["provider_request_id"] = response_json["request_id"]
                print(f"Provider accepted request. Request ID: {response_json['request_id']}")
                
            return return_data

    except urllib_error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", "ignore")
        print(f"Provider HTTP status: {exc.code}")
        print(f"Provider success: False")
        print(f"Provider response: {error_body}")
        try:
            err_json = json.loads(error_body)
            err_msg = err_json.get("message", f"SMS provider error: {exc.code}")
        except Exception:
            err_msg = f"SMS provider error: {exc.code}"
            
        raise HTTPException(status_code=500, detail=err_msg) from exc

    except HTTPException:
        raise
    except Exception as exc:
        print(f"SMS provider exception: {str(exc)}")
        raise HTTPException(status_code=500, detail="Internal error during SMS delivery") from exc

async def verify_otp_sms(phone: str, otp: str, session_id: str, db) -> bool:
    return await _consume_otp_session(session_id=session_id, phone=phone, otp=otp, db=db)
