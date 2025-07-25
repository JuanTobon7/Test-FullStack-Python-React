from flask import request, jsonify
from app.model.response.res import ResponseModel
from app.services.admin.restaurant.restaurant_service import RestaurantService
from app.model.error.app_exception import AppException
import uuid

class RestaurantController:
    @staticmethod
    def save_restaurant():
        try:
            data = request.get_json()
            restaurant = RestaurantService.save_restaurant(data=data)
            res = ResponseModel.success(data=restaurant.to_dict())
            return jsonify(res.to_dict()), 201
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500
        
    @staticmethod
    def update_restaurant(restaurant_id: uuid):
        try:
            data = request.get_json()
            restaurant = RestaurantService.update_restaurant(restaurant_id=restaurant_id, data=data)
            res = ResponseModel.success(data=restaurant.to_dict())
            return jsonify(res.to_dict()), 200
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500

    @staticmethod
    def get_all():
        try:
            start_with = request.args.get('startWith')
            city = request.args.get('cityId')
            aviability = request.args.get('aviability')
            date = request.args.get('date')
            response = RestaurantService.get_all(start_with=start_with,city_id=city,aviability=aviability,date=date)
            res = ResponseModel.success(data=response)
            return jsonify(res.to_dict()), 200
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500
    
    @staticmethod
    def delete_restaurant(restaurant_id: uuid):
        try:
            RestaurantService.delete_restaurant(restaurant_id)
            res = ResponseModel.success(data='deleted')
            return jsonify(res.to_dict()), 200
            
        except AppException as ae:
            res = ResponseModel.error(message=str(ae), data=ae.data)
            return jsonify(res.to_dict()), ae.status_code
        except Exception as e:
            res = ResponseModel.from_exception(e)
            return jsonify(res.to_dict()), 500