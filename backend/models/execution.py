from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WorkflowExecution(BaseModel):
    id: Optional[str]
    workflowId: str
    userId: str
    trigger: str
    status: str
    createdAt: datetime
    startedAt: Optional[datetime]
    completedAt: Optional[datetime]
    creditsConsumed: int

class ExecutionPhase(BaseModel):
    id: Optional[str]
    userId: str
    status: str
    number: int
    node: str
    name: str
    startedAt: datetime
    completedAt: Optional[datetime]
    inputs: str
    outputs: str
    creditsConsumed: int
    workflowExecutionId: str

class ExecutionLog(BaseModel):
    id: Optional[str]
    executionPhaseId: str
    logLevel: str
    message: str
    timestamp: datetime
