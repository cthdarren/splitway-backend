from typing import Annotated, Any, Dict, Sequence

from sqlalchemy import Row, text
from fastapi import APIRouter, Header
from app.sqlalchemyclient import engine
from pydantic import BaseModel

class CreateGroupItem(BaseModel):
    name: str
    category: str
    currency: str

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
    # responses={404: {"description": "Not found"}},
)

@router.get("/")
async def getGroups() -> Dict:
    groupData = []
    with engine.connect() as c:
        result = c.execute(text('SELECT id, name, category, currency, sharelink from "Group";'))
        groupData.extend(result.mappings().all())
        # result = c.execute(text('SELECT username, email, status, pictureurl from "User"'))
        # for row in result:
        #     groupData.append({'id': row.id, 'name': row.name, 'category': row.category, 'currency': row.currency, 'sharelink': row.sharelink})


    return {'success': True, 'data': groupData}


@router.post("/create")
async def createGroups(data: CreateGroupItem, authorization: Annotated[str|None, Header()] = None):

    return {'bearer_token': authorization, 'data' : data}


