from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    String,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        ForeignKey("users.id"),
        nullable=False
    )

    total_amount = Column(
        Numeric(10,2),
        nullable=False
    )

    status = Column(
        String(50),
        default="Pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )