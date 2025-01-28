from prisma import Base64
from faker import Faker
from typing import Optional
from app.prisma.prismaclient import prisma
import base64

fake = Faker()

async def create_fake_user(username :Optional[str] = None) -> str:
    if username == None:
        usern = fake.user_name()
    else:
        usern = username
    await prisma.user.create(data = {
        'id': str(fake.uuid4()), 
        'username': usern, 
        'pwhash':fake.password(), 
        'salt': Base64(base64.b64encode("hehehehe".encode("ascii"))), 
        'email':fake.email(), 
        'locale':"en_SG", 
        'status':"ACTIVE", 
        'pictureurl':fake.image_url(),
    })

    return usern
