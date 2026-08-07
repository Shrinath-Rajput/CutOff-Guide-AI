from flask import Blueprint


def register_routes(app):
    api = Blueprint("api", __name__)


    @api.route("/")
    def home():
        return {
            "status": "success",
            "message": "CutOff Guide Backend Running Successfully"
        }


    @api.route("/health")
    def health_check():
        return {"status": "healthy"}


    app.register_blueprint(api)
