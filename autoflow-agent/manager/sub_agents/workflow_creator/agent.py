from google.adk.agents import Agent,LoopAgent
from ..workflow_node_creator.agent import workflow_node_creator

from .prompt import PROMPT


# Create the workflow node generator agent
workflow_creator = Agent(
    name="workflow_creator",
    model="gemini-2.0-flash",
    description="An agent that guides the users to create the workflows, add nodes, delete nodes.",
    instruction= PROMPT,
    sub_agents=[workflow_node_creator],
)
