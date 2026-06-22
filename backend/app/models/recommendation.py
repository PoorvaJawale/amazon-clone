from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    JSON,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        ForeignKey("users.id"),
        nullable=False
    )

    section_name = Column(
        String(100),
        nullable=False
    )

    product_ids = Column(
        JSON,
        nullable=False
    )

    generated_at = Column(
        DateTime,
        default=datetime.utcnow
    )