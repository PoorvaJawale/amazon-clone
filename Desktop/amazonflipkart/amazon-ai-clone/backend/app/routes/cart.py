from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.cart import CartItem
from app.schemas.cart import CartCreate
from app.models.user import User
from app.utils.current_user import get_current_user
from fastapi import HTTPException

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)




@router.post("/add")
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_item = CartItem(
        user_id=current_user.id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)

    return cart_item

@router.get("/")
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(CartItem)
        .filter(
            CartItem.user_id ==
            current_user.id
        )
        .all()
    )
    


@router.delete("/{cart_id}")
def remove_cart_item(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    item = (
        db.query(CartItem)
        .filter(
            CartItem.id == cart_id,
            CartItem.user_id ==
            current_user.id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    db.delete(item)
    db.commit()

    return {
        "message":
        "Item removed"
    }