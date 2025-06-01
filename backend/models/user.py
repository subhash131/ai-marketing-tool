from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    username: str = Field(..., min_length=3, max_length=30)
    email: EmailStr
    displayName: str = Field(..., min_length=1, max_length=100)
    password: str = Field(..., min_length=8)
    
    avatarUrl: Optional[str] = None
    bio: Optional[str] = None
    roles: List[str] = Field(default_factory=lambda: ["user"])
    isActive: bool = True
    isVerified: bool = False
    
    
