"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Clock } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function ProductGrid() {
  const { addToCart } = useCartStore();
  const carouselRef = useRef(null);

  // Today's Deals countdown timer logic (counts down to midnight)
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Next midnight
      const difference = midnight - now;

      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      // Pad with leading zeros
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Horizontal Carousel scroll controls
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mock product catalog with high-fidelity Unsplash images
  const products = {
    tumbler1: { id: "tumbler-1", name: "VENDERE Premium Insulated Stainless Tumbler", price: 899, img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&auto=format&fit=crop&q=60" },
    tumbler2: { id: "tumbler-2", name: "enem Thermal Cup, Double-Wall Butter Gold", price: 1099, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=60" },
    tumbler3: { id: "tumbler-3", name: "RIZIK STORE™ Leakproof Sports Flask", price: 749, img: "https://images.unsplash.com/photo-1589302168068-9646c49d4501?w=300&auto=format&fit=crop&q=60" },
    tumbler4: { id: "tumbler-4", name: "VYATIRANG Insulated Vacuum Travel Mug", price: 999, img: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=300&auto=format&fit=crop&q=60" },
    
    straw1: { id: "straw-1", name: "ANTIL'S Reusable Metal Straws (Pack of 8)", price: 349, img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&auto=format&fit=crop&q=60" },
    straw2: { id: "straw-2", name: "House of Quirk Borosilicate Glass Straws", price: 449, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=60" },
    straw3: { id: "straw-3", name: "YAJNAS Heat-Resistant Colorful Glass Straws", price: 399, img: "https://images.unsplash.com/photo-1592892111425-15e04305f961?w=300&auto=format&fit=crop&q=60" },
    straw4: { id: "straw-4", name: "Reusable Glass Straws with Flexible Cleaners", price: 299, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60" },
    
    kurta1: { id: "kurta-1", name: "Men's Designer Royal Purple Sherwani Set", price: 2499, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop&q=60" },
    kurta2: { id: "kurta-2", name: "Traditional Silk Blend Casual Kurta Pajama", price: 1899, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&auto=format&fit=crop&q=60" },
    hanger1: { id: "hanger-1", name: "Velvet Non-Slip Clothes Hangers (50 Pack)", price: 1199, img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=60" },
    hanger2: { id: "hanger-2", name: "Premium Bamboo Drawer Dividers & Organizers", price: 799, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&auto=format&fit=crop&q=60" }
  };

  const bestSellers = [
    { id: "bs-1", name: "Noise ColorFit Pulse Smartwatch (AMOLED)", price: 1899, oldPrice: "₹4,999", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&auto=format&fit=crop&q=60", stars: 5, discount: "62% off" },
    { id: "bs-2", name: "boAt Wave Call Bluetooth Headset (Bass Boost)", price: 1499, oldPrice: "₹2,999", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=60", stars: 4, discount: "50% off" },
    { id: "bs-3", name: "JBL Go 3 Wireless Portable Bluetooth Speaker", price: 2999, oldPrice: "₹3,999", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&auto=format&fit=crop&q=60", stars: 5, discount: "25% off" },
    { id: "bs-4", name: "Memory Foam Ergonomic Office Seat Cushion", price: 699, oldPrice: "₹1,499", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=60", stars: 4, discount: "53% off" },
    { id: "bs-5", name: "Home Laundry Stackable Utility Storage Bin", price: 549, oldPrice: "₹999", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&auto=format&fit=crop&q=60", stars: 4, discount: "45% off" },
    { id: "bs-6", name: "Philips GC122 1000W Dry Iron (Linen Safe)", price: 899, oldPrice: "₹1,299", img: "https://images.unsplash.com/photo-1498842812179-c81beecf902c?w=300&auto=format&fit=crop&q=60", stars: 5, discount: "31% off" }
  ];

  return (
    <div className="max-w-[1500px] mx-auto px-4 -mt-16 md:-mt-28 lg:-mt-40 relative z-10 select-none pb-10">
      
      {/* 1st Row of Cards (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Pick up where you left off (Tumblers) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3.5 tracking-tight leading-tight">Pick up where you left off</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {[products.tumbler1, products.tumbler2, products.tumbler3, products.tumbler4].map((item) => (
                <div key={item.id} className="group relative flex flex-col justify-between">
                  <div className="bg-slate-50 h-28 flex items-center justify-center p-2 rounded overflow-hidden relative border border-slate-100">
                    <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold truncate mt-1.5 leading-snug">{item.name}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-1 bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-bold py-1 px-2 rounded border border-[#a88734] text-[9px] shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    <ShoppingCart size={10} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            See more
          </span>
        </div>

        {/* Card 2: Pick up where you left off (Straws) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3.5 tracking-tight leading-tight">Pick up where you left off</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {[products.straw1, products.straw2, products.straw3, products.straw4].map((item) => (
                <div key={item.id} className="group relative flex flex-col justify-between">
                  <div className="bg-slate-50 h-28 flex items-center justify-center p-2 rounded overflow-hidden relative border border-slate-100">
                    <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold truncate mt-1.5 leading-snug">{item.name}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-1 bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-bold py-1 px-2 rounded border border-[#a88734] text-[9px] shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    <ShoppingCart size={10} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            See more
          </span>
        </div>

        {/* Card 3: Continue shopping deals */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3.5 tracking-tight leading-tight">Continue shopping deals</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {[products.kurta1, products.kurta2, products.hanger1, products.hanger2].map((item) => (
                <div key={item.id} className="group relative flex flex-col justify-between">
                  <div className="bg-slate-50 h-28 flex items-center justify-center p-2 rounded overflow-hidden relative border border-slate-100">
                    <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold truncate mt-1.5 leading-snug">{item.name}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-1 bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-bold py-1 px-2 rounded border border-[#a88734] text-[9px] shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    <ShoppingCart size={10} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            See all deals
          </span>
        </div>

        {/* Card 4: Amazon Business Bulk Discounts */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm relative overflow-hidden">
          <div className="space-y-4">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">
              Bulk discounts + 10% guaranteed cashback !
            </h3>
            
            <div className="flex gap-3 items-center">
              <div className="flex-1 space-y-3">
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  Save on corporate supplies, manage multiple invoices with GST inputs, and unlock wholesale volume tiers.
                </p>
                <button className="bg-gradient-to-b from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 text-xs font-bold py-1.5 px-3 border border-gray-300 rounded shadow-sm cursor-pointer transition-colors">
                  Register now
                </button>
              </div>

              {/* Amazon Business Badge */}
              <div className="bg-orange-500 text-white p-3 rounded flex flex-col items-center justify-center w-24 h-24 shrink-0 font-sans shadow-md border border-orange-600">
                <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90">amazon</span>
                <span className="text-sm font-extrabold tracking-tight">business</span>
                <span className="text-[7px] mt-1 bg-white/20 px-1 py-0.5 rounded">*T&C Apply</span>
              </div>
            </div>
          </div>

          {/* Advertisement / Hair Spectrum banner */}
          <div className="border-t border-gray-100 pt-4 mt-2">
            <h4 className="font-bold text-sm text-gray-900 leading-none">Vitamino Color Spectrum</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Lock in your day 1 color vibrancy for up to 100 days.
            </p>
            <div className="relative h-14 w-full rounded mt-2.5 overflow-hidden flex items-center justify-between px-3 text-white font-bold text-xs bg-cover bg-center cursor-pointer"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400')` }}>
              <div className="absolute inset-0 bg-purple-900/60 z-0" />
              <span className="relative z-10 tracking-wide font-extrabold text-[10px]">L'OREAL PROFESSIONNEL</span>
              <span className="relative z-10 bg-white/25 px-2 py-1 rounded text-[9px] uppercase tracking-wider font-semibold hover:bg-white/40">Shop</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2nd Row of Cards (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        
        {/* Card 5: Revamp your home */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div>
            <h3 className="text-[19px] font-bold text-gray-900 mb-3.5 tracking-tight leading-tight">Revamp your home</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              {[
                { name: "Bedding & Sheets", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150" },
                { name: "Lighting & Lamps", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150" },
                { name: "Home Decor", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150" },
                { name: "Storage organizers", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=150" }
              ].map((cat, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="bg-slate-50 h-28 flex items-center justify-center rounded overflow-hidden border border-slate-100">
                    <img src={cat.img} alt={cat.name} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold block truncate mt-1.5">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            Explore more ideas
          </span>
        </div>

        {/* Card 6: Deal of the Day (With Countdown Timer) */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[19px] font-bold text-gray-900 tracking-tight leading-tight">Deals of the Day</h3>
              <div className="flex items-center gap-1 text-[11px] text-red-600 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                <Clock size={12} className="animate-pulse" />
                <span>{timeLeft}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">Kitchenware, cookers & daily essentials</p>
            
            <div className="space-y-3.5">
              {[
                { name: "Prestige Cookware Sets", discount: "35% off", price: "₹1,299", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150", id: "dod-1" },
                { name: "Philips Air Fryers", discount: "45% off", price: "₹6,499", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150", id: "dod-2" },
                { name: "Glass Insulated Tumblers", discount: "60% off", price: "₹399", img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=150", id: "dod-3" }
              ].map((item) => (
                <div key={item.id} className="bg-gray-50 p-2.5 rounded border border-gray-100 flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded bg-white" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-700 text-white font-bold text-[9px] px-1 py-0.5 rounded inline-block">{item.discount}</span>
                      <span className="text-[9px] text-red-700 font-bold">Deal of the Day</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900 block mt-1 truncate">{item.name}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Starting at <span className="text-gray-950 font-bold">{item.price}</span></span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ id: item.id, name: item.name, price: parseInt(item.price.replace(/[^\d]/g, "")) });
                    }}
                    className="bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 p-1.5 rounded border border-[#a88734] shadow-sm flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            See all deals
          </span>
        </div>

        {/* Card 7: Starting at 399 */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div className="space-y-3">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">Starting at ₹399</h3>
            <p className="text-[11px] text-gray-500">Best deals on home utilities & laundry care</p>

            <div className="bg-slate-100 h-52 rounded border border-slate-200 flex flex-col items-center justify-center p-3 relative overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1498842812179-c81beecf902c?w=400" alt="Iron Box" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              
              <div className="absolute bottom-3 left-3 bg-[#b12704] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                Under ₹999
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-950">Steam irons & laundry care</span>
              <span className="text-red-700 font-extrabold">Min. 40% Off</span>
            </div>
          </div>
          <button 
            onClick={() => addToCart({ id: "iron-1", name: "Dry Iron GC122 Dry Iron", price: 899 })}
            className="w-full bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-bold py-1.5 px-3 border border-[#a88734] rounded text-xs shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <ShoppingCart size={13} /> Quick Add for ₹899
          </button>
        </div>

        {/* Card 8: Best Sellers in Electronics */}
        <div className="bg-white p-5 flex flex-col justify-between shadow-md min-h-[420px] rounded-sm">
          <div className="space-y-4">
            <h3 className="text-[19px] font-bold text-gray-900 leading-tight">Best Sellers in Electronics</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col justify-between hover:shadow-sm cursor-pointer group">
                <div className="h-20 flex items-center justify-center rounded overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150" alt="Headphones" className="h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 block mt-2 text-center truncate">Headphones</span>
              </div>

              <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col justify-between hover:shadow-sm cursor-pointer group">
                <div className="h-20 flex items-center justify-center rounded overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150" alt="Speaker" className="h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 block mt-2 text-center truncate">BT Speakers</span>
              </div>

              <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col justify-between hover:shadow-sm cursor-pointer group">
                <div className="h-20 flex items-center justify-center rounded overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150" alt="Smartwatch" className="h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 block mt-2 text-center truncate">Smartwatches</span>
              </div>

              <div className="bg-slate-50 p-2 rounded border border-slate-100 flex flex-col justify-between hover:shadow-sm cursor-pointer group">
                <div className="h-20 flex items-center justify-center rounded overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150" alt="Keyboard" className="h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 block mt-2 text-center truncate">Keyboards</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-bold mt-4 block">
            See all best sellers
          </span>
        </div>

      </div>

      {/* Horizontal Carousel (Best Sellers & More Picks) */}
      <div className="bg-white p-5 shadow-md mt-5 rounded-sm relative group/carousel">
        <h3 className="text-[19px] font-bold text-gray-900 mb-4 leading-none tracking-tight">Best Sellers & More Picks for You</h3>
        
        {/* Carousel Scroll Container */}
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
        >
          {bestSellers.map((prod) => (
            <div 
              key={prod.id} 
              className="w-48 bg-white border border-slate-200 p-4 shrink-0 hover:shadow-md cursor-pointer transition-shadow rounded flex flex-col justify-between relative group"
            >
              <div>
                <div className="h-28 bg-slate-50 rounded flex items-center justify-center p-2 border border-slate-100 overflow-hidden relative">
                  <img src={prod.img} alt={prod.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="bg-red-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{prod.discount}</span>
                  <span className="text-[9px] font-extrabold text-red-700">Limited Deal</span>
                </div>
                <span className="text-xs font-bold text-gray-850 block mt-1 line-clamp-2 leading-tight h-8">
                  {prod.name}
                </span>
              </div>
              
              <div className="mt-3">
                <div className="flex gap-0.5 text-amber-500 mb-1">
                  {[...Array(prod.stars)].map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-base font-extrabold text-gray-950">₹{prod.price}</span>
                  <span className="text-[10px] text-gray-500 line-through font-medium">{prod.oldPrice}</span>
                </div>
                
                {/* Add to Cart button */}
                <button 
                  onClick={() => addToCart({ id: prod.id, name: prod.name, price: prod.price })}
                  className="mt-2.5 w-full bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-bold py-1.5 px-3 border border-[#a88734] rounded text-[10px] shadow-sm flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <ShoppingCart size={11} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Left Control Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-black w-10 h-11 border border-slate-300 rounded shadow-md z-20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Right Control Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-black w-10 h-11 border border-slate-300 rounded shadow-md z-20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
}
