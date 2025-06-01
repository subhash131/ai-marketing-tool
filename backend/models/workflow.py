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
