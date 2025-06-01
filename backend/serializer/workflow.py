def serialize_workflow(workflow) -> dict:
    return {
        "id": str(workflow["_id"]),
        "userId": workflow["userId"],
        "name": workflow["name"],
        "description": workflow.get("description"),
        "definition": workflow["definition"],
        "executionPlan": workflow["executionPlan"],
        "cron": workflow["cron"],
        "status": workflow["status"],
        "creditsCost": workflow["creditsCost"],
        "lastRunAt": workflow.get("lastRunAt"),
        "lastRunId": workflow.get("lastRunId"),
        "lastRunStatus": workflow.get("lastRunStatus"),
        "nextRunAt": workflow.get("nextRunAt"),
        "createdAt": workflow["createdAt"],
        "updatedAt": workflow["updatedAt"]
    }
