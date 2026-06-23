from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime
)
from datetime import datetime

from app.database.db import Base

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        ForeignKey("users.id"),
        nullable=False
    )

    product_id = Column(
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        default=1
    )

    added_at = Column(
        DateTime,
        default=datetime.utcnow
    )