def serialize_execution(execution) -> dict:
    return {
        "id": str(execution["_id"]),
        "workflowId": execution["workflowId"],
        "userId": execution["userId"],
        "trigger": execution["trigger"],
        "status": execution["status"],
        "createdAt": execution["createdAt"],
        "startedAt": execution.get("startedAt"),
        "completedAt": execution.get("completedAt"),
        "creditsConsumed": execution.get("creditsConsumed"),
        "definition": execution.get("definition"),
        "phases": execution.get("phases", [])
    }

def serialize_execution_with_phase_id(execution) -> dict:
    return {
        "id": str(execution["_id"]),
        "workflowId": execution["workflowId"],
        "userId": execution["userId"],
        "trigger": execution["trigger"],
        "status": execution["status"],
        "createdAt": execution["createdAt"],
        "startedAt": execution.get("startedAt"),
        "completedAt": execution.get("completedAt"),
        "creditsConsumed": execution.get("creditsConsumed"),
        "definition": execution.get("definition"),
        "phases": [str(p) for p in execution.get("phases", [])]
    }

def serialize_execution(execution) -> dict:
    return {
        "id": str(execution["_id"]),
        "workflowId": execution["workflowId"],
        "userId": execution["userId"],
        "trigger": execution["trigger"],
        "status": execution["status"],
        "createdAt": execution["createdAt"],
        "startedAt": execution.get("startedAt"),
        "completedAt": execution.get("completedAt"),
        "creditsConsumed": execution.get("creditsConsumed"),
        "definition": execution.get("definition"),
        "phases": execution.get("phases", [])
    }


def serialize_executions(executions: list[dict]) -> list[dict]:
    return [serialize_execution(exe) for exe in executions]

def serialize_executions_with_phase_id(executions: list[dict]) -> list[dict]:
    return [serialize_execution_with_phase_id(exe) for exe in executions]


def serialize_phase(phase: dict, logs: list[dict] = None) -> dict:
    return {
        "id": str(phase["_id"]),
        "userId": phase["userId"],
        "status": phase["status"],
        "number": phase["number"],
        "node": phase["node"],
        "name": phase["name"],
        "startedAt": phase.get("startedAt"),
        "completedAt": phase.get("completedAt"),
        "inputs": phase.get("inputs"),
        "outputs": phase.get("outputs"),
        "creditsConsumed": phase.get("creditsConsumed"),
        "workflowExecutionId": str(phase["workflowExecutionId"]) if "workflowExecutionId" in phase else None,
        "logs": [serialize_log(log) for log in logs] if logs else [str(log_id) for log_id in phase.get("logs", [])]
    }


def serialize_phases(phases: list[dict]) -> list[dict]:
    return [serialize_phase(phase) for phase in phases]



def serialize_log(log) -> dict:
    return {
        "id": str(log["_id"]),
        "executionPhaseId": log["executionPhaseId"],
        "logLevel": log["logLevel"],
        "message": log["message"],
        "timestamp": log["timestamp"]
    }

def serialize_logs(logs: list[dict]) -> list[dict]:
    return [serialize_log(log) for log in logs]

