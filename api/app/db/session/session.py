from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.config import Config

DATABASE_URL = Config.SQLALCHEMY_DATABASE_URI

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)
