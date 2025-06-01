def serialize_execution(execution) -> dict:
    execution["id"] = str(execution["_id"])
    return execution
