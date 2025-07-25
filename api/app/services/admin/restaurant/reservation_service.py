from flask import g
from app.model.restaurant.reservation import Reservation
from app.model.restaurant.reservation_dto import ReservationCreateDTO
from app.model.error.app_exception import AppException
from app.model.response.res import ResponseStatus
from pydantic import ValidationError
from sqlalchemy import func, case, and_
from datetime import date as dateMod
import uuid

class ReservationService:
    @staticmethod
    def get_reservation(restaurant_id: uuid, date_str: str | None) -> list[Reservation]:
        if not restaurant_id:
            raise AppException('No se proporcionó el restaurante requerido', status_code=400)

        query = g.db.query(Reservation).filter(Reservation.restaurant_id == restaurant_id)

        if date_str:
            try:
                parsed_date = dateMod.fromisoformat(date_str)
            except ValueError:
                raise AppException("Formato de fecha inválido. Usa YYYY-MM-DD", status_code=400)
            query = query.filter(Reservation.date == parsed_date)
        
        query = query.order_by(Reservation.date.desc())
        result = query.all()

        print("[DEBUG] Reservas encontradas:")
        for r in result:
            print(f" - id: {r.id} | date: {r.date} | restaurant_id: {r.restaurant_id}")

        if not result:
            raise AppException("No se encontraron reservas", status_code=404)

        return [res.to_dict() for res in result]
    @staticmethod
    def create_reservation(data) -> Reservation:
        if not data:
            raise AppException('No se proporciono la información requerida')
        reservation = ReservationCreateDTO(**data)
        try:
            reservation = Reservation(
                table=reservation.table,
                date=reservation.date,
                restaurant_id=reservation.restaurant_id
            )
            

            result = (
                g.db.query(
                    func.count(Reservation.id).label("total_global"),
                    func.sum(
                        case((Reservation.restaurant_id == reservation.restaurant_id, 1), else_=0)
                    ).label("total_restaurant"),
                    func.sum(
            case(
                (
                    and_(
                        Reservation.table == reservation.table,
                        Reservation.restaurant_id == reservation.restaurant_id
                    ),
                    1
                ),
                else_=0
            )
        ).label("table_count")
                )
                .filter(Reservation.date == reservation.date)
                .one()
            )

            total_global = result.total_global or 0
            total_restaurant = result.total_restaurant or 0
            table_count = result.table_count or 0
            
            if table_count > 0:
                raise AppException(f'La mesa {reservation.table} ya tiene una reserva para el dia {reservation.date}')
            
            if total_global >= 20:
                raise AppException(f'Limite de reservas globales alcanzadas el dia {reservation.date}')
            
            if total_restaurant >= 15:
                raise AppException(f'Limite de reservas alcanzadas para el restaurante {reservation.restaurant_id} el dia {reservation.date}')
            
            g.db.add(reservation)
            g.db.commit()
            return reservation.to_dict()
        except ValidationError as ve:
            raise AppException(data=ve.errors())
        except Exception as e:
            g.db.rollback()
            raise AppException('Error al crear la reserva', data=str(e))