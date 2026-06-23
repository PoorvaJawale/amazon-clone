"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/product/ProductCard";
import { getProducts } from "../../services/products";
import { MOCK_PRODUCTS } from "../../data/mockProducts";
import { FaFilter, FaStar, FaTimes } from "react-icons/fa";

const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Avg. Customer Review", "Newest Arrivals"];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Kitchen", "Home", "Sports", "Books", "Beauty"];

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [apiProducts, setApiProducts] = useState([]);
  const [sort, setSort] = useState("Relevance");
  const [priceRange, setPriceRange] = useState(null);
  const [starFilter, setStarFilter] = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => setApiProducts(data && data.length > 0 ? data : []))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Merge API products with mock products (API takes priority if non-empty)
  const basePool = apiProducts.length > 0
    ? [...apiProducts, ...MOCK_PRODUCTS.filter((m) => !apiProducts.some((a) => a.id === m.id))]
    : MOCK_PRODUCTS;

  // Drop any malformed entries missing a name
  let displayed = basePool.filter((p) => p && p.name);

  // Text search
  if (q) {
    const lq = q.toLowerCase();
    displayed = displayed.filter((p) =>
      p.name.toLowerCase().includes(lq) ||
      (p.brand || "").toLowerCase().includes(lq) ||
      (p.category || "").toLowerCase().includes(lq)
    );
    if (displayed.length === 0) displayed = [...basePool]; // fallback: show all
  }

  // Category filter
  if (catFilter && catFilter !== "All") {
    displayed = displayed.filter((p) => (p.category || "").toLowerCase().includes(catFilter.toLowerCase()));
  }

  // Rating filter
  if (starFilter) displayed = displayed.filter((p) => (p.rating || 4) >= starFilter);

  // Price range filter — actually applied to the displayed list
  if (priceRange) {
    displayed = displayed.filter((p) => {
      const price = p.discount_price || p.price || 0;
      return price >= priceRange.min && price < priceRange.max;
    });
  }

  // Sorting
  if (sort === "Price: Low to High") displayed.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
  else if (sort === "Price: High to Low") displayed.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
  else if (sort === "Avg. Customer Review") displayed.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // Always show something
  if (displayed.length === 0) displayed = basePool.slice(0, 20);

  const activeFilterCount = [priceRange, starFilter, catFilter !== "All" ? catFilter : null].filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <p className="text-xs font-bold text-[#0f1111] mb-2 uppercase tracking-wide">Category</p>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`block text-xs mb-1 text-left w-full px-1 py-0.5 rounded ${catFilter === c ? "text-[#c45500] font-bold" : "text-[#0066c0] hover:text-[#c45500]"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs font-bold text-[#0f1111] mb-2 uppercase tracking-wide">Avg. Customer Review</p>
        {[4, 3, 2].map((s) => (
          <button key={s} onClick={() => setStarFilter(starFilter === s ? null : s)}
            className={`flex items-center gap-1.5 text-xs mb-1.5 w-full text-left px-1 py-0.5 rounded ${starFilter === s ? "bg-[#febd69]/30 text-[#c45500]" : "hover:bg-[#f7f7f7]"}`}>
            <div className="flex gap-0.5 text-[#f0a500]">
              {[1,2,3,4,5].map((i) => <FaStar key={i} size={10} className={i <= s ? "" : "text-[#ddd]"} />)}
            </div>
            <span className="text-[#0066c0]">&amp; Up</span>
          </button>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-bold text-[#0f1111] mb-2 uppercase tracking-wide">Price</p>
        {PRICE_RANGES.map((pr) => (
          <button key={pr.label} onClick={() => setPriceRange(priceRange?.label === pr.label ? null : pr)}
            className={`block text-xs mb-1 text-left w-full px-1 py-0.5 rounded ${priceRange?.label === pr.label ? "text-[#c45500] font-bold bg-[#fff8f0]" : "text-[#0066c0] hover:text-[#c45500] hover:bg-[#f7f7f7]"}`}>
            {pr.label}
          </button>
        ))}
      </div>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => { setPriceRange(null); setStarFilter(null); setCatFilter("All"); }}
          className="text-xs text-[#c45500] hover:underline flex items-center gap-1"
        >
          <FaTimes size={10} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-4">
      {/* Desktop sidebar */}
      <div className="w-56 shrink-0 hidden md:block">
        <div className="bg-white shadow-sm p-4">
          <h2 className="font-bold text-[#0f1111] text-sm mb-3 flex items-center gap-1">
            <FaFilter size={11} /> Filters
            {activeFilterCount > 0 && <span className="ml-auto bg-[#c45500] text-white text-[9px] px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
          </h2>
          <FilterPanel />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        {/* Results bar */}
        <div className="bg-white shadow-sm p-3 mb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* Mobile filter toggle */}
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-1 text-xs border border-[#d5d9d9] rounded px-2 py-1.5 hover:bg-[#f7f7f7]">
              <FaFilter size={10} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <p className="text-sm text-[#565959]">
              {q
                ? <><span className="font-bold text-[#0f1111]">{displayed.length}</span> results for <span className="text-[#c45500]">"{q}"</span></>
                : <span>{displayed.length} products</span>}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#565959]">Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="border border-[#d5d9d9] rounded px-2 py-1 text-xs bg-white focus:outline-none">
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Mobile filter panel */}
        {filtersOpen && (
          <div className="md:hidden bg-white shadow-sm p-4 mb-3 rounded">
            <FilterPanel />
          </div>
        )}

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {priceRange && (
              <span className="bg-[#febd69]/30 text-[#c45500] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                {priceRange.label} <button onClick={() => setPriceRange(null)}><FaTimes size={9} /></button>
              </span>
            )}
            {starFilter && (
              <span className="bg-[#febd69]/30 text-[#c45500] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                {starFilter}★ & Up <button onClick={() => setStarFilter(null)}><FaTimes size={9} /></button>
              </span>
            )}
            {catFilter !== "All" && (
              <span className="bg-[#febd69]/30 text-[#c45500] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                {catFilter} <button onClick={() => setCatFilter("All")}><FaTimes size={9} /></button>
              </span>
            )}
          </div>
        )}

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
