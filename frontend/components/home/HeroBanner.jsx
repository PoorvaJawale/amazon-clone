"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Mega home sale",
      subTitle: "Drying racks",
      priceText: "Starting ₹999",
      brand: "bathla",
      bankOffer: "Up to 10% Instant Discount*",
      banks: "BOBCARD | HSBC",
      bgColor: "from-slate-300 to-slate-100",
      image: (
        <svg viewBox="0 0 200 150" className="w-full h-full text-slate-700 max-h-56">
          {/* Standing Rack Frame */}
          <line x1="40" y1="130" x2="80" y2="40" stroke="currentColor" strokeWidth="4" />
          <line x1="160" y1="130" x2="120" y2="40" stroke="currentColor" strokeWidth="4" />
          <line x1="80" y1="40" x2="120" y2="40" stroke="currentColor" strokeWidth="4" />
          {/* Leg Support Bars */}
          <line x1="60" y1="85" x2="140" y2="85" stroke="currentColor" strokeWidth="2.5" />
          <line x1="50" y1="108" x2="150" y2="108" stroke="currentColor" strokeWidth="2" />
          {/* Wing 1 */}
          <line x1="80" y1="40" x2="45" y2="25" stroke="currentColor" strokeWidth="3" />
          <line x1="45" y1="25" x2="60" y2="85" stroke="gray" strokeWidth="1" strokeDasharray="2" />
          {/* Wing 2 */}
          <line x1="120" y1="40" x2="155" y2="25" stroke="currentColor" strokeWidth="3" />
          {/* Rack Lines (Rungs) */}
          <line x1="75" y1="45" x2="125" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="55" x2="130" y2="55" stroke="currentColor" strokeWidth="1.5" />
          <line x1="65" y1="65" x2="135" y2="65" stroke="currentColor" strokeWidth="1.5" />
          <line x1="60" y1="75" x2="140" y2="75" stroke="currentColor" strokeWidth="1.5" />
          <line x1="55" y1="95" x2="145" y2="95" stroke="currentColor" strokeWidth="1" />
          {/* Hangers (small details) */}
          <circle cx="82" cy="40" r="1.5" fill="currentColor" />
          <circle cx="118" cy="40" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Up to 60% off | Electronics & Accessories",
      subTitle: "Smartwatches, headphones & more",
      priceText: "Deals starting ₹599",
      brand: "BOAT | Noise | OnePlus",
      bankOffer: "No Cost EMI up to 12 months",
      banks: "SBI Card | ICICI Bank",
      bgColor: "from-blue-200 to-indigo-50",
      image: (
        <svg viewBox="0 0 200 150" className="w-full h-full text-indigo-900 max-h-56">
          {/* Smartwatch drawing */}
          <rect x="75" y="45" width="50" height="60" rx="10" ry="10" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="100" cy="75" r="20" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
          {/* Strap Top */}
          <path d="M 85,45 L 85,15 L 115,15 L 115,45" fill="gray" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" />
          {/* Strap Bottom */}
          <path d="M 85,105 L 85,135 L 115,135 L 115,105" fill="gray" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" />
          {/* Interface Details */}
          <line x1="100" y1="65" x2="100" y2="80" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="80" x2="112" y2="80" stroke="currentColor" strokeWidth="2" />
          {/* Side Crown button */}
          <rect x="125" y="68" width="4" height="14" rx="2" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Upgrade your Kitchen",
      subTitle: "Mixer Grinders & Cookware",
      priceText: "Minimum 40% Off",
      brand: "Prestige | Philips",
      bankOffer: "Flat ₹500 cashback on Amazon Pay",
      banks: "Amazon Pay UPI",
      bgColor: "from-amber-200 to-orange-50",
      image: (
        <svg viewBox="0 0 200 150" className="w-full h-full text-amber-900 max-h-56">
          {/* Mixer Grinder drawing */}
          <path d="M 65,120 L 75,50 L 125,50 L 135,120 Z" fill="none" stroke="currentColor" strokeWidth="4" />
          {/* Jar */}
          <rect x="80" y="20" width="40" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M 120,25 L 128,25 L 128,45 L 120,45" fill="none" stroke="currentColor" strokeWidth="2.5" /> {/* Handle */}
          {/* Base bottom */}
          <rect x="60" y="120" width="80" height="10" rx="2" fill="currentColor" />
          {/* Knob */}
          <circle cx="100" cy="85" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="85" r="3" fill="currentColor" />
          {/* Speed settings dots */}
          <circle cx="85" cy="85" r="1.5" fill="currentColor" />
          <circle cx="115" cy="85" r="1.5" fill="currentColor" />
        </svg>
      )
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const active = slides[currentSlide];

  return (
    <div className="relative w-full h-[220px] md:h-[320px] lg:h-[400px] overflow-hidden select-none bg-gray-200">
      {/* Slide Content */}
      <div className={`w-full h-full bg-gradient-to-b ${active.bgColor} flex px-8 md:px-16 lg:px-24 items-start pt-6 md:pt-10 transition-all duration-500 ease-in-out`}>
        {/* Left text column */}
        <div className="flex-1 flex flex-col items-start space-y-2 md:space-y-4 max-w-lg mt-2">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {active.title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-semibold mt-1">
              {active.subTitle}
            </p>
          </div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-xl md:text-3xl font-extrabold text-red-700">{active.priceText}</span>
            {active.brand && (
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-2">
                <span>by</span>
                <span className="bg-white/70 px-1.5 py-0.5 rounded border border-gray-300 text-[10px]">{active.brand}</span>
              </span>
            )}
          </div>

          {/* Bank Offer detail badge */}
          <div className="bg-white border border-gray-300 rounded px-3 py-1.5 shadow-sm inline-flex flex-col items-start gap-0.5 max-w-[280px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{active.banks}</span>
            <span className="text-xs font-bold text-gray-800 leading-tight">{active.bankOffer}</span>
            <span className="text-[9px] text-gray-400 mt-0.5 leading-none">*T&C apply</span>
          </div>
        </div>

        {/* Right image column */}
        <div className="hidden md:flex flex-1 justify-center items-center h-full max-h-[220px] lg:max-h-[300px]">
          {active.image}
        </div>
      </div>

      {/* Slider Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 bottom-[60px] w-14 flex items-center justify-center text-gray-700 hover:text-black focus:outline-none hover:bg-black/5 transition-all cursor-pointer"
      >
        <ChevronLeft size={44} strokeWidth={1} />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 bottom-[60px] w-14 flex items-center justify-center text-gray-700 hover:text-black focus:outline-none hover:bg-black/5 transition-all cursor-pointer"
      >
        <ChevronRight size={44} strokeWidth={1} />
      </button>

      {/* Fade overlay on the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] md:h-[120px] bg-gradient-to-t from-[#eaeded] to-transparent pointer-events-none" />
    </div>
  );
}
