from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.user import User
from app.models.cart import CartItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product

from app.utils.current_user import get_current_user

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/create")
def create_order(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_items = (
        db.query(CartItem)
        .filter(
            CartItem.user_id ==
            current_user.id
        )
        .all()
    )

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    total_amount = 0

    for item in cart_items:

        product = (
            db.query(Product)
            .filter(
                Product.id ==
                item.product_id
            )
            .first()
        )

        total_amount += (
            float(product.price)
            * item.quantity
        )

    order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="Pending"
    )

    db.add(order)
    db.commit()
    db.refresh(order)
    
    for item in cart_items:

        product = (
            db.query(Product)
            .filter(
                Product.id ==
                item.product_id
            )
            .first()
        )

        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_item)

        db.delete(item)

    db.commit()

    return {
        "message":
        "Order created",
        "order_id":
        order.id
    }
    
@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(Order)
        .filter(
            Order.user_id ==
            current_user.id
        )
        .all()
    )