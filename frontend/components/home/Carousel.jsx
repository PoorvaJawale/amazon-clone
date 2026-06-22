"use client";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import Link from "next/link";

export default function Carousel({ title, items = [], showBadge = false }) {
  const ref = useRef(null);
  const { addItem } = useCartStore();

  const scroll = (dir) =>
    ref.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });

  if (!items.length) return null;

  return (
    <div className="bg-white p-4 shadow-sm relative group/car">
      <h2 className="text-[20px] font-bold text-[#0f1111] mb-4">{title}</h2>

      <div ref={ref} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => {
          const finalPrice = item.discount_price || item.price || 0;
          const hasDiscount = item.discount_price && item.discount_price < item.price;
          const pct = hasDiscount ? Math.round(((item.price - item.discount_price) / item.price) * 100) : 0;

          return (
            <div key={item.id}
              className="w-44 shrink-0 flex flex-col group/item border border-gray-100 hover:border-gray-300 rounded p-2 hover:shadow transition-shadow">
              <Link href={`/product/${item.id}`}>
                <div className="relative h-36 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center mb-2">
                  {item.image ? (
                    <img src={item.image} alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover/item:scale-105 transition-transform" />
                  ) : <div className="w-full h-full bg-gray-200" />}
                  {showBadge && item.badge && (
                    <span className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[9px] font-bold px-1 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="absolute top-1 right-1 bg-[#cc0c39] text-white text-[9px] font-bold px-1 py-0.5 rounded">
                      -{pct}%
                    </span>
                  )}
                </div>
              </Link>

              <p className="text-xs font-medium text-[#0f1111] line-clamp-2 leading-snug flex-1">{item.name}</p>

              {(item.rating || item.stars) && (
                <div className="flex gap-0.5 text-[#f0a500] mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <FaStar key={s} size={9} className={s <= (item.rating || item.stars || 4) ? "" : "text-[#ddd]"} />
                  ))}
                </div>
              )}

              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-sm font-bold text-[#0f1111]">₹{Number(finalPrice).toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span className="text-[10px] text-[#565959] line-through">₹{Number(item.price).toLocaleString("en-IN")}</span>
                )}
              </div>

              <button
                onClick={() => addItem({ id: item.id, name: item.name, price: finalPrice, image: item.image })}
                className="mt-2 amazon-btn w-full text-[11px] flex items-center justify-center gap-1"
              >
                <FaShoppingCart size={10} /> Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <button onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 shadow-md w-9 h-16 flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity z-10 rounded-r">
        <FaChevronLeft size={16} className="text-gray-600" />
      </button>
      <button onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 shadow-md w-9 h-16 flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity z-10 rounded-l">
        <FaChevronRight size={16} className="text-gray-600" />
      </button>
    </div>
  );
}
