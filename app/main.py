from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import groups

app = FastAPI()
app.include_router(groups.router)

origins = [
    "http://localhost",
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
