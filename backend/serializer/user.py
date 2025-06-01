from bson import ObjectId
from typing import List

def serialize_user(user) -> dict:
    return {
        "id": str(user.get("_id")),
        "username": user.get("username"),
        "email": user.get("email"),
        "displayName": user.get("displayName"),
        "avatarUrl": user.get("avatarUrl"),
        "bio": user.get("bio"),
        "roles": user.get("roles", []),
        "isActive": user.get("isActive", True),
        "isVerified": user.get("isVerified", False),
        "createdAt": user.get("createdAt"),
        "updatedAt": user.get("updatedAt"),
    }

def serialize_users(users: List[dict]) -> List[dict]:
    return [serialize_user(user) for user in users]
