"use client";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { useRouter } from "next/navigation";

/* Small 2×2 grid card used in "Pick up where you left off" etc. */
export default function DealCard({ title, subtitle, aiTag, items = [], seeMoreLabel = "See more", seeMoreHref = "/search?q=deals" }) {
  const { addItem } = useCartStore();
  const router = useRouter();
  return (
    <div className="bg-white p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3">
        <div className="flex items-start justify-between gap-1">
          <h3 className="text-[18px] font-bold text-[#0f1111] leading-tight">{title}</h3>
          {aiTag && (
            <span className="shrink-0 flex items-center gap-0.5 text-[9px] font-bold text-[#c45500] bg-[#fff8f0] border border-[#f0c14b] px-1.5 py-0.5 rounded-full mt-0.5">
              ✦ AI
            </span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-[#565959] mt-0.5">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
            onClick={() => item.id && !item.id.startsWith("h") ? router.push(`/product/${item.id}`) : router.push(`/search?q=${encodeURIComponent(item.name)}`)}
          >
            <div className="h-28 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center border border-gray-100">
              {item.image ? (
                <img src={item.image} alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <p className="text-[11px] text-[#0f1111] mt-1 line-clamp-2 leading-snug font-medium group-hover:text-[#c45500]">{item.name}</p>
            {item.price && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-[12px] font-semibold text-[#0f1111]">₹{Number(item.price).toLocaleString("en-IN")}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); addItem({ id: item.id, name: item.name, price: item.price, image: item.image }); }}
                  className="text-[#0066c0] hover:text-[#c45500]"
                >
                  <FaShoppingCart size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link href={seeMoreHref} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block font-medium">
        {seeMoreLabel}
      </Link>
    </div>
  );
}
