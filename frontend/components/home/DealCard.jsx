"use client";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";

/* Small 2×2 grid card used in "Pick up where you left off" etc. */
export default function DealCard({ title, items = [], seeMoreLabel = "See more", seeMoreHref = "#" }) {
  const { addItem } = useCartStore();
  return (
    <div className="bg-white p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-[18px] font-bold text-[#0f1111] mb-3 leading-tight">{title}</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.slice(0, 4).map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="h-28 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center border border-gray-100">
              {item.image ? (
                <img src={item.image} alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <p className="text-[11px] text-[#0f1111] mt-1 line-clamp-2 leading-snug font-medium">{item.name}</p>
            {item.price && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-[12px] font-semibold text-[#0f1111]">₹{Number(item.price).toLocaleString("en-IN")}</span>
                <button
                  onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
                  className="text-[#0066c0] hover:text-[#c45500]"
                >
                  <FaShoppingCart size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link href={seeMoreHref} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block">
        {seeMoreLabel}
      </Link>
    </div>
  );
}
