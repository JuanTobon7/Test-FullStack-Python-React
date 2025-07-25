from flask import g
from app.model.geo.departament import DepartmentModel
from app.model.geo.cities import CityModel

class GeoService:
    @staticmethod
    def get_depart_cities():
            res = g.db.query(CityModel).all()
            return list([city.to_dict() for city in res])