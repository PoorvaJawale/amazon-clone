"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, ShoppingCart, Menu, Sparkles, ChevronDown } from "lucide-react";

export default function Header() {
  const [searchCategory, setSearchCategory] = useState("All");

  return (
    <header className="w-full text-white font-sans select-none">
      {/* Top Navbar */}
      <div className="bg-[#131921] h-14 flex items-center px-4 py-1 justify-between gap-3 text-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">
          <div className="flex flex-col items-start leading-none pt-1">
            <span className="font-extrabold text-lg tracking-tight text-white">amazon<span className="text-[#febd69] text-sm">.in</span></span>
            <span className="text-[10px] text-gray-300 self-end -mt-1 mr-1">prime</span>
          </div>
        </Link>

        {/* Deliver to Poorva */}
        <div className="flex items-center gap-1 border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">
          <MapPin size={18} className="text-white mt-2" />
          <div className="flex flex-col leading-none">
            <span className="text-xs text-gray-300">Deliver to Poorva</span>
            <span className="text-sm font-bold text-white">Vasai Virar 401203</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#f3a847]">
          <div className="bg-gray-100 text-gray-700 px-3 h-full flex items-center gap-1 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs">
            <span>{searchCategory}</span>
            <ChevronDown size={14} />
          </div>
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="flex-grow px-3 py-2 text-black text-sm outline-none w-full h-full"
          />
          <button className="bg-[#febd69] hover:bg-[#f3a847] text-gray-800 p-2.5 h-full w-12 flex items-center justify-center cursor-pointer transition-colors">
            <Search size={20} className="font-bold" />
          </button>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 border border-transparent hover:border-white px-2 py-2.5 rounded-sm cursor-pointer">
          <span className="text-sm">🇮🇳</span>
          <span className="font-bold text-xs uppercase text-white">EN</span>
          <ChevronDown size={12} className="text-gray-400" />
        </div>

        {/* Account & Lists */}
        <Link href="/login" className="flex flex-col leading-none border border-transparent hover:border-white px-2 py-1.5 rounded-sm cursor-pointer">
          <span className="text-xs text-gray-300">Hello, Poorva</span>
          <span className="text-sm font-bold text-white flex items-center gap-0.5">
            Account & Lists <ChevronDown size={12} className="text-gray-400" />
          </span>
        </Link>

        {/* Returns & Orders */}
        <Link href="/orders" className="flex flex-col leading-none border border-transparent hover:border-white px-2 py-1.5 rounded-sm cursor-pointer">
          <span className="text-xs text-gray-300">Returns</span>
          <span className="text-sm font-bold text-white">& Orders</span>
        </Link>

        {/* Cart */}
        <Link href="/cart" className="flex items-end gap-1 border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer relative">
          <div className="relative">
            <ShoppingCart size={28} className="text-white" />
            <span className="absolute -top-1 left-3 bg-[#131921] text-[#f3a847] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#131921]">
              2
            </span>
          </div>
          <span className="text-sm font-bold text-white mb-0.5">Cart</span>
        </Link>
      </div>

      {/* Sub Navbar */}
      <div className="bg-[#232f3e] h-10 flex items-center px-4 justify-between text-sm">
        {/* Left Links */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-bold border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">
            <Menu size={18} />
            <span>All</span>
          </div>

          {/* Rufus AI Bot Badge */}
          <Link href="/ai-assistant" className="flex items-center gap-1 bg-[#131921] border border-cyan-500/30 hover:border-cyan-400 px-2.5 py-0.5 rounded-full text-xs font-semibold text-cyan-300 transition-all shadow-sm cursor-pointer">
            <Sparkles size={12} className="text-cyan-400 fill-cyan-400 animate-pulse" />
            <span>Rufus</span>
          </Link>

          {/* Nav links */}
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Fresh</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Keep Shopping for</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">MX Player</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Sell</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Amazon Pay</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Gift Cards</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Buy Again</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Gift Ideas</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer">Amazon Basics</span>
        </div>

        {/* Right Ad Text / Prime Day Link */}
        <div className="hidden lg:flex items-center gap-1 font-bold text-yellow-400 cursor-pointer hover:underline">
          <span>prime day</span>
          <span className="text-white text-xs font-normal">| 4 - 6 July</span>
        </div>
      </div>
    </header>
  );
}
