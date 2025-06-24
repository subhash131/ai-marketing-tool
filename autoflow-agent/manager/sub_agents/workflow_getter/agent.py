from google.adk.agents import Agent

from .prompt import PROMPT


# Create the workflow node generator agent
workflow_getter = Agent(
    name="workflow_getter",
    model="gemini-2.0-flash",
    description="An agent that gets the workflow definition",
    instruction= PROMPT,
)
