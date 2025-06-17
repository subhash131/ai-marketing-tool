from fastapi import FastAPI
from routes.workflow import router as workflow_router
from routes.execution import router as execution_router
from routes.user import router as user_router
from routes.agent import router as agent_router
from routes.credential import router as credential_router


app = FastAPI()
app.include_router(workflow_router)
app.include_router(execution_router)
app.include_router(user_router)
app.include_router(agent_router)
app.include_router(credential_router)
