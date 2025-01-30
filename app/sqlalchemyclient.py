from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

db_url :(str | None) = os.getenv('DATABASE_URL')

if db_url == None:
    raise KeyError("Failed to get database url string, check .env file!") 

engine = create_engine(db_url, echo=True)
