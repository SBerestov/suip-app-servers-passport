import os

class Config:
    DB_CONFIG = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'database': os.getenv('DB_NAME', 'inform'),
        'user': os.getenv('DB_USER', 'postgres'),
        'password': os.getenv('DB_PASSWORD', 'admin')
    }
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-3854')