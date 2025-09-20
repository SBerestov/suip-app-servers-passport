from flask import Flask
from flask_cors import CORS
from config import Config
from .routes.main import main_bp
from .routes.api import api_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(api_bp, origins="http://localhost:3000")
    
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp, url_prefix='/api')
    
    return app