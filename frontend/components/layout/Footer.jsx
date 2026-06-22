"use client";

import Link from "next/link";
import { Globe, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-white font-sans text-xs select-none mt-5">
      {/* Back to top */}
      <div
        onClick={scrollToTop}
        className="bg-[#37475a] hover:bg-[#47576a] py-3.5 text-center text-sm font-semibold cursor-pointer transition-colors"
      >
        Back to top
      </div>

      {/* Main Links Grid */}
      <div className="bg-[#232f3e] px-8 py-10 md:py-14 border-b border-slate-700">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">About Amazon</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
              <li><a href="#" className="hover:underline">Amazon Science</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300 leading-relaxed">
              <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:underline">Supply to Amazon</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Returns Centre</a></li>
              <li><a href="#" className="hover:underline">Recalls and Product Safety Alerts</a></li>
              <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:underline">Amazon App Download</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand & Language Selection */}
      <div className="bg-[#232f3e] py-8 flex flex-col md:flex-row items-center justify-center gap-6">
        <Link href="/" className="font-extrabold text-lg text-white tracking-tight cursor-pointer">
          amazon<span className="text-[#febd69] text-xs">.in</span>
        </Link>
        
        <div className="flex gap-3 text-xs text-gray-300">
          <div className="flex items-center gap-2 border border-gray-500 rounded px-3 py-1.5 cursor-pointer hover:border-white">
            <Globe size={14} />
            <span>English</span>
          </div>
          <div className="flex items-center gap-2 border border-gray-500 rounded px-3 py-1.5 cursor-pointer hover:border-white">
            <span>🇮🇳 India</span>
          </div>
        </div>
      </div>

      {/* Lower Directory Grid */}
      <div className="bg-[#131a22] px-8 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-gray-400">
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">AbeBooks</a>
            <span className="text-[10px] text-gray-500">Books, art & collectibles</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">Amazon Web Services</a>
            <span className="text-[10px] text-gray-500">Scalable Cloud Computing Services</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">Audible</a>
            <span className="text-[10px] text-gray-500">Download Audio Books</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">IMDb</a>
            <span className="text-[10px] text-gray-500">Movies, TV & Celebrities</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">Shopbop</a>
            <span className="text-[10px] text-gray-500">Designer Fashion Brands</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">Amazon Business</a>
            <span className="text-[10px] text-gray-500">Everything For Your Business</span>
          </div>
          <div>
            <a href="#" className="block font-semibold text-[11px] text-gray-300 hover:underline leading-tight">Amazon Music</a>
            <span className="text-[10px] text-gray-500">Stream millions of songs</span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-gray-400 mt-10 text-[10px]">
          <div className="space-x-4 mb-2">
            <a href="#" className="hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <span>© 1996-2026, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  );
}
