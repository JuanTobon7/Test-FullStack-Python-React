from app.controller.admin.restaurant.restaurant_controller import RestaurantController
from flask import request,jsonify,Blueprint


restaurant_routes = Blueprint('admin_routes',__name__,url_prefix='/admin')

@restaurant_routes.route('/restaurant', methods=['POST'])
def save_restaurant():
    return RestaurantController.save_restaurant()

@restaurant_routes.route('/restaurant',methods=['GET'])
def get_restaurant_all():
    return RestaurantController.get_all()

@restaurant_routes.route('/restaurant/<uuid:restaurant_id>', methods=['PUT'])
def update_restaurant(restaurant_id):
    return RestaurantController.update_restaurant(restaurant_id)


@restaurant_routes.route('/restaurant/<uuid:restaurant_id>', methods=['DELETE'])
def delete_restaurant(restaurant_id):
    return RestaurantController.delete_restaurant(restaurant_id)