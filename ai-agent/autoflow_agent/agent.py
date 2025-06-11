
from google.adk.agents import Agent


def generate_workflow_definition() -> dict:
    """
    Returns the JSON workflow execution definition
    """

    return {
        "nodes":[
            {
                "id": "d7f51558-9021-4fbd-b478-00756f6a7043",
                "type": "FlowScrapeNode",
                "dragHandle": ".drag-handle",
                "data": { type: "LAUNCH_BROWSER", "inputs": {} },
                "position": { "x": 98.2020904114888, "y": -9.558095358288227 },
                "measured": { "width": 320, "height": 193 },
            }
        ]
    }


root_agent = Agent(
    name="weather_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to generate workflow definitions."
    ),
    instruction=(
        """
        You are a helpful agent who assist the user in workflow generation using the provided tools
        *IMPORTANT* do not include any text or explanation.
        """
    ),
    tools=[generate_workflow_definition],
)