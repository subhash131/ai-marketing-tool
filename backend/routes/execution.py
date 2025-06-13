from fastapi import APIRouter,HTTPException,Body,Query
from models.execution import WorkflowExecution, ExecutionPhase, ExecutionLog, WorkflowExecutionUpdate,ExecutionPhaseUpdate
from pymongo import ReturnDocument,UpdateOne
from serializer.execution import serialize_execution,serialize_phase,serialize_executions_with_phase_id
from bson import ObjectId
from typing import Optional
from db import db
from pymongo import DESCENDING

router = APIRouter()

@router.get("/execution/{execution_id}")
async def get_execution_by_id(execution_id: str):
    if not ObjectId.is_valid(execution_id):
        raise HTTPException(status_code=400, detail="Invalid execution ID format")

    execution = await db.workflowexecutions.find_one({"_id": ObjectId(execution_id)})
    if not execution:
        raise HTTPException(status_code=404, detail="execution not found")

    phase_ids = execution.get("phases", [])
    if phase_ids:
        phases_cursor = db.executionphases.find({"_id": {"$in": phase_ids}}).sort("number", 1)
        phases = [serialize_phase(phase) async for phase in phases_cursor]
        execution["phases"] = phases
    else:
        execution["phases"] = []

    serialized_execution = serialize_execution(execution)
    return serialized_execution

@router.get("/executions")
async def get_workflow_executions_by_id(workflowId: str = Query(..., alias="workflowId")):
    if not ObjectId.is_valid(workflowId):
        raise HTTPException(status_code=400, detail="Invalid workflow ID format")

    cursor = db.workflowexecutions.find({"workflowId": workflowId}).sort("startedAt", DESCENDING)
    executions = [execution async for execution in cursor]

    if not executions:
        raise HTTPException(status_code=404, detail="No executions found")

    serialized_executions = serialize_executions_with_phase_id(executions)
    return serialized_executions


@router.patch("/execution/{execution_id}")
async def update_execution(execution_id: str, execution: WorkflowExecutionUpdate):
    execution_dict = execution.model_dump(exclude_unset=True)  

    result = await db.workflowexecutions.find_one_and_update(
        {"_id": ObjectId(execution_id)},
        {"$set": execution_dict},
        return_document=ReturnDocument.AFTER
    )

    if not result:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return {"id": str(result["_id"])}


    

@router.post("/execution")
async def create_execution(execution: WorkflowExecution, phases: list[ExecutionPhase]):
    # Step 1: Insert the WorkflowExecution
    result = await db.workflowexecutions.insert_one(execution.model_dump())
    execution_id = result.inserted_id

    # Step 2: Prepare and insert ExecutionPhases with workflowExecutionId
    phase_docs = [
        {
            **phase.model_dump(),
            "workflowExecutionId": execution_id
        }
        for phase in phases
    ]
    phase_result = await db.executionphases.insert_many(phase_docs)

    # Step 3: Update WorkflowExecution with the inserted phase IDs
    phase_ids = phase_result.inserted_ids
    await db.workflowexecutions.update_one(
        {"_id": execution_id},
        {"$set": {"phases": phase_ids}}
    )

    return {"id": str(execution_id), "phases": [str(pid) for pid in phase_ids]}


@router.post("/execution/phase")
async def create_phase(phase: ExecutionPhase):
    result = await db.executionphases.insert_one(phase.model_dump())
    return {"id": str(result.inserted_id)}

@router.get("/phase/{phase_id}")
async def get_phase_by_id(phase_id: str):
    if not ObjectId.is_valid(phase_id):
        raise HTTPException(status_code=400, detail="Invalid phase ID format")
    phase = await db.executionphases.find_one({"_id": ObjectId(phase_id)})
    logs = []
    for log_id in phase.get("logs", []):
        log = await db.executionlogs.find_one({"_id": ObjectId(log_id)})
        if log:
            logs.append(log)

    
    if not phase:
        raise HTTPException(status_code=404, detail="execution phase not found")

    return serialize_phase(phase, logs)

@router.post("/execution/phases")
async def create_phases(phases: list[ExecutionPhase]):
    # Convert list of Pydantic models to list of dicts
    data = [phase.model_dump() for phase in phases]
    
    result = await db.executionphases.insert_many(data)

    return  [str(_id) for _id in result.inserted_ids]


@router.patch("/execution/phase/{executionId}")
async def update_execution_phase_by_id(executionId: str, phase: ExecutionPhaseUpdate, logs: Optional[list[ExecutionLog]] = Body(default=None)):
    phase_dict = phase.model_dump(exclude_unset=True)
    update_doc = {"$set": {}}
    log_ids_to_add = []

    print(phase_dict)
    if logs:
        inserted = await db.executionlogs.insert_many([log.model_dump() for log in logs])
        log_ids_to_add = inserted.inserted_ids

        # Append inserted log IDs to phase_dict.logs
        if "logs" in phase_dict:
            phase_dict["logs"].extend([str(_id) for _id in log_ids_to_add])
        else:
            phase_dict["logs"] = [str(_id) for _id in log_ids_to_add]

    # If logs are included, insert them into executionlogs collection
    if "logs" in phase_dict:
        logs_obj_ids = [ObjectId(log_id) for log_id in phase_dict.pop("logs")]
        update_doc["$push"] = {"logs": {"$each": logs_obj_ids}}

    # Add other fields to $set
    update_doc["$set"].update(phase_dict)
    if not update_doc["$set"]:
        del update_doc["$set"]

    # Perform the update
    result = await db.executionphases.find_one_and_update(
        {"_id": ObjectId(executionId)},
        update_doc,
        return_document=ReturnDocument.AFTER
    )

    if not result:
        raise HTTPException(status_code=404, detail="Execution phase not found")

    return {
        "id": str(result["_id"]),
        "new_logs": [str(_id) for _id in log_ids_to_add]
    }




@router.patch("/bulk/execution/phases")
async def update_phases(phases: list[ExecutionPhaseUpdate]):
    if not phases:
        raise HTTPException(status_code=400, detail="No phases provided")

    operations = []
    for phase in phases:
        if not phase.id:
            raise HTTPException(status_code=422, detail="Each phase must have an 'id'")

        update_data = phase.model_dump(exclude_unset=True)
        phase_id = update_data.pop("id")

        operations.append(
            UpdateOne({"_id": ObjectId(phase_id)}, {"$set": update_data})
        )

    if operations:
        result = await db.executionphases.bulk_write(operations)
        return {
            "matched": result.matched_count,
            "modified": result.modified_count,
        }

    return {"matched": 0, "modified": 0}


@router.post("/log")
async def create_log(log: ExecutionLog):
    phase_id = log.executionPhaseId
    result = await db.executionlogs.insert_one(log.model_dump())
    res = await db.executionphases.find_one({"_id": ObjectId(phase_id)})
    exeResult = await db.executionphases.find_one_and_update(
        {"_id": ObjectId(phase_id)},
        {"$push": {"logs": result.inserted_id}},
        return_document=ReturnDocument.AFTER
    )
    print("res",res)
    print("phase_id",phase_id)
    print("Exe-result",exeResult)
    return {"id": str(result.inserted_id)}
