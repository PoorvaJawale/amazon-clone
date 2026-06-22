from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        ForeignKey("users.id"),
        nullable=False
    )

    query = Column(
        Text,
        nullable=False
    )

    searched_at = Column(
        DateTime,
        default=datetime.utcnow
    )