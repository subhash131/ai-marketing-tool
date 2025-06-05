from fastapi import APIRouter,HTTPException,Query
from models.workflow import Workflow
from models.workflow import WorkflowUpdate
from serializer.workflow import serialize_workflow, serialize_workflows
from bson import ObjectId
from db import db

router = APIRouter()

@router.get("/workflows")
async def get_workflows_by_user_id(userId: str = Query(..., description="User ID (ObjectId)")):
    try:
        workflows_cursor = db.workflows.find({"userId": userId})
        workflows = await workflows_cursor.to_list(length=None)

        if not workflows:
            raise HTTPException(status_code=404, detail="No workflows found for the given userId")
        return serialize_workflows(workflows)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/workflow/{workflow_id}")
async def get_workflow_by_id(workflow_id: str):
    if not ObjectId.is_valid(workflow_id):
        raise HTTPException(status_code=400, detail="Invalid workflow ID format")
    workflow = await db.workflows.find_one({"_id": ObjectId(workflow_id)})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
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
