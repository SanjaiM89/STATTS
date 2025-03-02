from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import random
import string
import cv2
import numpy as np
import base64
import face_recognition
import requests
from bson import ObjectId
from database import devices_collection, users_collection
from auth import hash_password, create_access_token, verify_password
from models import SignupModel, LoginModel, DeviceLink
import socket
app = FastAPI()

# 🔹 Generate Serial Number
def generate_serial():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

# 🔹 Generate User ID
def generate_user_id():
    return ''.join(random.choices(string.digits, k=8))

def get_network_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]
    s.close()
    return ip

NETWORK_IP = get_network_ip()

# 🔹 Blur Effect Request
class BlurEffectRequest(BaseModel):
    x: int
    y: int
    width: int
    height: int
    blur_strength: Optional[int] = 51

# 🔹 Signup
@app.post("/signup/")
async def signup(user: SignupModel):
    existing_user = users_collection.find_one({"phone_no": user.phone_no})
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    hashed_password = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["user_id"] = generate_user_id()
    
    users_collection.insert_one(user_dict)

    return {"message": "User signed up successfully", "user_id": user_dict["user_id"]}

# 🔹 Login
@app.post("/login/")
async def login(user: LoginModel):
    existing_user = users_collection.find_one({"phone_no": user.phone_no})
    if not existing_user or not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    access_token = create_access_token(data={"user_id": existing_user["user_id"]})

    return {"message": "Login successful", "access_token": access_token}

# 🔹 Admin Device Registration
@app.post("/admin/add_device/")
async def admin_add_device(device: DeviceLink):
    serial_no = generate_serial()
    user_id = generate_user_id()
    hashed_password = hash_password(device.password)
    stream_link = f"http://{NETWORK_IP}:8080/stream/{serial_no}"

    device_dict = device.dict()
    device_dict.update({
        "serial_no": serial_no,
        "user_id": user_id,
        "password": hashed_password,
        "stream_link": stream_link
    })

    devices_collection.insert_one(device_dict)

    return {"message": "Device registered successfully", "serial_no": serial_no, "stream_link": stream_link}

# 🔹 Set Blur Effect
@app.post("/blurEffect/{serial_no}")
async def set_blur(serial_no: str, blur: BlurEffectRequest):
    device = devices_collection.find_one({"serial_no": serial_no})
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    if blur.blur_strength % 2 == 0:
        blur.blur_strength += 1

    devices_collection.update_one({"serial_no": serial_no}, {"$set": {"blur_params": blur.dict()}})

    return {"message": "Blur effect applied successfully"}

# 🔹 Apply Blur
def apply_blur(frame, serial_no):
    device = devices_collection.find_one({"serial_no": serial_no})
    if device and "blur_params" in device:
        params = device["blur_params"]
        x, y, w, h, blur_strength = params["x"], params["y"], params["width"], params["height"], params["blur_strength"]

        roi = frame[y:y+h, x:x+w]
        blurred = cv2.GaussianBlur(roi, (blur_strength, blur_strength), 0)
        frame[y:y+h, x:x+w] = blurred

    return frame

# 🔹 Video Streaming
def generate_frames(serial_no):
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = apply_blur(frame, serial_no)
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

# 🔹 Stream API
@app.get("/stream/{serial_no}")
async def stream(serial_no: str):
    return StreamingResponse(generate_frames(serial_no), media_type="multipart/x-mixed-replace; boundary=frame")

# 🔹 Door Unlock with Face Recognition
@app.post("/door_unlock/")
async def door_unlock(image: str, phone_no: str):
    user = users_collection.find_one({"phone_no": phone_no})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    image_bytes = base64.b64decode(image)
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    face_encodings = face_recognition.face_encodings(img)
    if len(face_encodings) == 0:
        return {"message": "No Unlock"}

    known_encodings = np.array(user["face_encoding"])
    result = face_recognition.compare_faces([known_encodings], face_encodings[0])

    if result[0]:
        return {"message": "Unlocked"}
    else:
        return {"message": "No Unlock"}

@app.post("/add_device/")
async def add_device(device: DeviceLink):
    payload = requests.get(f"http://{NETWORK_IP}:8080/device_info/{device.serial_no}").json()
    if "serial_no" not in payload:
        raise HTTPException(status_code=404, detail="Device not found")

    devices_collection.insert_one({
        "user_id": device.user_id,
        "serial_no": payload["serial_no"],
        "stream_link": payload["stream_link"]
    })

    return {"message": "Device linked successfully"}

@app.get("/")
async def root():
    return {"message": "Door Alarm System Backend"}
