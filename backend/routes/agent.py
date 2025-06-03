from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AskRequest(BaseModel):
    query: str

@router.post("/ask_ai")
async def ask_ai(data: AskRequest):
    return data    