from flask import Blueprint

from .restaurant.restaurant_routes import restaurant_routes
from .restaurant.reservation_restaurant_routes import reservation_routes
from .user.geo_routes import geo_routes

api = Blueprint('api_routes', __name__,url_prefix='/api')

api.register_blueprint(restaurant_routes)
api.register_blueprint(geo_routes)
api.register_blueprint(reservation_routes)