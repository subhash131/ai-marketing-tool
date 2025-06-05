from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Workflow(BaseModel):
    userId: str
    name: str
    description: Optional[str]
    definition: str
    executionPlan: str
    cron: str
    status: str
    creditsCost: int
    lastRunAt: Optional[datetime]
    lastRunId: Optional[str]
    lastRunStatus: Optional[str]
    nextRunAt: Optional[datetime]
    createdAt: datetime
    updatedAt: datetime



class WorkflowUpdate(BaseModel):
    userId: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    definition: Optional[str] = None
    executionPlan: Optional[str] = None
    cron: Optional[str] = None
    status: Optional[str] = None
    creditsCost: Optional[int] = None
    lastRunAt: Optional[datetime] = None
    lastRunId: Optional[str] = None
    lastRunStatus: Optional[str] = None
    nextRunAt: Optional[datetime] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

