from fastapi import APIRouter
from models.execution import WorkflowExecution, ExecutionPhase, ExecutionLog
from serializer.execution import serialize_execution
from bson import ObjectId
from db import db

router = APIRouter()

@router.post("/execution")
async def create_execution(execution: WorkflowExecution):
    result = await db.workflowexecutions.insert_one(execution.dict())
    return {"id": str(result.inserted_id)}

@router.post("/phase")
async def create_phase(phase: ExecutionPhase):
    result = await db.executionphases.insert_one(phase.dict())
    return {"id": str(result.inserted_id)}

@router.post("/log")
async def create_log(log: ExecutionLog):
    result = await db.executionlogs.insert_one(log.dict())
    return {"id": str(result.inserted_id)}
