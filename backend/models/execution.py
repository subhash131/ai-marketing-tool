from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class WorkflowExecution(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    workflowId: str
    userId: str
    trigger: str
    status: str
    createdAt: datetime
    startedAt: Optional[datetime] = None
    completedAt: Optional[datetime]= None
    creditsConsumed: Optional[int]= None
    phases: list[str]


class ExecutionPhase(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    userId: str
    status: str
    number: int
    node: str
    name: str
    startedAt: Optional[datetime]= None
    completedAt: Optional[datetime]= None
    inputs: Optional[str] = None
    outputs: Optional[str] = None
    creditsConsumed: Optional[int]= None
    workflowExecutionId: str

class ExecutionLog(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    executionPhaseId: str
    logLevel: str
    message: str
    timestamp: datetime
