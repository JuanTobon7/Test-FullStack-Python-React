from flask import Blueprint,jsonify
from app.controller.user.geo_controller import GeoController

geo_routes = Blueprint('geo_routes', __name__, url_prefix='/cities')

@geo_routes.route('/', methods=['GET'])
def get_depart_cities():
    # Aquí iría la lógica para obtener los departamentos
    return GeoController.get_depart_cities()
    