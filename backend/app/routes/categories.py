from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("/")
def get_categories(
    db: Session = Depends(get_db)
):
    return db.query(Category).all()

@router.post("/")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    new_category = Category(
        name=category.name,
        image_url=category.image_url
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category