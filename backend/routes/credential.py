from fastapi import APIRouter,HTTPException,Query
from models.credential import Credential, CredentialUpdate
from serializer.credential import serialize_credential,serialize_credentials
from bson import ObjectId
from db import db

router = APIRouter()

@router.get("/credentials")
async def get_credentials_by_user_id(userId: str = Query(..., description="User ID (ObjectId)")):
    try:
        credentials_cursor = db.credentials.find({"userId": userId}).sort("createdAt", -1)
        credentials = await credentials_cursor.to_list(length=None)

        if not credentials:
            return []
        return serialize_credentials(credentials)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/credential/{credential_id}")
async def get_credential_by_id(credential_id: str):
    if not ObjectId.is_valid(credential_id):
        raise HTTPException(status_code=400, detail="Invalid credential ID format")
    credential = await db.credentials.find_one({"_id": ObjectId(credential_id)})
    if not credential:
        raise HTTPException(status_code=404, detail="credential not found")
    return serialize_credential(credential)


@router.post("/credential")
async def create_credential(credential: Credential):
    credential_dict = credential.model_dump()
    result = await db.credentials.insert_one(credential_dict)
    return {"id": str(result.inserted_id)}

@router.delete("/credential/{credentialId}")
async def delete_credential(credentialId: str):
    try:
        result = await db.credentials.find_one_and_delete({"_id": ObjectId(credentialId)})
        if result is None:
            raise HTTPException(status_code=404, detail="credential not found")
        return {"message": "credential deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/credential/{credential_id}")
async def update_credential(credential_id: str, credential: CredentialUpdate):
    credential_dict = credential.model_dump(exclude_unset=True)  

    result = await db.credentials.find_one_and_update(
        {"_id": ObjectId(credential_id)},
        {"$set": credential_dict},
        return_document=True
    )

    if not result:
        raise HTTPException(status_code=404, detail="credential not found")

    return {"id": str(result["_id"])}
