from faker import Faker
from typing import Optional
import base64

fake = Faker()

async def create_fake_user(username :Optional[str] = None) -> str:
    if username == None:
        usern = fake.user_name()
    else:
        usern = username

    return usern
