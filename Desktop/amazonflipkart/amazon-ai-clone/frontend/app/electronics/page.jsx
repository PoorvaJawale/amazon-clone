"use client";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/product/ProductCard";
import Link from "next/link";

const SUBCATS = ["All Electronics", "Mobiles", "Laptops", "Headphones", "Smartwatches", "Cameras", "Tablets", "Televisions"];

const PRODUCTS = [
  { id: "e1", name: "Apple iPhone 15 (128GB) - Black", brand: "Apple", price: 79900, discount_price: 72990, rating: 5, reviews_count: 34210, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=60" },
  { id: "e2", name: "Samsung Galaxy S24 Ultra 5G (12GB/256GB)", brand: "Samsung", price: 134999, discount_price: 109999, rating: 5, reviews_count: 15430, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=60" },
  { id: "e3", name: "Sony WH-1000XM5 Wireless Headphones", brand: "Sony", price: 29990, discount_price: 19990, rating: 5, reviews_count: 14300, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=60" },
  { id: "e4", name: "Apple AirPods Pro (2nd Gen) with MagSafe", brand: "Apple", price: 24900, discount_price: 19900, rating: 5, reviews_count: 28700, image: "https://images.unsplash.com/photo-1588423771073-b8903fead714?w=300&q=60" },
  { id: "e5", name: "Samsung 55\" 4K QLED Smart TV QA55Q80C", brand: "Samsung", price: 84990, discount_price: 59990, rating: 4, reviews_count: 8920, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=60" },
  { id: "e6", name: "Noise ColorFit Ultra 3 Smartwatch 1.96\"", brand: "Noise", price: 7999, discount_price: 2499, rating: 4, reviews_count: 45670, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=60" },
  { id: "e7", name: "boAt Airdopes 161 - True Wireless Earbuds", brand: "boAt", price: 3990, discount_price: 1099, rating: 4, reviews_count: 125430, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=60" },
  { id: "e8", name: "Logitech MX Master 3S Wireless Mouse", brand: "Logitech", price: 10795, discount_price: 7795, rating: 5, reviews_count: 22100, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=60" },
  { id: "e9", name: "Dell 27\" FHD IPS Monitor S2722DC", brand: "Dell", price: 28990, discount_price: 22990, rating: 4, reviews_count: 7430, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=60" },
  { id: "e10", name: "JBL Flip 6 Portable Bluetooth Speaker", brand: "JBL", price: 11999, discount_price: 8499, rating: 5, reviews_count: 19800, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=60" },
  { id: "e11", name: "ASUS ROG Strix G15 Gaming Laptop RTX 4060", brand: "ASUS", price: 119990, discount_price: 89990, rating: 5, reviews_count: 4320, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=60" },
  { id: "e12", name: "Zebronics ZEB-PIXAPLAY 21 Wireless Speaker", brand: "Zebronics", price: 2499, discount_price: 1299, rating: 4, reviews_count: 34560, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=60" },
];

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0f1111] to-[#232f3e] text-white px-8 py-10">
          <div className="max-w-[1500px] mx-auto">
            <p className="text-[#ff9900] text-xs font-bold uppercase tracking-widest mb-1">Amazon Electronics Store</p>
            <h1 className="text-4xl font-extrabold mb-2">Electronics</h1>
            <p className="text-[#ccc] text-sm">Up to 60% off on top brands · Free delivery on eligible orders</p>
          </div>
        </div>

        {/* Subcategory tabs */}
        <div className="bg-white border-b border-[#ddd] px-4 overflow-x-auto scrollbar-hide">
          <div className="max-w-[1500px] mx-auto flex gap-1">
            {SUBCATS.map((s, i) => (
              <button key={s} className={`whitespace-nowrap px-4 py-3 text-sm border-b-2 transition-colors ${i === 0 ? "border-[#e77600] text-[#c45500] font-bold" : "border-transparent text-[#0f1111] hover:text-[#c45500] hover:border-[#e77600]"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0f1111]">Best Sellers in Electronics</h2>
            <Link href="/search?q=electronics" className="text-sm text-[#0066c0] hover:text-[#c45500] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
