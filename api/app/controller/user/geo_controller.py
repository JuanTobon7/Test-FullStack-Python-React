from flask import request, jsonify
from app.model.response.res import ResponseModel, ResponseStatus
from app.services.user.geo_service import GeoService


class GeoController:
    @staticmethod
    def get_depart_cities():
        try:
            cities = GeoService.get_depart_cities()
            res = ResponseModel.success(data=cities)
            return jsonify(res.to_dict()), 200
        except Exception as e:
            res = ResponseModel.error(message=str(e))
            return jsonify(res.to_dict()), 500