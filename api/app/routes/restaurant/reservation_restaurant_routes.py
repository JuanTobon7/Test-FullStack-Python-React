from flask import Blueprint, request
from app.controller.admin.restaurant.reservation_controller import ReservationController
import uuid
from datetime import datetime

reservation_routes = Blueprint('reservation_routes', __name__, url_prefix='/admin/restaurant')

@reservation_routes.route('/<uuid:restaurant_id>/reservations', methods=['POST'])
def create_reservations(restaurant_id: uuid.UUID):
    return ReservationController.create_reservation(restaurant_id)

@reservation_routes.route('/<uuid:restaurant_id>/reservations/<date_str>', methods=['GET'])
def get_reservations(restaurant_id: uuid.UUID, date_str: str):
    return ReservationController.get_reservation(restaurant_id,date_str)