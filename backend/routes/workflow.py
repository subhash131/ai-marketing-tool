from fastapi import APIRouter,HTTPException
from models.workflow import Workflow
from models.workflow import WorkflowUpdate
from serializer.workflow import serialize_workflow
from bson import ObjectId
from db import db

router = APIRouter()

@router.get("/workflow/{workflow_id}")
async def get_workflow(workflow_id: str):
    workflow = await db.workflows.find_one({"_id": ObjectId(workflow_id)})
    return serialize_workflow(workflow)

@router.post("/workflow")
async def create_workflow(workflow: Workflow):
    workflow_dict = workflow.model_dump()
    result = await db.workflows.insert_one(workflow_dict)
    return {"id": str(result.inserted_id)}


@router.patch("/workflow/{workflow_id}")
async def update_workflow(workflow_id: str, workflow: WorkflowUpdate):
    workflow_dict = workflow.model_dump(exclude_unset=True)  

    result = await db.workflows.find_one_and_update(
        {"_id": ObjectId(workflow_id)},
        {"$set": workflow_dict},
        return_document=True
    )

    if not result:
        raise HTTPException(status_code=404, detail="Workflow not found")

    return {"id": str(result["_id"])}
