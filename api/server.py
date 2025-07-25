from flask import Flask, request, jsonify,g
from flask_cors import CORS
from app.db.session.session import SessionLocal
from app.routes.index import api
from app.config.config import Config
import os
app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://test-full-stack-python-react-ts1cg5vfj-juantobon7s-projects.vercel.app",
            "http://localhost:5173/"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
    })

if __name__ == "__main__":
    app.config.from_object(Config)
    
    app.register_blueprint(api, url_prefix='/api')
    
    @app.before_request
    def start_session():
        g.db = SessionLocal()

    @app.teardown_request
    def close_session(exception=None):
        db = g.pop("db", None)
        if db:
            if exception:
                db.rollback()
            else:
                db.commit()
            db.close()
    
    port = int(os.environ.get("PORT", 5000))  # Render define PORT, si no está usa 5000
    app.run(host='0.0.0.0', port=port)