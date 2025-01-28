from fastapi.testclient import TestClient
from app.main import app
from app.faker.user import create_fake_user
import json

client = TestClient(app)

async def test_group_create():
    await create_fake_user("testing")
    fake_token = "Bearer asdf123109fusdfj"
    response = client.post("/groups/create", headers={"Authorization": "Bearer asdf123109fusdfj"})
    assert response.status_code == 200
    assert json.loads(response.content)["data"] == fake_token

