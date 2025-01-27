from typing import Dict
from prisma import Prisma
from pydantic import Json
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

    users :list[User] = await prisma.user.find_many()
    print(users)

    await prisma.disconnect()

    return {'data': users}


@router.post("/create")
async def createGroups():
    return {'data': "POST Groups/Create"}


