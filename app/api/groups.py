from typing import Annotated, Dict

from prisma.models import Group
from fastapi import APIRouter, Header

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
    # responses={404: {"description": "Not found"}},
)

@router.get("/")
async def getGroups() -> Dict:
    groupData = {}

    return {'success': True, 'data': groupData}


@router.post("/create")
async def createGroups(authorization: Annotated[str|None, Header()] = None):

    return {'data': authorization}


