from pydantic import BaseModel, Field

class RestaurantCreateDTO(BaseModel):
    name: str = Field(..., min_length=2)
    address: str
    city_id: int = Field(..., alias='cityId')
    description: str
    photo_url: str = Field(...,alias='photoUrl')