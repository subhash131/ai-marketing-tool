from google.adk.agents import Agent

from .sub_agents.workflow_creator.agent import workflow_creator
from .sub_agents.workflow_getter.agent import workflow_getter
from .manager_prompt import PROMPT

root_agent = Agent(
    name="manager",
    model="gemini-2.0-flash",
    description="Manager agent",
    instruction= PROMPT,
    sub_agents=[ workflow_creator, workflow_getter],
    
)
