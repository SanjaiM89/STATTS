from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["doorbell_system"]
users_collection = db["users"]
devices_collection = db["devices"]
