from pydantic import BaseModel

class CategoryCreate(BaseModel):
    name: str
    image_url: str | None = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    image_url: str | None = None

    class Config:
        from_attributes = True