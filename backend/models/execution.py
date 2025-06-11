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
    definition:Optional[str]= None
    phases: list[str]

class WorkflowExecutionUpdate(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    workflowId: Optional[str] = None
    userId: Optional[str] = None
    trigger: Optional[str] = None
    status: Optional[str] = None
    createdAt: Optional[datetime] = None
    startedAt: Optional[datetime] = None
    completedAt: Optional[datetime]= None
    creditsConsumed: Optional[int]= None
    definition:Optional[str] = None
    phases: Optional[list[str]] = None

class ExecutionPhaseUpdate(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    userId: Optional[str] = None
    status: Optional[str] = None
    number: Optional[int] = None
    node: Optional[str] = None
    name: Optional[str] = None
    startedAt: Optional[datetime]= None
    completedAt: Optional[datetime]= None
    inputs: Optional[str] = None
    outputs: Optional[str] = None
    creditsConsumed: Optional[int]= None
    workflowExecutionId: Optional[str] = None
    logs: Optional[list[str]] = []


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
    logs: Optional[list[str]]= []


class ExecutionLog(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    executionPhaseId: str
    logLevel: str
    message: str
    timestamp: datetime


class ExecutionLogUpdate(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    executionPhaseId: Optional[str] = None
    logLevel: Optional[str] = None
    message: Optional[str] = None
    timestamp: Optional[datetime] = None
