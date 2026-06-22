"use client";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { addToWishlist } from "../../services/wishlist";
import { isLoggedIn } from "../../services/auth";
import { toast } from "sonner";

export default function ProductCard({ product = {} }) {
  const { addItem } = useCartStore();
  const [wishlisted, setWishlisted] = useState(false);
  const {
    id = "x", name = "Product", brand = "", price = 0,
    discount_price, image, rating = 4, reviews_count = 0,
  } = product;

  const finalPrice = discount_price || price;
  const hasDiscount = discount_price && discount_price < price;
  const pct = hasDiscount ? Math.round(((price - discount_price) / price) * 100) : 0;

  return (
    <div className="bg-white flex flex-col h-full hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-gray-200 rounded p-3 group">
      {/* Image */}
      <Link href={`/product/${id}`} className="relative block mb-3 overflow-hidden">
        <div className="h-44 flex items-center justify-center bg-white">
          {image ? (
            <img src={image} alt={name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="h-full w-full bg-[#f7f7f7] flex items-center justify-center text-gray-300 text-4xl font-light">?</div>
          )}
        </div>
        {hasDiscount && (
          <span className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{pct}%
          </span>
        )}
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (!isLoggedIn()) { toast.error("Sign in to save to Wish List"); return; }
            try {
              await addToWishlist(id);
              setWishlisted(true);
              toast.success("Added to Wish List");
            } catch {
              toast.error("Could not add to Wish List");
            }
          }}
          className={`absolute top-1 right-1 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity ${wishlisted ? "text-red-500" : "hover:text-red-500 text-gray-400"}`}
        >
          <FaHeart size={12} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 gap-0.5">
        {brand && <p className="text-[10px] text-[#0066c0] font-medium">{brand}</p>}
        <Link href={`/product/${id}`}>
          <p className="text-sm text-[#0f1111] hover:text-[#c45500] line-clamp-2 leading-snug">{name}</p>
        </Link>

        {/* Stars */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex gap-0.5 text-[#f0a500]">
              {[1,2,3,4,5].map((s) => (
                <FaStar key={s} size={11} className={s <= Math.round(rating) ? "text-[#f0a500]" : "text-[#ddd]"} />
              ))}
            </div>
            {reviews_count > 0 && (
              <span className="text-[11px] text-[#0066c0] hover:text-[#c45500] cursor-pointer">
                ({reviews_count.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-semibold text-[#0f1111]">
            ₹{Number(finalPrice).toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#565959] line-through">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
          )}
        </div>
        {hasDiscount && (
          <p className="text-xs text-[#cc0c39] font-semibold">Save ₹{Number(price - finalPrice).toLocaleString("en-IN")}</p>
        )}
        <p className="text-[11px] text-[#007600]">FREE Delivery by Tomorrow</p>

        <button
          onClick={() => addItem({ id, name, price: finalPrice, image })}
          className="mt-2 amazon-btn w-full flex items-center justify-center gap-1.5 text-xs"
        >
          <FaShoppingCart size={12} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
