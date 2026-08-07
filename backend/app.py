import os

from flask import Flask
from flask_cors import CORS
from routes import register_routes
from utils.logger import configure_logging


def create_app() -> Flask:
    configure_logging()
    app = Flask(__name__)
    CORS(app)
    register_routes(app)
    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5000))
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() in {"1", "true", "yes"}
    app.run(debug=debug_mode, port=port)
