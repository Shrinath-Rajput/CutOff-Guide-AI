import unittest

from routes import build_fast2sms_bulk_request, build_otp_sms_message


class Fast2SMSHelperTests(unittest.TestCase):
    def test_build_otp_sms_message_contains_otp_and_expiry(self):
        message = build_otp_sms_message("123456")
        self.assertIn("123456", message)
        self.assertIn("5 minutes", message)

    def test_build_fast2sms_bulk_request_uses_supported_fields_only(self):
        params = build_fast2sms_bulk_request("919876543210", "Hello OTP")
        self.assertEqual(params["numbers"], "919876543210")
        self.assertEqual(params["message"], "Hello OTP")
        self.assertEqual(params["route"], "q")
        self.assertEqual(params["language"], "english")
        self.assertEqual(params["flash"], "0")
        self.assertNotIn("variables_values", params)
        self.assertNotIn("otp_id", params)


if __name__ == "__main__":
    unittest.main()
