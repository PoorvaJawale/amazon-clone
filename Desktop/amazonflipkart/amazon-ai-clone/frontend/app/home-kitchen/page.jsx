"use client";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/product/ProductCard";
import Link from "next/link";

const SUBCATS = ["All Home & Kitchen", "Kitchen Appliances", "Cookware", "Bedding", "Furniture", "Lighting", "Storage", "Decor"];

const PRODUCTS = [
  { id: "hk1", name: "Prestige Iris 750W Juicer Mixer Grinder", brand: "Prestige", price: 4595, discount_price: 2799, rating: 4, reviews_count: 34210, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=60" },
  { id: "hk2", name: "Philips HD9252/90 Air Fryer 4.1L", brand: "Philips", price: 12995, discount_price: 7999, rating: 5, reviews_count: 31200, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=60" },
  { id: "hk3", name: "Solimo Double Bed Sheet Set - King", brand: "Solimo", price: 1299, discount_price: 699, rating: 4, reviews_count: 45670, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=60" },
  { id: "hk4", name: "Pigeon Favourite 3L Pressure Cooker", brand: "Pigeon", price: 1895, discount_price: 899, rating: 4, reviews_count: 89300, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=60" },
  { id: "hk5", name: "Milton Thermosteel Flask 1000ml - Silver", brand: "Milton", price: 1299, discount_price: 799, rating: 5, reviews_count: 45600, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&q=60" },
  { id: "hk6", name: "IKEA KALLAX Shelf Unit 77x147cm - White", brand: "IKEA", price: 12990, discount_price: 10990, rating: 4, reviews_count: 6780, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&q=60" },
  { id: "hk7", name: "Wonderchef Granite Non-Stick Frying Pan 24cm", brand: "Wonderchef", price: 1799, discount_price: 1199, rating: 4, reviews_count: 23400, image: "https://images.unsplash.com/photo-1620756236308-65c3ef5d25f3?w=300&q=60" },
  { id: "hk8", name: "Syska SSK-LSP-7W Smart LED Bulb (Pack of 4)", brand: "Syska", price: 999, discount_price: 699, rating: 4, reviews_count: 56800, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=60" },
  { id: "hk9", name: "Cello Opalware Dinner Set 35pcs", brand: "Cello", price: 4499, discount_price: 2799, rating: 4, reviews_count: 9870, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&q=60" },
  { id: "hk10", name: "Amazon Basics Microfiber Cleaning Cloths 24pk", brand: "AmazonBasics", price: 799, discount_price: 499, rating: 4, reviews_count: 34500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=60" },
  { id: "hk11", name: "Bajaj Majesty ICX Pearl Induction Cooktop", brand: "Bajaj", price: 3195, discount_price: 1699, rating: 4, reviews_count: 15400, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&q=60" },
  { id: "hk12", name: "Godrej 311L 3-Star Double Door Refrigerator", brand: "Godrej", price: 32990, discount_price: 27990, rating: 4, reviews_count: 7800, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&q=60" },
];

export default function HomeKitchenPage() {
  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#1a5276] to-[#2980b9] text-white px-8 py-10">
          <div className="max-w-[1500px] mx-auto">
            <p className="text-[#aed6f1] text-xs font-bold uppercase tracking-widest mb-1">Amazon Home</p>
            <h1 className="text-4xl font-extrabold mb-2">Home & Kitchen</h1>
            <p className="text-[#aed6f1] text-sm">Transform your space · Deals up to 50% off · Free delivery</p>
          </div>
        </div>

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
            <h2 className="text-xl font-bold text-[#0f1111]">Best Sellers in Home & Kitchen</h2>
            <Link href="/search?q=home+kitchen" className="text-sm text-[#0066c0] hover:text-[#c45500] hover:underline">See all</Link>
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
