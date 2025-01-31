from fastapi.testclient import TestClient
from app.main import app
from app.faker.user import create_fake_user
import json
import pytest

client = TestClient(app)

async def test_group_create():
    await create_fake_user("testing")
    fake_token = "Bearer asdf123109fusdfj"
    response = client.post("/groups/create", headers={"Authorization": "Bearer asdf123109fusdfj"}, json={
    "name": "cthdarren8",
    "category": "cthdarren8",
    "currency": "cthdarren8",
    "userId": "cthdarren8"
})
    assert response.status_code == 200
    assert json.loads(response.content)["bearer_token"] == fake_token

