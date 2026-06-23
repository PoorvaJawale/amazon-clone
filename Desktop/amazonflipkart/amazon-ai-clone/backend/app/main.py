from fastapi import FastAPI

from app.routes.products import router as product_router
from app.routes.categories import router as category_router
from app.routes.auth import (
    router as auth_router
)

from app.routes.cart import (
    router as cart_router
)

from app.routes.wishlist import (
    router as wishlist_router
)


from app.routes.orders import (
    router as order_router
)

app = FastAPI(
    title="Amazon AI Clone"
)

@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }
    
    

app.include_router(category_router)


app = FastAPI()

app.include_router(product_router)



app.include_router(auth_router)



app.include_router(cart_router)



app.include_router(wishlist_router)


app.include_router(order_router)