"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, ShoppingCart, Menu, Sparkles, ChevronDown, X } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function Header() {
  const { 
    cart, 
    address, 
    setAddress, 
    setRufusOpen, 
    isAddressModalOpen, 
    setAddressModalOpen 
  } = useCartStore();

  const [pincode, setPincode] = useState(address.pincode);
  const [city, setCity] = useState(address.city);
  const [name, setName] = useState(address.name);
  const [selectedLang, setSelectedLang] = useState("EN");

  // Sum of quantities in cart
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setAddress({ name, pincode, city });
    setAddressModalOpen(false);
  };

  return (
    <header className="w-full text-white font-sans select-none z-30 relative">
      {/* Top Navbar */}
      <div className="bg-[#131921] h-14 flex items-center px-4 py-1 justify-between gap-3 text-sm">
        
        {/* Logo */}
        <Link href="/" className="flex items-center border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">
          <div className="flex flex-col items-start leading-none pt-1">
            <span className="font-extrabold text-lg tracking-tight text-white">amazon<span className="text-[#febd69] text-sm">.in</span></span>
            <span className="text-[10px] text-gray-300 self-end -mt-1 mr-1">prime</span>
          </div>
        </Link>

        {/* Deliver to address (Opens modal on click) */}
        <div 
          onClick={() => setAddressModalOpen(true)}
          className="flex items-center gap-1 border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer transition-colors"
        >
          <MapPin size={18} className="text-white mt-2" />
          <div className="flex flex-col leading-none">
            <span className="text-xs text-gray-300 font-normal">Deliver to {address.name}</span>
            <span className="text-sm font-bold text-white">{address.city} {address.pincode}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#f3a847]">
          <div className="bg-gray-100 text-gray-700 px-3 h-full flex items-center gap-1 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs">
            <span>All</span>
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

        {/* Language selector (Hover Dropdown) */}
        <div className="relative group flex items-center gap-1 border border-transparent hover:border-white px-2 py-3 rounded-sm cursor-pointer h-full">
          <span className="text-sm">🇮🇳</span>
          <span className="font-bold text-xs uppercase text-white">{selectedLang}</span>
          <ChevronDown size={12} className="text-gray-400" />

          {/* Hover Menu */}
          <div className="hidden group-hover:flex absolute top-[44px] left-0 bg-white text-gray-800 p-4 border border-gray-300 rounded shadow-xl flex-col gap-2.5 z-50 w-52">
            <span className="font-bold text-xs text-gray-900 border-b border-gray-200 pb-1">Select Language</span>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { code: "EN", label: "English" },
                { code: "HI", label: "हिन्दी - HI" },
                { code: "MR", label: "मराठी - MR" },
                { code: "TA", label: "தமிழ் - TA" },
                { code: "TE", label: "తెలుగు - TE" }
              ].map((lang) => (
                <label key={lang.code} className="flex items-center gap-2 cursor-pointer hover:text-orange-600 font-medium">
                  <input
                    type="radio"
                    name="language"
                    value={lang.code}
                    checked={selectedLang === lang.code}
                    onChange={() => setSelectedLang(lang.code)}
                    className="accent-orange-500 cursor-pointer"
                  />
                  <span>{lang.label}</span>
                </label>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-2 text-[10px] text-gray-500 font-medium">
              🇮🇳 You are shopping on Amazon.in
            </div>
          </div>
        </div>

        {/* Account & Lists (Hover Dropdown) */}
        <div className="relative group flex flex-col justify-center border border-transparent hover:border-white px-2 py-1.5 rounded-sm cursor-pointer h-full">
          <span className="text-xs text-gray-300 leading-none font-normal">Hello, {address.name}</span>
          <span className="text-sm font-bold text-white flex items-center gap-0.5 mt-0.5 leading-none">
            Account & Lists <ChevronDown size={12} className="text-gray-400" />
          </span>

          {/* Hover Menu */}
          <div className="hidden group-hover:flex absolute top-[44px] right-0 bg-white text-gray-800 p-6 border border-gray-300 rounded shadow-2xl z-50 w-[420px] justify-between gap-6 pointer-events-auto">
            {/* Left side list */}
            <div className="flex-1 border-r border-gray-200 pr-6">
              <h4 className="font-extrabold text-sm text-gray-950 mb-3 leading-none">Your Lists</h4>
              <ul className="space-y-2 text-xs text-gray-700">
                <li><a href="#" className="hover:text-orange-600 hover:underline">Create a Wish List</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Find a Wish List</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Baby Wishlist</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Discover Your Style</a></li>
              </ul>
            </div>

            {/* Right side list */}
            <div className="flex-1 pl-2">
              <h4 className="font-extrabold text-sm text-gray-950 mb-3 leading-none">Your Account</h4>
              <ul className="space-y-2 text-xs text-gray-700">
                <li><Link href="/login" className="hover:text-orange-600 hover:underline">Your Account</Link></li>
                <li><Link href="/orders" className="hover:text-orange-600 hover:underline">Your Orders</Link></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Your Wish List</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Your Recommendations</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Switch Accounts</a></li>
                <li className="border-t border-gray-200 pt-2 mt-2">
                  <Link href="/login" className="block text-center bg-gradient-to-b from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold py-1.5 px-3 rounded border border-amber-500 shadow-sm text-xs cursor-pointer">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Returns & Orders */}
        <Link href="/orders" className="flex flex-col leading-none border border-transparent hover:border-white px-2 py-1.5 rounded-sm cursor-pointer">
          <span className="text-xs text-gray-300 font-normal">Returns</span>
          <span className="text-sm font-bold text-white mt-0.5">& Orders</span>
        </Link>

        {/* Cart */}
        <Link href="/cart" className="flex items-end gap-1 border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer relative h-full">
          <div className="relative">
            <ShoppingCart size={28} className="text-white" />
            <span className="absolute -top-1 left-3 bg-[#131921] text-[#f3a847] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#131921]">
              {cartCount}
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
          <button 
            onClick={() => setRufusOpen(true)}
            className="flex items-center gap-1 bg-[#131921] border border-cyan-500/30 hover:border-cyan-400 px-2.5 py-0.5 rounded-full text-xs font-semibold text-cyan-300 transition-all shadow-sm cursor-pointer hover:scale-105"
          >
            <Sparkles size={12} className="text-cyan-400 fill-cyan-400 animate-pulse" />
            <span>Rufus</span>
          </button>

          {/* Nav links */}
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Fresh</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Keep Shopping for</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">MX Player</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Sell</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Amazon Pay</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Gift Cards</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Buy Again</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Gift Ideas</span>
          <span className="hover:border-white border border-transparent px-2 py-1 rounded-sm cursor-pointer font-normal">Amazon Basics</span>
        </div>

        {/* Right Ad Text / Prime Day Link */}
        <div className="hidden lg:flex items-center gap-1 font-bold text-yellow-400 cursor-pointer hover:underline">
          <span>prime day</span>
          <span className="text-white text-xs font-normal">| 4 - 6 July</span>
        </div>
      </div>

      {/* Address Selection Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 w-full max-w-[420px] rounded-md shadow-2xl overflow-hidden border border-gray-300 flex flex-col font-sans">
            {/* Modal Header */}
            <div className="bg-[#f0f2f2] px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-[15px] text-gray-900">Choose your location</h3>
              <button 
                onClick={() => setAddressModalOpen(false)}
                className="text-gray-500 hover:text-black cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddressSubmit} className="p-5 space-y-4">
              <p className="text-[11px] text-gray-500 leading-snug">
                Select a delivery location to see product availability, shipping rates, and special offers.
              </p>
              
              <div className="space-y-3.5">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-900">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-400 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-900">Pincode</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border border-gray-400 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-900">City / State</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-400 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#f0c14b] hover:bg-[#ebd06b] text-gray-900 font-semibold py-2 px-4 border border-[#a88734] rounded shadow-sm text-xs cursor-pointer transition-colors"
              >
                Apply Address
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
