from flask import request, jsonify
from app.model.response.res import ResponseModel
from app.services.admin.restaurant.reservation_service import ReservationService

from app.model.error.app_exception import AppException
import uuid

class ReservationController:
    @staticmethod
    def get_reservation(restaurant_id: uuid,date_str: str):
        try:            
            reservations = ReservationService.get_reservation(restaurant_id,date_str)
            res = ResponseModel.success(data=reservations)
            return jsonify(res.to_dict()), 200
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500
        
    @staticmethod
    def create_reservation(restaurant_id: uuid):
        try:
            data = request.get_json()
            data['restaurant_id'] = restaurant_id
            print(f"Creating reservation for restaurant {restaurant_id} with data: {data}")
            reservation = ReservationService.create_reservation(data)
            res = ResponseModel.success(data=reservation)
            return jsonify(res.to_dict()), 201
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500