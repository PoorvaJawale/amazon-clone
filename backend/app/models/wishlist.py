from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.db import Base


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

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

    saved_at = Column(
        DateTime,
        default=datetime.utcnow
    )