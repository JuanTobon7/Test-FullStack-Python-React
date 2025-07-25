from pydantic import BaseModel, Field, validator
from uuid import UUID
from datetime import date as dateType

class ReservationCreateDTO(BaseModel):
    table: str = Field(..., max_length=2, min_length=1, description="Table identifier (1-2 characters)")
    date: dateType = Field(..., description="La reserva debe hacerce para hoy o una fecha futura")
    restaurant_id: UUID

    @validator("date")
    def validate_date_not_in_past(cls, v):
        if v < dateType.today():
            raise ValueError("Reservation date cannot be in the past")
        return v