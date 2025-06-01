from fastapi import APIRouter
from models.workflow import Workflow
from serializer.workflow import serialize_workflow
from bson import ObjectId
from db import db

router = APIRouter()

@router.post("/workflow")
async def create_workflow(workflow: Workflow):
    workflow_dict = workflow.dict()
    result = await db.workflows.insert_one(workflow_dict)
    return {"id": str(result.inserted_id)}

@router.get("/workflow/{workflow_id}")
async def get_workflow(workflow_id: str):
    workflow = await db.workflows.find_one({"_id": ObjectId(workflow_id)})
    return serialize_workflow(workflow)
