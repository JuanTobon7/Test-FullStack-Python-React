from flask import g
from app.model.restaurant.restaurant import RestaurantModel
from app.model.restaurant.restaurant_dto import RestaurantCreateDTO
from app.model.error.app_exception import AppException
from pydantic import ValidationError
from app.model.geo.cities import CityModel
from app.model.restaurant.reservation import Reservation
from sqlalchemy import func
import uuid
import datetime
class RestaurantService:
    @staticmethod
    def save_restaurant(data) -> RestaurantModel:
        if not data:
            raise AppException("Missing restaurant data", status_code=400)         

        try:
            dto = RestaurantCreateDTO(**data)

            restaurant = RestaurantModel(**dto.model_dump())
            g.db.add(restaurant)
            g.db.commit()
            return restaurant
        except ValidationError as ve:
            raise AppException("Validation error", status_code=400, data=ve.errors())
        except Exception as e:
            g.db.rollback()
            raise AppException(str(e), status_code=500)

    @staticmethod
    def update_restaurant(restaurant_id: uuid, data) -> RestaurantModel:
        if not data:
            raise AppException("Missing restaurant data", status_code=400)

        dto = RestaurantCreateDTO(**data)
        
        restaurant = g.db.query(RestaurantModel).filter(RestaurantModel.id == restaurant_id).first()
        if not restaurant:
            raise AppException("Restaurant not found", status_code=404)

        try:
            for key, value in dto.__dict__.items():
                setattr(restaurant, key, value)
            g.db.commit()
            return restaurant
        except ValidationError as ve:
            raise AppException("Validation error", status_code=400, data=ve.errors())
        except Exception as e:
            g.db.rollback()
            raise AppException(str(e), status_code=500)

    @staticmethod
    def get_all(start_with: str | None = None, city_id: int | None = None, aviability: int | None = None, date: datetime.datetime | None = None) -> list[dict]:
        query = g.db.query(RestaurantModel)

        if start_with is not None:
            query = query.filter(RestaurantModel.name.ilike(f"{start_with}%"))

        if city_id is not None and int(city_id) != 0:
            query = query.join(RestaurantModel.city).filter(CityModel.id == city_id)

        if aviability is not None:
            subq = (
                g.db.query(
                    Reservation.restaurant_id,
                    func.count(Reservation.id).label("reservation_count")
                ).filter(Reservation.date == date) 
                .group_by(Reservation.restaurant_id)
                .subquery()
            )

            query = (
                query.outerjoin(subq, RestaurantModel.id == subq.c.restaurant_id)
                .filter(
                    (15 - func.coalesce(subq.c.reservation_count, 0)) <= aviability
                )
            )

        restaurants = query.all()

        if not restaurants:
            raise AppException("Restaurant not found", status_code=404)

        return [res.to_dict() for res in restaurants]

    @staticmethod
    def delete_restaurant(restaurant_id: uuid) -> None:
        try:
            
            restaurant = g.db.query(RestaurantModel).filter(RestaurantModel.id == restaurant_id).first()
            if not restaurant:
                raise AppException("Restaurant not found", status_code=404)
            g.db.delete(restaurant)
            g.db.commit()
        except Exception as e:
            g.db.rollback()
            raise AppException(str(e), status_code=500)
    
        