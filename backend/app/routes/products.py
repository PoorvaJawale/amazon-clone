from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.product import Product

from app.schemas.product import ProductCreate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()

@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        category_id=product.category_id,
        title=product.title,
        description=product.description,
        brand=product.brand,
        price=product.price,
        discount_price=product.discount_price,
        stock=product.stock,
        image_url=product.image_url
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    return product