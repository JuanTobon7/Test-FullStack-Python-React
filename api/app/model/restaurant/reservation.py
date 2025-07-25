from app.model.base_model import Base
from sqlalchemy import Column,String, ForeignKey, Integer, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
import datetime

class Reservation(Base):
    __tablename__ = 'historic_reserval'
     
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    table = Column(String(2))
    date = Column(Date, nullable=False, default=lambda: datetime.date.today())
    restaurant_id = Column(UUID(as_uuid=True), ForeignKey('restaurants.id',ondelete="CASCADE"), nullable=False)
    
    def to_dict(self):
         return ({
            "id": str(self.id),
            "table": self.table,
            "date": self.date.isoformat() if self.date else None,
            "restaurant_id": str(self.restaurant_id)
        })