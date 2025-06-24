from google.adk.agents import Agent
from .prompt import PROMPT


# Create the workflow node generator agent
workflow_node_creator = Agent(
    name="workflow_node_creator",
    model="gemini-2.0-flash",
    description="An agent that helps users create, list nodes for the workflows.",
    instruction= PROMPT,
)
