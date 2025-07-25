from flask import Flask, request, jsonify,g
from flask_cors import CORS
from app.db.session.session import SessionLocal
from app.routes.index import api
from app.config.config import Config

app = Flask(__name__)

CORS(app)

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
    
    app.run(debug=True)