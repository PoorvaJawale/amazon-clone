"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { isLoggedIn, logout, getMe } from "../../services/auth";
import {
  FaMapMarkerAlt, FaSearch, FaShoppingCart, FaBars, FaChevronDown,
  FaGlobe, FaBolt, FaGift, FaStar
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const CATEGORIES = [
  "Electronics", "Mobiles", "Computers", "Books", "Clothing",
  "Home & Kitchen", "Sports", "Beauty", "Toys", "Grocery",
  "Automotive", "Health", "Jewellery", "Music", "Software",
];

const NAV_LINKS = [
  { label: "Fresh", icon: null },
  { label: "Keep Shopping for", icon: null },
  { label: "MX Player", icon: null },
  { label: "Sell", icon: null },
  { label: "Amazon Pay", icon: null },
  { label: "Gift Cards", icon: FaGift },
  { label: "Buy Again", icon: null },
  { label: "Gift Ideas", icon: null },
  { label: "AmazonBasics", icon: null },
];

export default function Navbar() {
  const router = useRouter();
  const { count } = useCartStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [catOpen, setCatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn()) {
      getMe().then(setUser).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setAccountOpen(false);
    router.push("/login");
  };

  const firstName = user?.full_name?.split(" ")[0] || user?.name?.split(" ")[0] || "Sign In";

  return (
    <header className="sticky top-0 z-50">
      {/* ── Top Bar ── */}
      <div className="bg-[#131921] flex items-stretch h-[60px] px-3 gap-2 text-white text-sm">

        {/* Logo */}
        <Link href="/"
          className="flex items-center border border-transparent hover:border-white rounded px-2 shrink-0 mr-1">
          <div className="flex flex-col leading-none">
            <span className="text-white font-extrabold text-[22px] tracking-tight leading-none">
              amazon
            </span>
            <span className="text-[#ff9900] text-[10px] font-bold self-end">.in</span>
          </div>
        </Link>

        {/* Deliver to */}
        <Link href="/profile"
          className="hidden lg:flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-2 shrink-0">
          <FaMapMarkerAlt className="text-white mb-0.5 shrink-0" size={14} />
          <div className="flex flex-col leading-none">
            <span className="text-[#ccc] text-[11px]">Deliver to {user?.full_name?.split(" ")[0] || "India"}</span>
            <span className="text-white font-bold text-[13px]">Select location</span>
          </div>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-1 h-10 self-center rounded overflow-hidden min-w-0">
          {/* Category dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setCatOpen(!catOpen)}
              className="h-full bg-[#f3f3f3] hover:bg-[#e9e9e9] text-[#555] px-3 flex items-center gap-1 text-xs font-medium border-r border-[#cdcdcd]"
            >
              <span className="max-w-[80px] truncate">{category}</span>
              <FaChevronDown size={10} />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 bg-white border border-[#ccc] shadow-lg z-50 w-52 max-h-80 overflow-y-auto text-black rounded-b">
                {["All", ...CATEGORIES].map((c) => (
                  <div
                    key={c}
                    onClick={() => { setCategory(c); setCatOpen(false); }}
                    className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-[#e8e8e8] ${category === c ? "bg-[#e8e8e8] font-bold" : ""}`}
                  >{c}</div>
                ))}
              </div>
            )}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search Amazon.in"
            className="flex-1 px-3 text-black text-sm outline-none min-w-0"
          />
          <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-4 shrink-0 flex items-center justify-center">
            <FaSearch className="text-[#333]" size={18} />
          </button>
        </form>

        {/* Language */}
        <div className="hidden md:flex items-center border border-transparent hover:border-white rounded px-2 gap-1 shrink-0 cursor-pointer">
          <span className="text-base">🇮🇳</span>
          <span className="text-xs font-bold">EN</span>
          <FaChevronDown size={10} className="text-[#ccc]" />
        </div>

        {/* Account & Lists */}
        <div ref={accountRef} className="relative flex items-center">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex flex-col justify-center border border-transparent hover:border-white rounded px-2 py-1.5 h-full text-left cursor-pointer"
          >
            <span className="text-[11px] text-[#ccc]">Hello, {firstName}</span>
            <span className="text-[13px] font-bold flex items-center gap-0.5">
              Account &amp; Lists <FaChevronDown size={10} className="text-[#ccc]" />
            </span>
          </button>

          {accountOpen && (
            <div className="absolute top-full right-0 bg-white text-black shadow-2xl border border-[#ccc] rounded z-50 w-[360px] flex">
              <div className="flex-1 p-5 border-r border-[#e7e7e7]">
                {!isLoggedIn() ? (
                  <>
                    <Link href="/login" onClick={() => setAccountOpen(false)}
                      className="block w-full text-center bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] rounded text-sm font-semibold py-1.5 mb-3">
                      Sign In
                    </Link>
                    <p className="text-xs text-center">
                      New customer?{" "}
                      <Link href="/register" onClick={() => setAccountOpen(false)} className="text-[#0066c0] hover:text-[#c45500] hover:underline">
                        Start here
                      </Link>
                    </p>
                  </>
                ) : (
                  <button onClick={handleLogout}
                    className="block w-full text-center bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] rounded text-sm font-semibold py-1.5">
                    Sign Out
                  </button>
                )}
                <div className="mt-4">
                  <p className="text-xs font-bold text-black mb-2">Your Lists</p>
                  <ul className="space-y-1.5 text-xs text-[#0066c0]">
                    <li><Link href="/wishlist" onClick={() => setAccountOpen(false)} className="hover:underline hover:text-[#c45500]">Create a Wish List</Link></li>
                    <li><Link href="/wishlist" onClick={() => setAccountOpen(false)} className="hover:underline hover:text-[#c45500]">Wish List</Link></li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 p-5">
                <p className="text-xs font-bold text-black mb-2">Your Account</p>
                <ul className="space-y-1.5 text-xs text-[#0066c0]">
                  {[
                    { label: "Account", href: "/profile" },
                    { label: "Orders", href: "/orders" },
                    { label: "Wish List", href: "/wishlist" },
                    { label: "AI Assistant", href: "/ai-assistant" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} onClick={() => setAccountOpen(false)} className="hover:underline hover:text-[#c45500]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <Link href="/orders"
          className="hidden md:flex flex-col justify-center border border-transparent hover:border-white rounded px-2 py-1.5 shrink-0">
          <span className="text-[11px] text-[#ccc]">Returns</span>
          <span className="text-[13px] font-bold">&amp; Orders</span>
        </Link>

        {/* Cart */}
        <Link href="/cart"
          className="flex items-end gap-1.5 border border-transparent hover:border-white rounded px-2 py-1.5 relative shrink-0">
          <div className="relative">
            <FaShoppingCart size={30} className="text-white" />
            <span className="absolute -top-2 left-3.5 text-[#f08804] font-extrabold text-[16px] leading-none min-w-[18px] text-center">
              {count}
            </span>
          </div>
          <span className="font-bold text-[13px] mb-0.5 hidden sm:block">Cart</span>
        </Link>
      </div>

      {/* ── Secondary Nav ── */}
      <div className="bg-[#232f3e] flex items-center h-[38px] px-3 gap-0.5 text-white text-[13px] overflow-x-auto scrollbar-hide">
        <button className="flex items-center gap-1.5 nav-link font-bold shrink-0 px-2">
          <FaBars size={16} />
          <span>All</span>
        </button>

        <Link href="/ai-assistant"
          className="flex items-center gap-1 border border-transparent hover:border-white rounded px-2.5 py-0.5 text-xs font-semibold text-[#00b0c4] bg-[#0d2030] hover:bg-[#163040] rounded-full mx-1 shrink-0 transition-colors">
          <HiSparkles className="text-[#00c8e0]" size={13} />
          Rufus AI
        </Link>

        {NAV_LINKS.map(({ label, icon: Icon }) => (
          <button key={label} className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">
            {Icon && <Icon size={12} className="mr-1" />}
            {label}
          </button>
        ))}

        {/* Prime Day badge – right side */}
        <div className="ml-auto hidden xl:flex items-center gap-2 shrink-0 font-bold text-[#febd69] text-[13px]">
          <FaBolt size={12} />
          <span>prime day</span>
          <span className="text-white text-[11px] font-normal">| 4–6 July</span>
          <FaBolt size={12} />
        </div>
      </div>
    </header>
  );
}
