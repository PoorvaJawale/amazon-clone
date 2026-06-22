"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/product/ProductCard";
import { getProducts } from "../../services/products";
import { FaFilter, FaStar } from "react-icons/fa";

const MOCK_PRODUCTS = [
  { id: "m1", name: "boAt Airdopes 141 Bluetooth Earbuds", brand: "boAt", price: 2990, discount_price: 1299, rating: 4, reviews_count: 85432, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=60" },
  { id: "m2", name: "Noise ColorFit Pulse AMOLED Smartwatch", brand: "Noise", price: 4999, discount_price: 1899, rating: 4, reviews_count: 65210, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=60" },
  { id: "m3", name: "Samsung Galaxy M34 5G (6/128GB)", brand: "Samsung", price: 18999, discount_price: 15999, rating: 4, reviews_count: 23456, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=60" },
  { id: "m4", name: "Prestige Svachh 5L Pressure Cooker", brand: "Prestige", price: 2595, discount_price: 1799, rating: 4, reviews_count: 12300, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=60" },
  { id: "m5", name: "Philips Air Fryer HD9252/90", brand: "Philips", price: 12995, discount_price: 7999, rating: 5, reviews_count: 31200, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=60" },
  { id: "m6", name: "Wildcraft Ultra-light 45L Backpack", brand: "Wildcraft", price: 3499, discount_price: 2199, rating: 4, reviews_count: 8750, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=60" },
  { id: "m7", name: "Fossil Gen 6 Smartwatch 44mm", brand: "Fossil", price: 24995, discount_price: 16995, rating: 4, reviews_count: 5420, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=60" },
  { id: "m8", name: "Milton Thermosteel Flask 1000ml", brand: "Milton", price: 1299, discount_price: 799, rating: 5, reviews_count: 45600, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&q=60" },
  { id: "m9", name: "Lavie Handbag for Women - Tan", brand: "Lavie", price: 3495, discount_price: 1749, rating: 4, reviews_count: 7890, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=60" },
  { id: "m10", name: "Sony WH-1000XM5 Wireless Headphones", brand: "Sony", price: 29990, discount_price: 19990, rating: 5, reviews_count: 14300, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=60" },
  { id: "m11", name: "Cello Opalware Dinner Set 35pcs", brand: "Cello", price: 4499, discount_price: 2799, rating: 4, reviews_count: 9870, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&q=60" },
  { id: "m12", name: "Zebronics ZEB-COLT Wireless Mouse", brand: "Zebronics", price: 999, discount_price: 549, rating: 4, reviews_count: 23100, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=60" },
];

const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Avg. Customer Review", "Newest Arrivals"];
const PRICE_FILTERS = ["Under ₹500", "₹500–₹1,000", "₹1,000–₹5,000", "₹5,000–₹15,000", "Above ₹15,000"];

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("Relevance");
  const [priceFilter, setPriceFilter] = useState(null);
  const [starFilter, setStarFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          const filtered = q ? data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : data;
          setProducts(filtered.length > 0 ? filtered : MOCK_PRODUCTS);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      })
      .catch(() => setProducts(MOCK_PRODUCTS))
      .finally(() => setLoading(false));
  }, [q]);

  let displayed = [...products];
  if (q) displayed = displayed.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || (p.brand || "").toLowerCase().includes(q.toLowerCase()));
  if (starFilter) displayed = displayed.filter((p) => (p.rating || 4) >= starFilter);
  if (sort === "Price: Low to High") displayed.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
  if (sort === "Price: High to Low") displayed.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
  if (sort === "Avg. Customer Review") displayed.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (displayed.length === 0) displayed = MOCK_PRODUCTS;

  return (
    <div className="flex gap-4">
      {/* Sidebar filters */}
      <div className="w-56 shrink-0 hidden md:block">
        <div className="bg-white shadow-sm p-4 mb-3">
          <h2 className="font-bold text-[#0f1111] text-sm mb-3 flex items-center gap-1"><FaFilter size={11} /> Filters</h2>
          <div className="mb-4">
            <p className="text-xs font-bold text-[#0f1111] mb-2 uppercase tracking-wide">Avg. Customer Review</p>
            {[4, 3, 2].map((s) => (
              <button key={s} onClick={() => setStarFilter(starFilter === s ? null : s)}
                className={`flex items-center gap-1.5 text-xs mb-1.5 w-full text-left px-1 py-0.5 rounded ${starFilter === s ? "bg-[#febd69]/30" : "hover:bg-[#f7f7f7]"}`}>
                <div className="flex gap-0.5 text-[#f0a500]">
                  {[1,2,3,4,5].map((i) => <FaStar key={i} size={10} className={i <= s ? "" : "text-[#ddd]"} />)}
                </div>
                <span className="text-[#0066c0]">&amp; Up</span>
              </button>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-xs font-bold text-[#0f1111] mb-2 uppercase tracking-wide">Price</p>
            {PRICE_FILTERS.map((pf) => (
              <button key={pf} onClick={() => setPriceFilter(priceFilter === pf ? null : pf)}
                className={`block text-xs mb-1 text-left w-full px-1 py-0.5 rounded ${priceFilter === pf ? "text-[#c45500] font-bold bg-[#fff8f0]" : "text-[#0066c0] hover:text-[#c45500] hover:bg-[#f7f7f7]"}`}>
                {pf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        <div className="bg-white shadow-sm p-3 mb-3 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-[#565959]">
            {q ? <><span className="font-bold text-[#0f1111]">1–{displayed.length}</span> results for <span className="text-[#c45500]">"{q}"</span></> : `${displayed.length} results`}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#565959]">Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="border border-[#d5d9d9] rounded px-2 py-1 text-xs bg-[#f0f2f2] focus:outline-none">
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-12 text-center text-[#565959]">Searching...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayed.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 py-4">
        <Suspense fallback={<div className="text-center py-8 text-[#565959]">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
