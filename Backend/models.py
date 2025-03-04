from pydantic import BaseModel, Field
from typing import Optional

class SignupModel(BaseModel):
    username: str
    phone_no: str
    password: str

class LoginModel(BaseModel):
    phone_no: str
    password: str

class DeviceLink(BaseModel):
    serial_no: str

class BlurEffectRequest(BaseModel):
    x: int
    y: int
    width: int
    height: int
    blur_strength: Optional[int] = 51
