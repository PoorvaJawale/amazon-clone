"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getProduct } from "../../../services/products";
import { addToCart } from "../../../services/cart";
import { addToWishlist } from "../../../services/wishlist";
import { useCartStore } from "../../../store/cartStore";
import { isLoggedIn } from "../../../services/auth";
import { toast } from "sonner";
import { FaStar, FaHeart, FaShoppingCart, FaBolt, FaShieldAlt, FaTruck } from "react-icons/fa";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => toast.error("Product not found")).finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.discount_price || product.price, image: product.image });
    if (loggedIn) {
      try { await addToCart(product.id, qty); } catch { /* local store already updated */ }
    }
    toast.success("Added to cart");
  }

  async function handleWishlist() {
    if (!loggedIn) { toast.error("Please sign in first"); return; }
    try { await addToWishlist(product.id); toast.success("Added to Wish List"); } catch { toast.error("Could not add to Wish List"); }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[#565959] text-lg">Loading...</div>
      </div>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-[#565959] text-lg">Product not found.</p>
        <Link href="/" className="amazon-btn px-6 py-2 text-sm">Go Home</Link>
      </div>
      <Footer />
    </div>
  );

  const finalPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const pct = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white px-4 py-2 text-xs text-[#0066c0]">
          <Link href="/" className="hover:underline hover:text-[#c45500]">Home</Link>
          {" › "}
          {product.category && <><span className="hover:underline cursor-pointer hover:text-[#c45500]">{product.category}</span>{" › "}</>}
          <span className="text-[#565959]">{product.name}</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex gap-8 flex-col md:flex-row">

            {/* Image */}
            <div className="md:w-80 shrink-0">
              <div className="bg-white border border-[#d5d9d9] p-4 flex items-center justify-center" style={{ height: 320 }}>
                {product.image
                  ? <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                  : <div className="w-full h-full bg-gray-100" />}
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={handleWishlist} className="flex-1 border border-[#d5d9d9] rounded py-1.5 text-xs hover:bg-[#f7f8f8] flex items-center justify-center gap-1 text-[#0f1111]">
                  <FaHeart size={11} className="text-[#c45500]" /> Add to Wish List
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 bg-white border border-[#d5d9d9] p-5">
              {product.brand && <p className="text-xs text-[#0066c0] mb-1">Brand: <span className="hover:underline cursor-pointer">{product.brand}</span></p>}
              <h1 className="text-xl font-medium text-[#0f1111] mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#ddd]">
                <div className="flex gap-0.5 text-[#f0a500]">
                  {[1,2,3,4,5].map((s) => (
                    <FaStar key={s} size={14} className={s <= Math.round(product.rating || 4) ? "" : "text-[#ddd]"} />
                  ))}
                </div>
                <span className="text-[#0066c0] text-sm hover:underline cursor-pointer">{product.rating || "4.0"}</span>
                {product.reviews_count > 0 && <span className="text-[#0066c0] text-sm hover:underline cursor-pointer">{product.reviews_count} ratings</span>}
              </div>

              {/* Price */}
              <div className="mb-4">
                {hasDiscount && (
                  <p className="text-sm text-[#cc0c39] font-bold mb-1">-{pct}% Limited time deal</p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium text-[#0f1111]">
                    <span className="text-lg align-top text-sm mt-1">₹</span>{Number(finalPrice).toLocaleString("en-IN")}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-[#565959]">M.R.P.: <span className="line-through">₹{Number(product.price).toLocaleString("en-IN")}</span></span>
                  )}
                </div>
                <p className="text-xs text-[#565959] mt-0.5">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#0f1111] mb-1">About this item</h3>
                  <p className="text-sm text-[#0f1111] leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Delivery features */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-[#007600]">
                  <FaTruck size={14} /> <span className="font-bold">FREE Delivery</span> by Tomorrow
                </div>
                <div className="flex items-center gap-2 text-[#0f1111]">
                  <FaShieldAlt size={14} className="text-[#0066c0]" /> 1 Year Manufacturer Warranty
                </div>
              </div>
            </div>

            {/* Buy box */}
            <div className="md:w-52 shrink-0">
              <div className="border border-[#d5d9d9] rounded p-4 bg-white">
                <p className="text-2xl font-medium text-[#0f1111] mb-3">₹{Number(finalPrice).toLocaleString("en-IN")}</p>
                <p className="text-xs text-[#007600] font-bold mb-2">In Stock</p>
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <label className="text-[#0f1111]">Qty:</label>
                  <select value={qty} onChange={(e) => setQty(Number(e.target.value))}
                    className="border border-[#d5d9d9] rounded px-2 py-1 bg-[#f0f2f2]">
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <button onClick={handleAddToCart} className="w-full amazon-btn py-1.5 text-sm flex items-center justify-center gap-1.5 mb-2">
                  <FaShoppingCart size={13} /> Add to Cart
                </button>
                <button className="w-full bg-[#ff9900] hover:bg-[#fa8900] border border-[#e47911] text-[#0f1111] rounded-full py-1.5 text-sm flex items-center justify-center gap-1.5 font-medium">
                  <FaBolt size={13} /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
