"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { isLoggedIn, logout, getMe } from "../../services/auth";
import { getOrders } from "../../services/orders";
import {
  FaMapMarkerAlt, FaSearch, FaShoppingCart, FaBars, FaChevronDown,
  FaGift, FaBolt, FaStar, FaShoppingBag, FaTimes, FaGlobe
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { toast } from "sonner";

const CATEGORIES = [
  "Electronics", "Mobiles", "Computers", "Books", "Clothing",
  "Home & Kitchen", "Sports", "Beauty", "Toys", "Grocery",
  "Automotive", "Health", "Jewellery", "Music", "Software",
];

/* ── Language config ── */
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
];

/* ── AI translation via OpenAI ── */
async function translateUI(targetLang, targetLabel) {
  if (targetLang === "en") return null;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang: targetLabel,
        texts: ["Search Amazon.in", "Sign In", "Cart", "Account & Lists", "Returns", "Orders", "All", "Keep Shopping", "Buy Again", "Rufus AI"]
      }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ── Recently viewed / keep shopping data ── */
const TRENDING = [
  { id: "t1", name: "Noise ColorFit Ultra 3 Smartwatch", price: 2499, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150&q=60" },
  { id: "t2", name: "boAt Airdopes 161 TWS Earbuds", price: 1099, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&q=60" },
  { id: "t3", name: "Prestige 3L Pressure Cooker", price: 899, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&q=60" },
  { id: "t4", name: "Sony WH-1000XM5 Headphones", price: 19990, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&q=60" },
  { id: "t5", name: "Milton Thermosteel Flask 1L", price: 799, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=150&q=60" },
  { id: "t6", name: "Samsung Galaxy Buds3 Pro", price: 9999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&q=60" },
];

export default function Navbar() {
  const router = useRouter();
  const { count, addItem } = useCartStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [catOpen, setCatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  // Language state
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [translations, setTranslations] = useState(null);
  const [translating, setTranslating] = useState(false);
  const langRef = useRef(null);

  // Drawer state
  const [keepShoppingOpen, setKeepShoppingOpen] = useState(false);
  const [buyAgainOpen, setBuyAgainOpen] = useState(false);
  const [buyAgainItems, setBuyAgainItems] = useState([]);
  const [allMenuOpen, setAllMenuOpen] = useState(false);

  const t = (key, fallback) => (translations && translations[key]) || fallback;

  useEffect(() => {
    if (isLoggedIn()) {
      getMe().then(setUser).catch(() => {});
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setAccountOpen(false);
    toast.success("Signed out successfully");
    router.push("/");
  };

  async function handleLangSelect(lang) {
    setSelectedLang(lang);
    setLangOpen(false);
    if (lang.code === "en") { setTranslations(null); return; }
    setTranslating(true);
    toast.info(`Translating to ${lang.label}...`);
    const result = await translateUI(lang.code, lang.label);
    setTranslations(result);
    setTranslating(false);
    if (result) toast.success(`UI translated to ${lang.label}`);
    else toast.info(`Translation unavailable — using English`);
  }

  function handleKeepShopping() {
    setKeepShoppingOpen(true);
  }

  function handleBuyAgain() {
    if (isLoggedIn()) {
      getOrders().then((orders) => {
        const items = [];
        (orders || []).forEach((o) => {
          (o.items || []).forEach((item) => {
            const name = item.name || item.product?.name;
            const price = item.price || item.product?.price;
            const img = item.image || item.product?.image;
            if (name) items.push({ id: item.id || Math.random(), name, price, image: img });
          });
        });
        setBuyAgainItems(items.length > 0 ? items : TRENDING);
      }).catch(() => setBuyAgainItems(TRENDING));
    } else {
      setBuyAgainItems(TRENDING);
    }
    setBuyAgainOpen(true);
  }

  const firstName = user?.full_name?.split(" ")[0] || "Sign In";

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* ── Top Bar ── */}
        <div className="bg-[#131921] flex items-stretch h-[60px] px-3 gap-2 text-white text-sm">

          {/* Logo */}
          <Link href="/"
            className="flex items-center border border-transparent hover:border-white rounded px-2 shrink-0 mr-1">
            <div className="flex flex-col leading-none">
              <span className="text-white font-extrabold text-[22px] tracking-tight leading-none">amazon</span>
              <span className="text-[#ff9900] text-[10px] font-bold self-end">.in</span>
            </div>
          </Link>

          {/* Deliver to */}
          <Link href="/profile"
            className="hidden lg:flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-2 shrink-0">
            <FaMapMarkerAlt className="text-white mb-0.5 shrink-0" size={14} />
            <div className="flex flex-col leading-none">
              <span className="text-[#ccc] text-[11px]">Deliver to</span>
              <span className="text-white font-bold text-[13px]">{user?.full_name?.split(" ")[0] || "India"}</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 h-10 self-center rounded overflow-hidden min-w-0">
            <div className="relative shrink-0 hidden sm:block">
              <button type="button" onClick={() => setCatOpen(!catOpen)}
                className="h-full bg-[#f3f3f3] hover:bg-[#e9e9e9] text-[#555] px-2 flex items-center gap-1 text-xs font-medium border-r border-[#cdcdcd]">
                <span className="max-w-[70px] truncate hidden md:block">{category}</span>
                <span className="block md:hidden">All</span>
                <FaChevronDown size={9} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 bg-white border border-[#ccc] shadow-lg z-50 w-52 max-h-80 overflow-y-auto text-black rounded-b">
                  {["All", ...CATEGORIES].map((c) => (
                    <div key={c} onClick={() => { setCategory(c); setCatOpen(false); }}
                      className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-[#e8e8e8] ${category === c ? "bg-[#e8e8e8] font-bold" : ""}`}>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={t("Search Amazon.in", "Search Amazon.in")}
              className="flex-1 px-3 text-black text-sm outline-none min-w-0 w-full"
            />
            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-3 sm:px-4 shrink-0 flex items-center justify-center">
              <FaSearch className="text-[#333]" size={16} />
            </button>
          </form>

          {/* Language selector */}
          <div ref={langRef} className="relative hidden md:flex items-center">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 border border-transparent hover:border-white rounded px-2 h-full"
            >
              <span className="text-base">{selectedLang.flag}</span>
              <span className="text-xs font-bold">{selectedLang.code.toUpperCase()}</span>
              {translating && <span className="w-3 h-3 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />}
              <FaChevronDown size={9} className="text-[#ccc]" />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white text-black shadow-2xl border border-[#ccc] rounded z-50 w-44 py-1">
                <p className="text-[10px] font-bold text-[#565959] px-3 py-1 uppercase tracking-wide border-b border-[#eee] mb-1">
                  AI-Powered Translation
                </p>
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => handleLangSelect(l)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#f7f7f7] ${selectedLang.code === l.code ? "bg-[#febd69]/20 font-bold text-[#c45500]" : ""}`}>
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {selectedLang.code === l.code && <span className="ml-auto text-[#007600]">✓</span>}
                  </button>
                ))}
                <p className="text-[9px] text-[#888] px-3 py-1 border-t border-[#eee] mt-1">
                  Powered by OpenAI GPT
                </p>
              </div>
            )}
          </div>

          {/* Account & Lists */}
          <div ref={accountRef} className="relative flex items-center">
            <button onClick={() => setAccountOpen(!accountOpen)}
              className="flex flex-col justify-center border border-transparent hover:border-white rounded px-2 py-1.5 h-full text-left cursor-pointer">
              <span className="text-[11px] text-[#ccc]">Hello, {firstName}</span>
              <span className="text-[13px] font-bold flex items-center gap-0.5">
                <span className="hidden sm:inline">Account &amp; Lists</span>
                <span className="inline sm:hidden">Account</span>
                <FaChevronDown size={10} className="text-[#ccc]" />
              </span>
            </button>

            {accountOpen && (
              <div className="absolute top-full right-0 bg-white text-black shadow-2xl border border-[#ccc] rounded z-50 w-[360px] flex">
                <div className="flex-1 p-5 border-r border-[#e7e7e7]">
                  {!isLoggedIn() ? (
                    <>
                      <Link href="/login" onClick={() => setAccountOpen(false)}
                        className="block w-full text-center bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] rounded text-sm font-semibold py-1.5 mb-3">
                        {t("Sign In", "Sign In")}
                      </Link>
                      <p className="text-xs text-center">New customer?{" "}
                        <Link href="/register" onClick={() => setAccountOpen(false)} className="text-[#0066c0] hover:text-[#c45500] hover:underline">Start here</Link>
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
                      { label: "Rufus AI", href: "/ai-assistant" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} onClick={() => setAccountOpen(false)} className="hover:underline hover:text-[#c45500]">{label}</Link>
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
            <span className="text-[11px] text-[#ccc]">{t("Returns", "Returns")}</span>
            <span className="text-[13px] font-bold">&amp; {t("Orders", "Orders")}</span>
          </Link>

          {/* Cart */}
          <Link href="/cart"
            className="flex items-end gap-1.5 border border-transparent hover:border-white rounded px-2 py-1.5 relative shrink-0">
            <div className="relative">
              <FaShoppingCart size={28} className="text-white" />
              <span className="absolute -top-2 left-3.5 text-[#f08804] font-extrabold text-[16px] leading-none min-w-[18px] text-center">
                {count}
              </span>
            </div>
            <span className="font-bold text-[13px] mb-0.5 hidden sm:block">{t("Cart", "Cart")}</span>
          </Link>
        </div>

        {/* ── Secondary Nav ── */}
        <div className="bg-[#232f3e] flex items-center h-[38px] px-3 gap-0.5 text-white text-[13px] overflow-x-auto scrollbar-hide">
          {/* All menu */}
          <button
            onClick={() => setAllMenuOpen(!allMenuOpen)}
            className="flex items-center gap-1.5 nav-link font-bold shrink-0 px-2">
            <FaBars size={16} />
            <span>{t("All", "All")}</span>
          </button>

          {/* Rufus AI */}
          <Link href="/ai-assistant"
            className="flex items-center gap-1 border border-transparent hover:border-white rounded px-2.5 py-0.5 text-xs font-semibold text-[#00b0c4] bg-[#0d2030] hover:bg-[#163040] rounded-full mx-1 shrink-0 transition-colors">
            <HiSparkles className="text-[#00c8e0]" size={13} />
            Rufus AI
          </Link>

          {/* Fresh */}
          <Link href="/search?q=fresh+grocery" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Fresh</Link>

          {/* Keep Shopping For */}
          <button onClick={handleKeepShopping}
            className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px] flex items-center gap-1">
            {t("Keep Shopping", "Keep Shopping for")}
          </button>

          {/* Other links */}
          <Link href="/search?q=movies" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">MX Player</Link>
          <Link href="/search?q=sell" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Sell</Link>
          <Link href="/search?q=amazon+pay" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Amazon Pay</Link>
          <Link href="/search?q=gift+cards" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px] flex items-center gap-1">
            <FaGift size={11} /> Gift Cards
          </Link>

          {/* Buy Again */}
          <button onClick={handleBuyAgain}
            className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">
            {t("Buy Again", "Buy Again")}
          </button>

          <Link href="/search?q=gifts" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Gift Ideas</Link>
          <Link href="/search?q=basics" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">AmazonBasics</Link>
          <Link href="/electronics" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Electronics</Link>
          <Link href="/fashion" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Fashion</Link>
          <Link href="/home-kitchen" className="nav-link whitespace-nowrap shrink-0 px-2 text-[13px]">Home</Link>

          <div className="ml-auto hidden xl:flex items-center gap-2 shrink-0 font-bold text-[#febd69] text-[13px]">
            <FaBolt size={12} />
            <span>prime day</span>
            <span className="text-white text-[11px] font-normal">| 4–6 July</span>
            <FaBolt size={12} />
          </div>
        </div>

        {/* All menu overlay */}
        {allMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setAllMenuOpen(false)}>
            <div className="absolute top-[98px] left-0 w-72 bg-white text-[#0f1111] shadow-2xl h-[calc(100vh-98px)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {user && (
                <div className="bg-[#232f3e] text-white px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ff9900] flex items-center justify-center text-sm font-bold">
                    {(user.full_name || "U")[0]}
                  </div>
                  <span className="text-sm font-bold">Hello, {user.full_name?.split(" ")[0] || "there"}</span>
                </div>
              )}
              {[
                { section: "Trending", links: [{ l: "Best Sellers", h: "/search?q=best+sellers" }, { l: "New Releases", h: "/search?q=new" }, { l: "Movers & Shakers", h: "/search?q=trending" }] },
                { section: "Digital Content", links: [{ l: "Amazon Prime", h: "#" }, { l: "Amazon Music", h: "/search?q=music" }, { l: "Kindle Store", h: "/search?q=kindle" }] },
                { section: "Shop by Category", links: [{ l: "Electronics", h: "/electronics" }, { l: "Fashion", h: "/fashion" }, { l: "Home & Kitchen", h: "/home-kitchen" }, { l: "Books", h: "/search?q=books" }, { l: "Sports & Outdoors", h: "/search?q=sports" }] },
                { section: "Programs & Features", links: [{ l: "Amazon Pay", h: "#" }, { l: "Gift Cards", h: "#" }, { l: "Amazon Business", h: "#" }, { l: "AI Assistant (Rufus)", h: "/ai-assistant" }] },
              ].map(({ section, links }) => (
                <div key={section} className="border-b border-[#eee] py-3 px-4">
                  <p className="text-sm font-bold text-[#0f1111] mb-2">{section}</p>
                  {links.map(({ l, h }) => (
                    <Link key={l} href={h} onClick={() => setAllMenuOpen(false)}
                      className="block text-sm text-[#0f1111] hover:text-[#c45500] py-1 hover:bg-[#f7f7f7] px-2 -mx-2 rounded">
                      {l}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Keep Shopping For drawer ── */}
      {keepShoppingOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setKeepShoppingOpen(false)} />
          <div className="relative ml-0 w-80 sm:w-96 bg-white h-full shadow-2xl flex flex-col animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between bg-[#232f3e] text-white px-4 py-3">
              <h2 className="font-bold text-base">Keep Shopping For</h2>
              <button onClick={() => setKeepShoppingOpen(false)} className="hover:text-[#ff9900]"><FaTimes size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-[#565959] mb-3">Trending products based on your interests</p>
              {TRENDING.map((item) => (
                <div key={item.id} className="flex gap-3 border border-[#ddd] rounded p-3 hover:shadow-sm transition-shadow group">
                  <div className="w-16 h-16 bg-[#f7f7f7] rounded flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#0f1111] line-clamp-2 mb-1">{item.name}</p>
                    <p className="text-sm font-bold text-[#0f1111]">₹{Number(item.price).toLocaleString("en-IN")}</p>
                    <button
                      onClick={() => { addItem({ id: item.id, name: item.name, price: item.price, image: item.image }); toast.success("Added to cart"); }}
                      className="mt-1 amazon-btn text-[10px] px-2 py-1 w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#ddd]">
              <Link href="/search?q=trending" onClick={() => setKeepShoppingOpen(false)}
                className="block w-full text-center amazon-btn py-2 text-sm">
                See all trending products
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Buy Again drawer ── */}
      {buyAgainOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setBuyAgainOpen(false)} />
          <div className="relative ml-0 w-80 sm:w-96 bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between bg-[#232f3e] text-white px-4 py-3">
              <h2 className="font-bold text-base flex items-center gap-2"><FaShoppingBag size={15} /> Buy Again</h2>
              <button onClick={() => setBuyAgainOpen(false)} className="hover:text-[#ff9900]"><FaTimes size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-[#565959] mb-3">
                {isLoggedIn() ? "Items from your previous orders" : "Sign in to see your order history"}
              </p>
              {!isLoggedIn() && (
                <Link href="/login" onClick={() => setBuyAgainOpen(false)}
                  className="block w-full text-center amazon-btn py-2 text-sm mb-3">
                  Sign In to See Orders
                </Link>
              )}
              {buyAgainItems.map((item, idx) => (
                <div key={item.id || idx} className="flex gap-3 border border-[#ddd] rounded p-3 hover:shadow-sm group">
                  <div className="w-16 h-16 bg-[#f7f7f7] rounded flex items-center justify-center shrink-0">
                    {item.image ? <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" /> : <FaShoppingBag size={24} className="text-[#ddd]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#0f1111] line-clamp-2 mb-1">{item.name}</p>
                    {item.price && <p className="text-sm font-bold text-[#0f1111]">₹{Number(item.price).toLocaleString("en-IN")}</p>}
                    <button
                      onClick={() => { addItem({ id: item.id, name: item.name, price: item.price, image: item.image }); toast.success("Added to cart"); }}
                      className="mt-1 amazon-btn text-[10px] px-2 py-1 w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#ddd]">
              <Link href="/orders" onClick={() => setBuyAgainOpen(false)}
                className="block w-full text-center amazon-btn py-2 text-sm">
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
