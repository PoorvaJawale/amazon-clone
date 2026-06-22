from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.database.db import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False
    )

    title = Column(String(255), nullable=False)
    description = Column(Text)

    brand = Column(String(100))

    price = Column(Numeric(10,2), nullable=False)
    discount_price = Column(Numeric(10,2))

    stock = Column(Integer, default=0)

    image_url = Column(String)

    category = relationship(
        "Category",
        back_populates="products"
    )