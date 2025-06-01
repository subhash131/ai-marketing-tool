from fastapi import APIRouter

endpoints = APIRouter()

@endpoints.get("/")
def home():
    return{
        "status":"ok","message":"Home endpoint"
    }