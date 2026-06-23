from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    category_id: int
    title: str
    description: Optional[str] = None
    brand: Optional[str] = None
    price: float
    discount_price: Optional[float] = None
    stock: int = 0
    image_url: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    category_id: int
    title: str
    description: Optional[str]
    brand: Optional[str]
    price: float
    discount_price: Optional[float]
    stock: int
    image_url: Optional[str]

    class Config:
        from_attributes = True