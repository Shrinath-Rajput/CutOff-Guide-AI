import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("MONGO_DB_NAME", "cutoff_db")
MONGO_CONNECT_TIMEOUT_MS = int(os.getenv("MONGO_CONNECT_TIMEOUT_MS", "10000"))


def get_mongo_client() -> MongoClient:
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=MONGO_CONNECT_TIMEOUT_MS,
    )
    try:
        client.admin.command("ping")
    except ConnectionFailure as exc:
        logging.error("Unable to connect to MongoDB: %s", exc)
        raise
    logging.info("Connected to MongoDB database %s", DATABASE_NAME)
    return client


client = get_mongo_client()

db = client[DATABASE_NAME]
