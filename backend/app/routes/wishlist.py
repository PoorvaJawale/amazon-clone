from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.wishlist import WishlistItem
from app.models.user import User

from app.schemas.wishlist import WishlistCreate

from app.utils.current_user import get_current_user

router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)

@router.post("/add")
def add_to_wishlist(
    wishlist: WishlistCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing_item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == wishlist.product_id
        )
        .first()
    )

    if existing_item:
        return {
            "message": "Already in wishlist"
        }

    item = WishlistItem(
        user_id=current_user.id,
        product_id=wishlist.product_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item

@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(WishlistItem)
        .filter(
            WishlistItem.user_id ==
            current_user.id
        )
        .all()
    )
    
@router.delete("/{wishlist_id}")
def remove_from_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.id == wishlist_id,
            WishlistItem.user_id == current_user.id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found"
        )

    db.delete(item)
    db.commit()

    return {
        "message":
        "Removed from wishlist"
    }