from fastapi import APIRouter, HTTPException
from models.user import User
from db import db
from utils.security import hash_password
from serializer.user import serialize_user
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/user/register")
async def register_user(user: User):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.model_dump()
    user_dict["password"] = hash_password(user_dict["password"])
    user_dict["createdAt"] = datetime.now()
    user_dict["updatedAt"] = datetime.now()

    result = await db.users.insert_one(user_dict)
    new_user = await db.users.find_one({"_id": result.inserted_id})
    return {"status": "success", "data": serialize_user(new_user)}

@router.get("/user/{user_id}")
async def get_user(user_id: str):
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"status": "success", "data": serialize_user(user)}
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID")
