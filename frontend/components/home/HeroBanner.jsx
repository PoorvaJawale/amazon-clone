"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Mega home sale",
      subTitle: "Drying racks & home essentials",
      priceText: "Starting ₹999",
      brand: "bathla",
      bankOffer: "Up to 10% Instant Discount*",
      banks: "BOBCARD | HSBC",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80"
    },
    {
      title: "Up to 60% off | Electronics & Accessories",
      subTitle: "Smartwatches, headphones & more",
      priceText: "Deals starting ₹599",
      brand: "BOAT | Noise | OnePlus",
      bankOffer: "No Cost EMI up to 12 months",
      banks: "SBI Card | ICICI Bank",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&auto=format&fit=crop&q=80"
    },
    {
      title: "Upgrade your Kitchen",
      subTitle: "Mixer Grinders & Cookware",
      priceText: "Minimum 40% Off",
      brand: "Prestige | Philips",
      bankOffer: "Flat ₹500 cashback on Amazon Pay",
      banks: "Amazon Pay UPI",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80"
    }
  ];

  // Autoplay effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden select-none bg-gray-200">
      
      {/* Background slide images */}
      <div className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className="w-full h-full shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient Overlay left-to-right (mimics Amazon banner overlay) */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-slate-100/50 to-transparent flex items-start pt-6 md:pt-14 px-8 md:px-20 lg:px-28" />
          </div>
        ))}
      </div>

      {/* Foreground Content (Overlaid statically on top) */}
      <div className="absolute inset-x-0 top-0 pt-6 md:pt-12 px-8 md:px-20 lg:px-28 pointer-events-none flex flex-col justify-start items-start">
        <div className="max-w-md md:max-w-lg space-y-2 md:space-y-4">
          <div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-sm md:text-base text-gray-700 font-semibold mt-1">
              {slides[currentSlide].subTitle}
            </p>
          </div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-xl md:text-3xl font-extrabold text-red-700">{slides[currentSlide].priceText}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
              <span>by</span>
              <span className="bg-white/80 px-1.5 py-0.5 rounded border border-gray-300 text-[9px]">{slides[currentSlide].brand}</span>
            </span>
          </div>

          {/* Bank Offer Badge */}
          <div className="bg-white/95 border border-gray-300 rounded p-2.5 shadow-md pointer-events-auto inline-flex flex-col items-start gap-0.5 max-w-[280px]">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{slides[currentSlide].banks}</span>
            <span className="text-xs font-bold text-gray-800 leading-tight">{slides[currentSlide].bankOffer}</span>
            <span className="text-[8px] text-gray-400 mt-0.5 leading-none">*T&C apply</span>
          </div>
        </div>
      </div>

      {/* Slider Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 bottom-[60px] md:bottom-[100px] w-14 flex items-center justify-center text-gray-700 hover:text-black focus:outline-none hover:bg-black/5 transition-all cursor-pointer z-20"
      >
        <ChevronLeft size={44} strokeWidth={1.5} />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 bottom-[60px] md:bottom-[100px] w-14 flex items-center justify-center text-gray-700 hover:text-black focus:outline-none hover:bg-black/5 transition-all cursor-pointer z-20"
      >
        <ChevronRight size={44} strokeWidth={1.5} />
      </button>

      {/* Bottom slide indicator dots */}
      <div className="absolute bottom-[70px] md:bottom-[110px] left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
              currentSlide === i ? "bg-[#e77600] scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Bottom fade gradient blending into the body */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] md:h-[130px] bg-gradient-to-t from-[#eaeded] via-[#eaeded]/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
