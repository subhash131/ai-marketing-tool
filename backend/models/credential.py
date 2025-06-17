from pydantic import BaseModel
from typing import Optional

class Credential(BaseModel):
    userId: str
    name: str
    value: str



class CredentialUpdate(BaseModel):
    userId: Optional[str]
    name: Optional[str]
    value: Optional[str]

