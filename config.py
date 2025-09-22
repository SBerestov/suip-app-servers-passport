import os
import urllib.parse as up

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-3854')

    DATABASE_URL = os.getenv("DATABASE_URL")

    if DATABASE_URL:
        up.uses_netloc.append("postgres")
        url = up.urlparse(DATABASE_URL)

        DB_CONFIG = {
            "host": url.hostname,
            "database": url.path[1:],
            "user": url.username,
            "password": url.password,
            "port": url.port
        }
    else:
        DB_CONFIG = {
            "host": os.getenv('DB_HOST', 'localhost'),
            "database": os.getenv('DB_NAME', 'inform'),
            "user": os.getenv('DB_USER', 'postgres'),
            "password": os.getenv('DB_PASSWORD', 'admin'),
            "port": os.getenv('DB_PORT', 5432)
        }