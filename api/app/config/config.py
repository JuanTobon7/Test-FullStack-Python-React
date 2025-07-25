import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env
env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
class Config:
#    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
        
    
