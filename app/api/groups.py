from typing import Dict
from app.prisma.prismaclient import prisma

from prisma.models import Group, User
from fastapi import APIRouter

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
    # responses={404: {"description": "Not found"}},
)

@router.get("/")
async def getGroups() -> Dict:
    await prisma.connect()

    groupData :list[Group] = await prisma.group.find_many()

    await prisma.disconnect()

    return {'success': True, 'data': groupData}


@router.post("/create")
async def createGroups():
    return {'data': "POST Groups/Create"}


