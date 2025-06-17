def serialize_credential(credential) -> dict:
    return {
        "id": str(credential["_id"]),
        "userId": credential["userId"],
        "name": credential["name"],
        "value": credential["value"],
        # "createdAt": credential["createdAt"],
        # "updatedAt": credential["updatedAt"]
    }

def serialize_credentials(credentials: list[dict]) -> list[dict]:
    return [serialize_credential(cr) for cr in credentials]