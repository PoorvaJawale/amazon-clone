"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroBanner from "../components/home/HeroBanner";
import DealCard from "../components/home/DealCard";
import Carousel from "../components/home/Carousel";
import { getProducts } from "../services/products";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { getRecentSearches, getRecentlyViewed } from "../store/searchHistory";
import { getLocalWishlistItems } from "../store/wishlistCache";
import { FaClock } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

/* ── fallback static data (shown only when no personalised data exists) ── */
const FALLBACK_PICKUP = [
  { id: "t1", name: "VENDERE Premium Insulated Tumbler 500ml", price: 899, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&q=60" },
  { id: "t2", name: "enem Thermal Cup Butter Gold 400ml",      price: 1099, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=60" },
  { id: "t3", name: "RIZIK STORE Sports Leakproof Flask",      price: 749,  image: "https://images.unsplash.com/photo-1589302168068-9646c49d4501?w=300&q=60" },
  { id: "t4", name: "VYATIRANG Vacuum Travel Mug 600ml",       price: 999,  image: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=300&q=60" },
];
const FALLBACK_CONTINUE = [
  { id: "k1", name: "Men's Designer Royal Sherwani Set",    price: 2499, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=60" },
  { id: "k2", name: "Traditional Silk Blend Kurta Pajama", price: 1899, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=60" },
  { id: "k3", name: "Velvet Non-Slip Hangers 50 Pack",     price: 1199, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=60" },
  { id: "k4", name: "Premium Bamboo Drawer Dividers",      price: 799,  image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&q=60" },
];
const HOME_CATS = [
  { id: "h1", name: "Bedding & Sheets",      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&q=60" },
  { id: "h2", name: "Lighting & Lamps",      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=60" },
  { id: "h3", name: "Home Decor",            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&q=60" },
  { id: "h4", name: "Storage & Organizers",  image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&q=60" },
];
const DEALS_TODAY = [
  { id: "d1", name: "Prestige Cookware Sets",      discount: "35%", price: "₹1,299", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150" },
  { id: "d2", name: "Philips Air Fryers",          discount: "45%", price: "₹6,499", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150" },
  { id: "d3", name: "Glass Insulated Tumblers",    discount: "60%", price: "₹399",   img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=150" },
];
const BEST_SELLERS = [
  { id: "bs1", name: "Noise ColorFit Pulse AMOLED Smartwatch", price: 1899, discount_price: 1899, badge: "62% off", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=60", rating: 5 },
  { id: "bs2", name: "boAt Wave Call Bluetooth Headset",       price: 1499, discount_price: 1499, badge: "50% off", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=60", rating: 4 },
  { id: "bs3", name: "JBL Go 3 Wireless Portable Speaker",    price: 2999, discount_price: 2999, badge: "25% off", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=60", rating: 5 },
  { id: "bs4", name: "Sony WH-1000XM4 Noise Cancelling",      price: 24990, discount_price: 19990, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=60", rating: 5 },
  { id: "bs5", name: "Samsung 43-inch 4K Smart TV",           price: 34990, discount_price: 27990, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=60", rating: 4 },
  { id: "bs6", name: "Apple AirPods 3rd Generation",          price: 19900, discount_price: 15900, image: "https://images.unsplash.com/photo-1588423771073-b8903fead714?w=300&q=60", rating: 5 },
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
  // AI picks from OpenAI — drives all three personalised sections
  const [aiPicks, setAiPicks]           = useState([]);
  const [aiCarouselTitle, setAiCarouselTitle] = useState("Recommended for You");
  const [aiLoading, setAiLoading]       = useState(false);

  // Personalisation state — read from localStorage instantly
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishlistItems, setWishlistItems]   = useState([]);

  useEffect(() => {
    // 1. Read localStorage synchronously — no flicker on cards
    const searches   = getRecentSearches();
    const viewed     = getRecentlyViewed();
    const wishlisted = getLocalWishlistItems();

    setRecentSearches(searches);
    setRecentlyViewed(viewed.slice(0, 4));
    setWishlistItems(wishlisted.slice(0, 4));

    // 2. Call OpenAI via /api/recommend with full user context
    setAiLoading(true);
    fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searches,
        recentlyViewed: viewed.slice(0, 4),
        wishlistItems: wishlisted.slice(0, 4),
      }),
    })
      .then((r) => r.json())
      .then(({ picks, title }) => {
        if (picks && picks.length) {
          setAiPicks(picks);
          setAiCarouselTitle(title || "AI Picks for You");
        }
      })
      .catch(() => {})
      .finally(() => setAiLoading(false));

    // 3. Also fetch API products for any fallback sections
    getProducts().then(setApiProducts).catch(() => {});
  }, []);

  // ── Derive section content ──────────────────────────────────────────────────

  // "Pick up where you left off" — recently viewed products, fall back to static
  const pickUpItems = recentlyViewed.length > 0 ? recentlyViewed : FALLBACK_PICKUP;
  const pickUpTitle = recentlyViewed.length > 0 ? "Pick up where you left off" : "Pick up where you left off";
  const pickUpHref  = recentlyViewed.length > 0
    ? `/search?q=${encodeURIComponent(recentlyViewed[0]?.name?.split(" ").slice(0, 2).join(" ") || "")}`
    : "/search?q=tumblers+flasks";

  // "Continue shopping" — wishlisted products, fall back to static
  const continueItems = wishlistItems.length > 0
    ? wishlistItems.map((w) => ({ id: w.product_id, name: w.name, price: w.price, image: w.image }))
    : FALLBACK_CONTINUE;
  const continueTitle = wishlistItems.length > 0 ? "Continue shopping your saves" : "Continue shopping deals";
  const continueHref  = wishlistItems.length > 0 ? "/wishlist" : "/fashion";

  // "Top Picks For You" DealCard — first 4 AI picks, fall back to API/mock
  const topPicksPool  = aiPicks.length > 0 ? aiPicks : (apiProducts.length > 0 ? apiProducts : MOCK_PRODUCTS);
  const topPicksItems = topPicksPool.slice(0, 4).map((p) => ({
    id: p.id, name: p.name, price: p.discount_price || p.price, image: p.image,
  }));
  const topPicksTitle = aiPicks.length > 0 && recentSearches.length > 0
    ? `Top picks for "${recentSearches[0]}"`
    : "Top Picks For You";

  // "More picks based on ___" carousel — next 12 AI picks (offset to avoid card dups)
  const mainCarouselItems = aiPicks.length > 0 ? aiPicks.slice(4) : BEST_SELLERS;
  const mainCarouselTitle = aiCarouselTitle;

  // "Recommended for You" carousel — full AI list in reverse diversity order
  const recoCarouselItems = aiPicks.length > 0 ? [...aiPicks].reverse() : apiProducts.slice(0, 12);
  const recoCarouselTitle = aiPicks.length > 0
    ? `Recommended for you${recentSearches.length > 0 ? ` · "${recentSearches.slice(0, 2).join('" & "')}"` : ""}`
    : "Recommended for You";

  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />

        <div className="max-w-[1500px] mx-auto px-3 -mt-10 relative z-10 space-y-3 pb-6">

          {/* ── Row 1: 4 personalised deal cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Card 1: Pick up where you left off (recently viewed) */}
            <DealCard
              title={pickUpTitle}
              subtitle={recentlyViewed.length > 0 ? "Recently viewed by you" : null}
              items={pickUpItems}
              seeMoreLabel={recentlyViewed.length > 0 ? "See all viewed" : "See more"}
              seeMoreHref={pickUpHref}
              aiTag={recentlyViewed.length > 0}
            />

            {/* Card 2: Continue shopping (from wishlist) */}
            <DealCard
              title={continueTitle}
              subtitle={wishlistItems.length > 0 ? "From your Wish List" : null}
              items={continueItems}
              seeMoreLabel={wishlistItems.length > 0 ? "View Wish List" : "See all deals"}
              seeMoreHref={continueHref}
              aiTag={wishlistItems.length > 0}
            />

            {/* Card 3: Top Picks / AI search matches */}
            <DealCard
              title={topPicksTitle}
              subtitle={aiPicks.length > 0 ? "AI-curated for your searches" : null}
              items={topPicksItems}
              seeMoreLabel="See all products"
              seeMoreHref={recentSearches.length > 0 ? `/search?q=${encodeURIComponent(recentSearches[0])}` : "/search?q=popular"}
              aiTag={aiPicks.length > 0}
            />

            {/* Card 4: Deals of the day (always static with countdown) */}
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
                      className="text-[#0066c0] hover:text-[#c45500] shrink-0 font-bold">+</button>
                  </div>
                ))}
              </div>
              <Link href="/search?q=deals" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block">See all deals</Link>
            </div>
          </div>

          {/* ── Row 2: 4 cards ── */}
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
                  { l: "Headphones",  href: "/search?q=headphones",  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150" },
                  { l: "BT Speakers", href: "/search?q=speaker",     img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150" },
                  { l: "Smartwatches",href: "/search?q=smartwatch",  img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150" },
                  { l: "Keyboards",   href: "/search?q=keyboard",    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150" },
                ].map(({ l, href, img }) => (
                  <Link key={l} href={href} className="group cursor-pointer">
                    <div className="h-20 bg-[#f7f7f7] rounded overflow-hidden flex items-center justify-center">
                      <img src={img} alt={l} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[10px] font-semibold text-[#0f1111] text-center mt-1">{l}</p>
                  </Link>
                ))}
              </div>
              <Link href="/electronics" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline mt-3 block">See all best sellers</Link>
            </div>

            {/* AI: second pick-up row — more recently viewed or search matches */}
            <DealCard
              title={aiPicks.length > 0 ? "More AI picks for you" : "Trending near you"}
              subtitle={aiPicks.length > 0 ? "Curated by AI based on your activity" : null}
              items={(aiPicks.length > 0 ? aiPicks.slice(8, 12) : MOCK_PRODUCTS.slice(8, 12)).map((p) => ({
                id: p.id, name: p.name, price: p.discount_price || p.price, image: p.image,
              }))}
              seeMoreLabel="See all"
              seeMoreHref={recentSearches.length > 0 ? `/search?q=${encodeURIComponent(recentSearches[0])}` : "/search?q=trending"}
              aiTag={aiPicks.length > 0}
            />
          </div>

          {/* ── AI carousel: "More picks based on ___" ── */}
          {aiLoading ? (
            <div className="bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
                <span className="text-[15px] font-bold text-[#0f1111] opacity-60">AI is personalising your picks…</span>
              </div>
              <div className="flex gap-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="w-44 shrink-0 h-56 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <Carousel title={mainCarouselTitle} items={mainCarouselItems.length > 0 ? mainCarouselItems : BEST_SELLERS} showBadge />
          )}

          {/* ── Recommended for You (second AI carousel) ── */}
          {!aiLoading && recoCarouselItems.length > 0 && (
            <Carousel title={recoCarouselTitle} items={recoCarouselItems} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
