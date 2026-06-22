"use client";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/product/ProductCard";
import Link from "next/link";

const SUBCATS = ["All Fashion", "Men's Clothing", "Women's Clothing", "Kids", "Footwear", "Watches", "Sunglasses", "Bags & Luggage"];

const PRODUCTS = [
  { id: "f1", name: "Levi's Men's Slim Fit Jeans - Dark Blue", brand: "Levi's", price: 3499, discount_price: 1999, rating: 4, reviews_count: 23400, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=60" },
  { id: "f2", name: "Allen Solly Formal Shirt for Men - White", brand: "Allen Solly", price: 1799, discount_price: 899, rating: 4, reviews_count: 15670, image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&q=60" },
  { id: "f3", name: "Libas Women's Ethnic Kurta Set - Red", brand: "Libas", price: 2499, discount_price: 1249, rating: 4, reviews_count: 34500, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=60" },
  { id: "f4", name: "Nike Air Max 270 React Sneakers", brand: "Nike", price: 12995, discount_price: 8995, rating: 5, reviews_count: 8920, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=60" },
  { id: "f5", name: "Lavie Women's Tote Bag - Tan", brand: "Lavie", price: 3495, discount_price: 1749, rating: 4, reviews_count: 7890, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=60" },
  { id: "f6", name: "Fastrack Analog Unisex Watch NS3266NL01", brand: "Fastrack", price: 2995, discount_price: 2096, rating: 4, reviews_count: 12300, image: "https://images.unsplash.com/photo-1523170335258-f87a2f6a9026?w=300&q=60" },
  { id: "f7", name: "Puma Men's Running Shoes - Black", brand: "Puma", price: 4999, discount_price: 2999, rating: 4, reviews_count: 18700, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=60" },
  { id: "f8", name: "W Women's A-Line Midi Dress - Blue", brand: "W", price: 1999, discount_price: 999, rating: 4, reviews_count: 9870, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=60" },
  { id: "f9", name: "Peter England Slim Fit Chinos - Khaki", brand: "Peter England", price: 2299, discount_price: 1149, rating: 4, reviews_count: 11200, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=60" },
  { id: "f10", name: "Ray-Ban Round Classic Unisex Sunglasses", brand: "Ray-Ban", price: 8490, discount_price: 5990, rating: 5, reviews_count: 6540, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=60" },
  { id: "f11", name: "Wildcraft 45L Laptop Backpack - Grey", brand: "Wildcraft", price: 3499, discount_price: 2199, rating: 4, reviews_count: 8750, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=60" },
  { id: "f12", name: "Van Heusen Men's Regular Fit T-Shirt", brand: "Van Heusen", price: 999, discount_price: 499, rating: 4, reviews_count: 45600, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=60" },
];

export default function FashionPage() {
  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#8B0000] to-[#C41E3A] text-white px-8 py-10">
          <div className="max-w-[1500px] mx-auto">
            <p className="text-[#ffcccc] text-xs font-bold uppercase tracking-widest mb-1">Amazon Fashion</p>
            <h1 className="text-4xl font-extrabold mb-2">Fashion</h1>
            <p className="text-[#ffcccc] text-sm">Up to 80% off · Top brands · Free delivery on ₹499+</p>
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
            <h2 className="text-xl font-bold text-[#0f1111]">Trending in Fashion</h2>
            <Link href="/search?q=fashion" className="text-sm text-[#0066c0] hover:text-[#c45500] hover:underline">See all</Link>
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
