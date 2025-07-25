from app.model.base_model import Base
from sqlalchemy import Column,String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

import uuid

class RestaurantModel(Base):
    __tablename__ = 'restaurants'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(250),nullable=False)
    address = Column(String(250), nullable=False)    
    city_id = Column(Integer, ForeignKey("cities.id", name="fk_restaurant_city"), nullable=False)
    description = Column(String(250),nullable=False)
    photo_url = Column(String(250),nullable=False)
    
    
    city = relationship("CityModel")
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "address": self.address,
            "city": self.city.to_dict() if self.city else None,
            "photoUrl": str(self.photo_url),
            "description": str(self.description)
        }