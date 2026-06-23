from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class UserActivity(Base):
    __tablename__ = "user_activity"

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

    action_type = Column(
        String(50),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )