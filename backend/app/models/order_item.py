from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    ForeignKey
)

from app.database.db import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        ForeignKey("orders.id"),
        nullable=False
    )

    product_id = Column(
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    price = Column(
        Numeric(10,2),
        nullable=False
    )