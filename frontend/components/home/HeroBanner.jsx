"use client";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SLIDES = [
  {
    bg: "#e8f4fd",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1500&auto=format&fit=crop&q=80",
    badge: "Mega home sale",
    title: "Drying racks & home essentials",
    price: "Starting ₹999",
    brand: "bathla",
    offer: "Up to 10% Instant Discount*",
    banks: "BOBCARD | HSBC",
  },
  {
    bg: "#e8f4fd",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1500&auto=format&fit=crop&q=80",
    badge: "Up to 60% off",
    title: "Electronics & Accessories",
    price: "Deals starting ₹599",
    brand: "boAt | Noise | OnePlus",
    offer: "No Cost EMI up to 12 months",
    banks: "SBI Card | ICICI Bank",
  },
  {
    bg: "#fef9e8",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1500&auto=format&fit=crop&q=80",
    badge: "Kitchen Upgrade",
    title: "Mixer Grinders & Cookware",
    price: "Minimum 40% Off",
    brand: "Prestige | Philips",
    offer: "Flat ₹500 cashback on Amazon Pay",
    banks: "Amazon Pay UPI",
  },
  {
    bg: "#eef6ee",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1500&auto=format&fit=crop&q=80",
    badge: "Fashion Week",
    title: "Top brands, lowest prices",
    price: "Up to 80% off",
    brand: "Levis | Arrow | UCB",
    offer: "10% Instant Discount on ICICI cards",
    banks: "ICICI Bank",
  },
];

export default function HeroBanner() {
  const [cur, setCur] = useState(0);

  const next = useCallback(() => setCur((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setCur((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const s = SLIDES[cur];

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height: "clamp(200px, 32vw, 500px)" }}>
      {/* BG image */}
      <div className="absolute inset-0 transition-all duration-700" style={{ backgroundColor: s.bg }}>
        <img src={s.img} alt={s.title}
          className="w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: 0.85 }} />
        {/* Left gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-10 md:px-20">
        <div className="max-w-sm space-y-2">
          <span className="inline-block bg-[#c45500] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            {s.badge}
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 leading-tight">{s.title}</h2>
          <p className="text-2xl md:text-4xl font-extrabold text-[#b12704]">{s.price}</p>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">by {s.brand}</p>
          <div className="bg-white/90 border border-gray-200 rounded p-2 shadow-sm inline-block">
            <p className="text-[9px] text-gray-500 font-bold uppercase">{s.banks}</p>
            <p className="text-xs font-bold text-gray-800">{s.offer}</p>
            <p className="text-[8px] text-gray-400 mt-0.5">*T&amp;C apply</p>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev}
        className="absolute left-0 top-0 bottom-16 w-12 flex items-center justify-center bg-white/60 hover:bg-white/80 text-gray-600 hover:text-black transition-all z-10">
        <FaChevronLeft size={28} />
      </button>
      <button onClick={next}
        className="absolute right-0 top-0 bottom-16 w-12 flex items-center justify-center bg-white/60 hover:bg-white/80 text-gray-600 hover:text-black transition-all z-10">
        <FaChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === cur ? "bg-[#e77600] scale-125" : "bg-gray-400"}`} />
        ))}
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#eaeded] to-transparent pointer-events-none" />
    </div>
  );
}
