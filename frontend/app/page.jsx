"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroBanner from "../components/home/HeroBanner";
import DealCard from "../components/home/DealCard";
import Carousel from "../components/home/Carousel";
import { getProducts } from "../services/products";
import { getRecommendations } from "../services/recommendations";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { getRecentSearches, filterByRecentSearches } from "../store/searchHistory";
import { FaClock, FaSearch } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

/* ── static mock data ── */
const PICK_UP = [
  { id: "t1", name: "VENDERE Premium Insulated Tumbler 500ml", price: 899, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&auto=format&fit=crop&q=60" },
  { id: "t2", name: "enem Thermal Cup Butter Gold 400ml", price: 1099, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=60" },
  { id: "t3", name: "RIZIK STORE Sports Leakproof Flask", price: 749, image: "https://images.unsplash.com/photo-1589302168068-9646c49d4501?w=300&auto=format&fit=crop&q=60" },
  { id: "t4", name: "VYATIRANG Vacuum Travel Mug 600ml", price: 999, image: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=300&auto=format&fit=crop&q=60" },
];
const STRAWS = [
  { id: "s1", name: "ANTIL'S Reusable Metal Straws Pack of 8", price: 349, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&auto=format&fit=crop&q=60" },
  { id: "s2", name: "House of Quirk Borosilicate Glass Straws", price: 449, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=60" },
  { id: "s3", name: "YAJNAS Colorful Heat-Resistant Straws", price: 399, image: "https://images.unsplash.com/photo-1592892111425-15e04305f961?w=300&auto=format&fit=crop&q=60" },
  { id: "s4", name: "Reusable Glass Straws with Flex Cleaners", price: 299, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60" },
];
const HOME_CATS = [
  { id: "h1", name: "Bedding & Sheets", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&auto=format&fit=crop&q=60" },
  { id: "h2", name: "Lighting & Lamps", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop&q=60" },
  { id: "h3", name: "Home Decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=60" },
  { id: "h4", name: "Storage & Organizers", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&auto=format&fit=crop&q=60" },
];
const DEALS_TODAY = [
  { id: "d1", name: "Prestige Cookware Sets", discount: "35%", price: "₹1,299", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150" },
  { id: "d2", name: "Philips Air Fryers", discount: "45%", price: "₹6,499", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150" },
  { id: "d3", name: "Glass Insulated Tumblers", discount: "60%", price: "₹399", img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=150" },
];
const BEST_SELLERS = [
  { id: "bs1", name: "Noise ColorFit Pulse AMOLED Smartwatch", price: 1899, discount_price: 1899, price_old: 4999, badge: "62% off", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&auto=format&fit=crop&q=60", rating: 5 },
  { id: "bs2", name: "boAt Wave Call Bluetooth Headset", price: 1499, discount_price: 1499, price_old: 2999, badge: "50% off", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=60", rating: 4 },
  { id: "bs3", name: "JBL Go 3 Wireless Portable Speaker", price: 2999, discount_price: 2999, price_old: 3999, badge: "25% off", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&auto=format&fit=crop&q=60", rating: 5 },
  { id: "bs4", name: "Sony WH-1000XM4 Noise Cancelling", price: 24990, discount_price: 19990, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&auto=format&fit=crop&q=60", rating: 5 },
  { id: "bs5", name: "Samsung 43-inch 4K Smart TV", price: 34990, discount_price: 27990, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=60", rating: 4 },
  { id: "bs6", name: "Apple AirPods 3rd Generation", price: 19900, discount_price: 15900, image: "https://images.unsplash.com/photo-1588423771073-b8903fead714?w=300&auto=format&fit=crop&q=60", rating: 5 },
];

function useCountdown() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setT(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Home() {
  const countdown = useCountdown();
  const { addItem } = useCartStore();
  const [apiProducts, setApiProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchMatches, setSearchMatches] = useState([]);

  useEffect(() => {
    getProducts().then(setApiProducts).catch(() => {});

    // Read search history and build personalised product matches
    const searches = getRecentSearches();
    setRecentSearches(searches);

    if (searches.length > 0) {
      // Pass search context to recommendations API for AI-driven results
      getRecommendations({ query: searches[0] })
        .then((data) => {
          setRecommendations(data && data.length > 0 ? data : []);
        })
        .catch(() => {});

      // Also filter mock products locally for instant results
      const matched = filterByRecentSearches(MOCK_PRODUCTS, searches);
      setSearchMatches(matched.slice(0, 12));
    } else {
      getRecommendations().then(setRecommendations).catch(() => {});
    }
  }, []);

  const allCarouselItems = recommendations.length ? recommendations : BEST_SELLERS;

  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />

        {/* ── 4-column deal card grid ── */}
        {/* ── AI-personalised section: shows when user has searched ── */}
        {searchMatches.length > 0 && (
          <div className="max-w-[1500px] mx-auto px-3 pt-3 relative z-10">
            <div className="bg-white shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HiSparkles className="text-[#ff9900]" size={18} />
                  <div>
                    <h2 className="text-[18px] font-bold text-[#0f1111] leading-tight">
                      Based on your recent{" "}
                      {recentSearches.slice(0, 2).map((s, i) => (
                        <span key={s}>
                          {i > 0 && " & "}
                          <Link href={`/search?q=${encodeURIComponent(s)}`}
                            className="text-[#c45500] hover:underline capitalize">
                            {s}
                          </Link>
                        </span>
                      ))}
                      {" "}searches
                    </h2>
                    <p className="text-xs text-[#565959]">AI-curated picks just for you</p>
                  </div>
                </div>
                <Link href={`/search?q=${encodeURIComponent(recentSearches[0] || "")}`}
                  className="text-xs text-[#0066c0] hover:text-[#c45500] hover:underline shrink-0">
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {searchMatches.map((p) => {
                  const fp = p.discount_price || p.price;
                  const disc = p.discount_price && p.discount_price < p.price
                    ? Math.round(((p.price - p.discount_price) / p.price) * 100) : 0;
                  return (
                    <Link key={p.id} href={`/product/${p.id}`} className="group flex flex-col">
                      <div className="relative h-28 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center mb-1.5 border border-transparent group-hover:border-[#e77600] transition-colors">
                        {p.image
                          ? <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform" />
                          : <div className="w-full h-full bg-gray-200" />}
                        {disc > 0 && (
                          <span className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[8px] font-bold px-1 py-0.5 rounded">-{disc}%</span>
                        )}
                      </div>
                      <p className="text-xs text-[#0f1111] group-hover:text-[#c45500] line-clamp-2 leading-snug mb-0.5">{p.name}</p>
                      <p className="text-sm font-bold text-[#0f1111]">₹{Number(fp).toLocaleString("en-IN")}</p>
                      <button
                        onClick={(e) => { e.preventDefault(); addItem({ id: p.id, name: p.name, price: fp, image: p.image }); }}
                        className="mt-1 amazon-btn text-[9px] py-0.5 w-full">
                        Add to Cart
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1500px] mx-auto px-3 -mt-10 relative z-10 space-y-3 pb-6">

          {/* Row 1: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Card 1 */}
            <DealCard
              title="Pick up where you left off"
              items={PICK_UP}
              seeMoreLabel="See more"
              seeMoreHref="/search?q=tumblers+flasks"
            />

            {/* Card 2 */}
            <DealCard
              title="Pick up where you left off"
              items={STRAWS}
              seeMoreLabel="See all"
              seeMoreHref="/search?q=reusable+straws"
            />

            {/* Card 3: Continue shopping */}
            <DealCard
              title="Continue shopping deals"
              items={[
                { id: "k1", name: "Men's Designer Royal Sherwani Set", price: 2499, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=60" },
                { id: "k2", name: "Traditional Silk Blend Kurta Pajama", price: 1899, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=60" },
                { id: "k3", name: "Velvet Non-Slip Hangers 50 Pack", price: 1199, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=60" },
                { id: "k4", name: "Premium Bamboo Drawer Dividers", price: 799, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&q=60" },
              ]}
              seeMoreLabel="See all deals"
              seeMoreHref="/fashion"
            />

            {/* Card 4: Deals of the day */}
            <div className="bg-white p-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[18px] font-bold text-[#0f1111]">Deals of the Day</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#c45500] bg-[#fff8f0] border border-[#f0c14b] px-2 py-0.5 rounded">
                  <FaClock size={10} className="animate-pulse" />
                  {countdown}
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {DEALS_TODAY.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 bg-[#fafafa] border border-gray-100 rounded p-2 hover:bg-[#f7f7f7] cursor-pointer group">
                    <img src={d.img} alt={d.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <span className="bg-[#c45500] text-white text-[8px] font-bold px-1 py-0.5 rounded mr-1">{d.discount} off</span>
                      <p className="text-[12px] font-semibold text-[#0f1111] truncate mt-0.5">{d.name}</p>
                      <p className="text-[10px] text-[#565959]">Starting {d.price}</p>
                    </div>
                    <button
                      onClick={() => addItem({ id: d.id, name: d.name, price: parseInt(d.price.replace(/\D/g, "")) })}
                      className="text-[#0066c0] hover:text-[#c45500] shrink-0"
                    >+</button>
                  </div>
                ))}
              </div>
              <Link href="#" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block">See all deals</Link>
            </div>
          </div>

          {/* Row 2: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Revamp your home */}
            <DealCard
              title="Revamp your home"
              items={HOME_CATS.map((c) => ({ ...c, price: null }))}
              seeMoreLabel="Explore more ideas"
              seeMoreHref="/home-kitchen"
            />

            {/* Amazon Business */}
            <div className="bg-white p-4 shadow-sm flex flex-col">
              <h3 className="text-[18px] font-bold text-[#0f1111] mb-3">Bulk discounts + 10% guaranteed cashback!</h3>
              <div className="flex gap-3 items-start mb-3">
                <p className="text-xs text-gray-600 flex-1">Save on corporate supplies, GST invoices, and unlock wholesale volume tiers.</p>
                <div className="bg-[#ff9900] text-white p-3 rounded flex flex-col items-center w-20 h-20 shrink-0 shadow">
                  <span className="text-[8px] uppercase tracking-wide font-semibold">amazon</span>
                  <span className="text-[13px] font-extrabold">business</span>
                  <span className="text-[7px] bg-white/20 px-1 rounded mt-0.5">*T&amp;C Apply</span>
                </div>
              </div>
              <button className="amazon-btn text-xs self-start">Register now</button>
              <div className="mt-auto pt-3 border-t border-gray-100">
                <p className="text-sm font-bold text-[#0f1111]">Starting at ₹399</p>
                <p className="text-xs text-[#565959]">Best deals on home utilities</p>
              </div>
            </div>

            {/* Best in Electronics */}
            <div className="bg-white p-4 shadow-sm flex flex-col">
              <h3 className="text-[18px] font-bold text-[#0f1111] mb-3">Best Sellers in Electronics</h3>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {[
                  { l: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150" },
                  { l: "BT Speakers", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150" },
                  { l: "Smartwatches", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150" },
                  { l: "Keyboards", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150" },
                ].map(({ l, img }) => (
                  <div key={l} className="group cursor-pointer">
                    <div className="h-20 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center">
                      <img src={img} alt={l} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[10px] font-semibold text-[#0f1111] text-center mt-1">{l}</p>
                  </div>
                ))}
              </div>
              <Link href="#" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block">See all best sellers</Link>
            </div>

            {/* API products if available */}
            <DealCard
              title="Top Picks For You"
              items={apiProducts.slice(0, 4).map((p) => ({
                id: p.id,
                name: p.name,
                price: p.discount_price || p.price,
                image: p.image,
              }))}
              seeMoreLabel="See all products"
              seeMoreHref="/products"
            />
          </div>

          {/* Best Sellers / AI Recommendations Carousel */}
          <Carousel
            title={
              recentSearches.length > 0
                ? `More picks based on "${recentSearches[0]}"`
                : "Best Sellers & More Picks for You"
            }
            items={allCarouselItems}
            showBadge
          />

          {/* More from API */}
          {apiProducts.length > 0 && (
            <Carousel
              title="Recommended for You"
              items={apiProducts.slice(0, 20).map((p) => ({
                ...p,
                image: p.image,
              }))}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
