from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_group_create():
    response = client.post("/groups/create")
    print(response.content)
    assert response.status_code == 200

