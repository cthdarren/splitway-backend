import asyncio
from prisma import Prisma
from typing import Union

from fastapi import FastAPI

app = FastAPI()

# async def main() -> None:


@app.get("/")
async def read_root():
    prisma = Prisma()
    await prisma.connect()

    user = await prisma.group.find_many()

    await prisma.disconnect()

    return user


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
