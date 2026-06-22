"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function ProductGrid() {
  // Helper SVG items for Tumblers
  const TumblerSVG = ({ color = "#475569" }) => (
    <svg viewBox="0 0 80 80" className="w-full h-16 text-slate-600">
      <path d="M 25,10 L 32,70 L 48,70 L 55,10 Z" fill={color} />
      <rect x="22" y="8" width="36" height="4" rx="1" fill="#cbd5e1" />
      <line x1="40" y1="8" x2="52" y2="2" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  // Helper SVG for Straws
  const StrawSVG = ({ color = "#94a3b8" }) => (
    <svg viewBox="0 0 80 80" className="w-full h-16">
      <line x1="30" y1="75" x2="30" y2="25" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 30,25 C 30,15 45,15 45,25 L 45,75" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="75" x2="32" y2="75" stroke="#475569" strokeWidth="2" />
    </svg>
  );

  // Helper SVG for traditional men's kurta/sherwani
  const KurtaSVG = ({ color = "#6b21a8" }) => (
    <svg viewBox="0 0 80 80" className="w-full h-16 text-slate-800">
      {/* Kurta top shape */}
      <path d="M 30,10 L 50,10 L 55,20 L 48,22 L 48,70 L 32,70 L 32,22 L 25,20 Z" fill={color} />
      <path d="M 40,10 L 40,30" stroke="#fef08a" strokeWidth="1.5" /> {/* Gold buttons strip */}
      <polygon points="35,10 40,18 45,10" fill="#1e1b4b" /> {/* Collar */}
    </svg>
  );

  return (
    <div className="max-w-[1500px] mx-auto px-4 -mt-16 md:-mt-28 lg:-mt-40 relative z-10 select-none pb-10">
      {/* First Grid Row (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Pick up where you left off (Tumblers) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3 leading-tight">Pick up where you left off</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <Link href="/product/tumbler-1" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <TumblerSVG color="#0e7490" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  VENDERE Premium Sta...
                </span>
              </Link>
              <Link href="/product/tumbler-2" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <TumblerSVG color="#ca8a04" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  enem Tumbler, Butter...
                </span>
              </Link>
              <Link href="/product/tumbler-3" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <TumblerSVG color="#b91c1c" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  RIZIK STORE™ Stainles...
                </span>
              </Link>
              <Link href="/product/tumbler-4" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <TumblerSVG color="#1e293b" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  VYATIRANG Insulated V...
                </span>
              </Link>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            See more
          </span>
        </div>

        {/* Card 2: Pick up where you left off (Straws) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3 leading-tight">Pick up where you left off</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <Link href="/product/straw-1" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <StrawSVG color="#64748b" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  ANTIL'S Reusable Stainl...
                </span>
              </Link>
              <Link href="/product/straw-2" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <StrawSVG color="#e2e8f0" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  House of Quirk Reusabl...
                </span>
              </Link>
              <Link href="/product/straw-3" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <StrawSVG color="#fbbf24" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  YAJNAS Stainless Steel...
                </span>
              </Link>
              <Link href="/product/straw-4" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <StrawSVG color="#818cf8" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  Reusable Glass Straw w...
                </span>
              </Link>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            See more
          </span>
        </div>

        {/* Card 3: Continue shopping deals */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3 leading-tight">Continue shopping deals</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <Link href="/product/kurta-1" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <KurtaSVG color="#4c1d95" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  Men's Kurta Sherwani
                </span>
              </Link>
              <Link href="/product/kurta-2" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <KurtaSVG color="#b91c1c" />
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  Designer Traditional Fit
                </span>
              </Link>
              <Link href="/product/hanger-1" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <svg viewBox="0 0 80 80" className="w-full h-12 text-slate-400">
                    <path d="M 40,25 C 45,20 45,12 40,12 C 35,12 35,20 40,25" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <polygon points="10,50 40,25 70,50" fill="none" stroke="currentColor" strokeWidth="3" />
                    <line x1="10" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  Velvet Hangers (50 Pack)
                </span>
              </Link>
              <Link href="/product/hanger-2" className="group cursor-pointer">
                <div className="bg-gray-50 h-28 flex items-center justify-center p-3 group-hover:opacity-90 transition-opacity">
                  <svg viewBox="0 0 80 80" className="w-full h-12 text-yellow-800">
                    <path d="M 40,25 C 45,20 45,12 40,12" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <polygon points="10,50 40,25 70,50" fill="none" stroke="currentColor" strokeWidth="3" />
                    <line x1="10" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">
                  Wooden Non-Slip Hangers
                </span>
              </Link>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            See all deals
          </span>
        </div>

        {/* Card 4: Bulk discounts (Amazon Business Promo) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px] relative overflow-hidden">
          <div className="space-y-4">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">
              Bulk discounts + 10% guaranteed cashback !
            </h3>
            
            <div className="flex gap-2 items-center">
              <div className="flex-1 space-y-3">
                <p className="text-xs text-gray-600 font-medium">
                  Save on business purchases, manage tax invoices, and get custom pricing.
                </p>
                <button className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold py-1.5 px-3 border border-gray-300 rounded shadow-sm cursor-pointer transition-colors">
                  Register now
                </button>
              </div>

              {/* Amazon Business Mock Badge */}
              <div className="bg-orange-500 text-white p-3 rounded flex flex-col items-center justify-center w-24 h-24 shrink-0 font-sans shadow-md">
                <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">amazon</span>
                <span className="text-sm font-extrabold tracking-tight">business</span>
                <span className="text-[8px] mt-1 bg-white/25 px-1 py-0.5 rounded">*T&C Apply</span>
              </div>
            </div>
          </div>

          {/* Advertisement / Promo banner below */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <h4 className="font-bold text-sm text-gray-900 leading-none">Vitamino Color Spectrum</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Lock in your day 1 color vibrancy for up to 100 days.*
            </p>
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 h-10 w-full rounded mt-2.5 flex items-center justify-between px-3 text-white font-bold text-xs">
              <span>L'OREAL PROFESSIONNEL</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Shop now</span>
            </div>
          </div>
        </div>

      </div>

      {/* Second Row of Catchy Promotion Cards (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        
        {/* Card 5: Revamp your home */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3 leading-tight">Revamp your home</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <div className="group cursor-pointer">
                <div className="bg-amber-50 h-28 flex flex-col items-center justify-center p-3 border border-amber-100 rounded">
                  {/* Bed icon */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-amber-800" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <path d="M2 4v16M22 8v12M2 8h20M2 17h20" />
                    <rect x="4" y="10" width="6" height="4" rx="1" />
                    <rect x="14" y="10" width="6" height="4" rx="1" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">Bedding & Sheets</span>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-blue-50 h-28 flex flex-col items-center justify-center p-3 border border-blue-100 rounded">
                  {/* Lamp icon */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-800" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <path d="M12 2L6 12h12Z" />
                    <path d="M12 12v8M8 22h8" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">Lighting & Lamps</span>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-emerald-50 h-28 flex flex-col items-center justify-center p-3 border border-emerald-100 rounded">
                  {/* Plant/Vase */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-emerald-800" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <path d="M9 22h6v-6H9z" />
                    <path d="M12 16V6M12 10C9 8 7 10 7 10M12 7C15 5 17 7 17 7" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">Home Decor</span>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-rose-50 h-28 flex flex-col items-center justify-center p-3 border border-rose-100 rounded">
                  {/* Storage */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-rose-800" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M11 6h2M11 12h2M11 18h2" />
                  </svg>
                </div>
                <span className="text-[11px] text-gray-800 block font-semibold truncate mt-1.5">Storage organizers</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            Explore more ideas
          </span>
        </div>

        {/* Card 6: Deals with tags - minimum 30% off */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-2 leading-tight">Minimum 30% off</h3>
            <p className="text-[11px] text-gray-500 mb-3">Kitchenware, cookers & more daily essentials</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <div className="w-12 h-12 bg-amber-500 rounded flex items-center justify-center text-white font-extrabold text-sm shadow-inner">
                  35%
                </div>
                <div>
                  <div className="bg-red-700 text-white font-bold text-[9px] px-1 py-0.5 rounded inline-block">Deal of the Day</div>
                  <span className="text-xs font-bold block text-gray-900 mt-1">Prestige Cookware Sets</span>
                  <span className="text-[10px] text-gray-500">Starting at ₹1,299</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center text-white font-extrabold text-sm shadow-inner">
                  45%
                </div>
                <div>
                  <div className="bg-red-700 text-white font-bold text-[9px] px-1 py-0.5 rounded inline-block">Limited Deal</div>
                  <span className="text-xs font-bold block text-gray-900 mt-1">Philips Air Fryers</span>
                  <span className="text-[10px] text-gray-500">Starting at ₹6,499</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center text-white font-extrabold text-sm shadow-inner">
                  60%
                </div>
                <div>
                  <div className="bg-red-700 text-white font-bold text-[9px] px-1 py-0.5 rounded inline-block">Special Offer</div>
                  <span className="text-xs font-bold block text-gray-900 mt-1">Glass Tumbler Sets</span>
                  <span className="text-[10px] text-gray-500">Starting at ₹399</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            See all deals
          </span>
        </div>

        {/* Card 7: Revamp items - starting at 399 */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div className="space-y-3">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">Starting at ₹399</h3>
            <p className="text-[11px] text-gray-500">Best deals on home utilities & accessories</p>

            <div className="bg-slate-100 h-52 rounded border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 relative overflow-hidden group cursor-pointer">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-gray-400 group-hover:scale-105 transition-transform duration-200">
                {/* Iron box illustration */}
                <path d="M 20,70 L 80,70 C 85,70 85,50 75,45 L 35,45 C 25,45 20,55 20,70 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M 35,45 L 35,30 L 70,30" fill="none" stroke="currentColor" strokeWidth="3" /> {/* Handle */}
                <circle cx="55" cy="58" r="6" fill="currentColor" fillOpacity="0.2" /> {/* Knob */}
              </svg>
              
              <div className="absolute bottom-3 left-3 bg-[#b12704] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                Under ₹999
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-950">Steam irons & laundry care</span>
              <span className="text-red-700 font-extrabold">Min. 40% Off</span>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            Shop the collection
          </span>
        </div>

        {/* Card 8: Best Sellers promo */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm min-h-[420px]">
          <div className="space-y-4">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">Best Sellers in Electronics</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2.5 rounded text-center border border-gray-100 hover:shadow-sm cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto text-blue-900" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {/* Headphones */}
                  <path d="M3 18v-6c0-5 4-9 9-9s9 4 9 9v6" />
                  <rect x="2" y="14" width="4" height="6" rx="1" fill="currentColor" />
                  <rect x="18" y="14" width="4" height="6" rx="1" fill="currentColor" />
                </svg>
                <span className="text-[10px] font-bold text-gray-800 block mt-2">Over-ear Headphones</span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded text-center border border-gray-100 hover:shadow-sm cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto text-emerald-800" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {/* Bluetooth Speaker */}
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <circle cx="12" cy="8" r="3" strokeWidth="2" />
                  <circle cx="12" cy="15" r="2" />
                </svg>
                <span className="text-[10px] font-bold text-gray-800 block mt-2">Wireless Speakers</span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded text-center border border-gray-100 hover:shadow-sm cursor-pointer col-span-2 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-rose-800" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Keyboard */}
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="5" y1="10" x2="19" y2="10" strokeDasharray="1.5" />
                    <line x1="5" y1="14" x2="19" y2="14" strokeDasharray="1.5" />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-800 text-left">Keyboards & Mice</span>
                </div>
                <ArrowRight size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium mt-3 block">
            See all best sellers
          </span>
        </div>

      </div>

      {/* Best Sellers Horizontal Carousel Section */}
      <div className="bg-white p-5 shadow-sm mt-5">
        <h3 className="text-[19px] font-bold text-gray-900 mb-4 leading-none">Best Sellers & More Picks for You</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {[
            { name: "Stainless Steel Insulated Mug", category: "Kitchen", price: "₹899", stars: 5 },
            { name: "Digital Smart Watch Fitness Tracker", category: "Electronics", price: "₹2,499", stars: 4 },
            { name: "Ergonomic Office Chair Cushion", category: "Home", price: "₹599", stars: 4 },
            { name: "Wireless Bluetooth Earbuds Pro", category: "Electronics", price: "₹1,999", stars: 5 },
            { name: "Multi-purpose Storage Container Box", category: "Utility", price: "₹449", stars: 4 },
            { name: "Premium Glass Sipper with Straw", category: "Kitchen", price: "₹349", stars: 5 }
          ].map((prod, index) => (
            <div key={index} className="w-48 bg-gray-50 border border-gray-100 p-4 shrink-0 hover:shadow-md cursor-pointer transition-shadow rounded-sm flex flex-col justify-between">
              <div>
                <div className="h-24 bg-white rounded flex items-center justify-center p-2 text-slate-400">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-2 font-bold">{prod.category}</span>
                <span className="text-xs font-bold text-gray-800 block mt-1 line-clamp-2 leading-tight h-8">
                  {prod.name}
                </span>
              </div>
              
              <div className="mt-3">
                <div className="flex gap-0.5 text-amber-500 mb-1">
                  {[...Array(prod.stars)].map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-extrabold text-gray-950">{prod.price}</span>
                  <span className="text-[9px] font-bold bg-[#febd69] text-gray-800 px-1 py-0.5 rounded">
                    Prime
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
