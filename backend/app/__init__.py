from app.database.db import Base, engine

# Import ALL models
from app.models.user import User
from app.models.category import Category
from app.models.product import Product
from app.models.cart import CartItem
from app.models.wishlist import WishlistItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.activity import UserActivity

Base.metadata.create_all(bind=engine)

print("Tables created successfully")