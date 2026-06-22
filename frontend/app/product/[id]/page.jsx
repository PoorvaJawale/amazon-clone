"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getProduct } from "../../../services/products";
import { addToCart } from "../../../services/cart";
import { addToWishlist } from "../../../services/wishlist";
import { createOrder } from "../../../services/orders";
import { useCartStore } from "../../../store/cartStore";
import { isLoggedIn } from "../../../services/auth";
import { cacheWishlistProduct } from "../../../store/wishlistCache";
import { toast } from "sonner";
import { MOCK_PRODUCTS, getProductById } from "../../../data/mockProducts";
import {
  FaStar, FaHeart, FaShoppingCart, FaBolt, FaShieldAlt, FaTruck,
  FaCheckCircle, FaMapMarkerAlt, FaTimes, FaCreditCard, FaMobile, FaMoneyBillWave,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / Google Pay / PhonePe", icon: FaMobile },
  { id: "card", label: "Credit / Debit Card", icon: FaCreditCard },
  { id: "cod", label: "Cash on Delivery", icon: FaMoneyBillWave },
];

function generateRufusQuestions(productName) {
  const name = (productName || "").toLowerCase();
  if (name.includes("earbud") || name.includes("headphone") || name.includes("earphone")) {
    return ["Is noise cancellation effective?", "Battery life with ANC on?", "Does it work with iPhone?", "Is the fit comfortable for long use?"];
  }
  if (name.includes("watch") || name.includes("smartwatch")) {
    return ["Does it track sleep accurately?", "Is GPS built-in?", "Water resistant during swimming?", "Compatible with Android & iOS?"];
  }
  if (name.includes("phone") || name.includes("smartphone") || name.includes("5g")) {
    return ["How is low-light camera performance?", "Does it support 5G in India?", "How long does the battery last?", "Is it compatible with all SIM cards?"];
  }
  if (name.includes("laptop")) {
    return ["Is it good for video editing?", "How is the build quality?", "Battery backup on single charge?", "Can RAM be upgraded?"];
  }
  if (name.includes("cooker") || name.includes("fryer") || name.includes("mixer")) {
    return ["Is it easy to clean?", "How noisy is it during use?", "Can it handle large quantities?", "Safe for induction?"];
  }
  if (name.includes("backpack") || name.includes("bag")) {
    return ["Can a 15\" laptop fit inside?", "Is it waterproof?", "How comfortable are the straps?", "What is the total volume?"];
  }
  return ["What is the return policy?", "Is it available in other colours?", "When will it be delivered?", "Is assembly required?"];
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [rufusInput, setRufusInput] = useState("");
  const [rufusAnswer, setRufusAnswer] = useState(null);
  const [rufusLoading, setRufusLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [address, setAddress] = useState({ name: "", line1: "", city: "", pincode: "", phone: "" });
  const [payMethod, setPayMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const { addItem } = useCartStore();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    // Pre-fill address from localStorage
    const pin = typeof window !== "undefined" ? localStorage.getItem("pincode") || "" : "";
    const city = typeof window !== "undefined" ? localStorage.getItem("savedCity") || "" : "";
    const line = typeof window !== "undefined" ? localStorage.getItem("addressLine") || "" : "";
    setAddress((a) => ({ ...a, pincode: pin, city, line1: line }));

    // Try API first, then fall back to local data
    getProduct(id)
      .then((data) => {
        const local = getProductById(id);
        // Merge: local data enriches API data with gallery/features/colors if available
        setProduct(local ? { ...data, ...local, id: data.id || local.id } : data);
      })
      .catch(() => {
        const local = getProductById(id);
        if (local) setProduct(local);
        else toast.error("Product not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.discount_price || product.price, image: product.image || (product.images && product.images[0]) });
    if (loggedIn) {
      try { await addToCart(product.id, qty); } catch { /* local store already updated */ }
    }
    toast.success("Added to cart");
  }

  async function handleWishlist() {
    if (!loggedIn) { toast.error("Please sign in first"); return; }
    try {
      cacheWishlistProduct(product.id, {
        name: product.name, price: product.price,
        discount_price: product.discount_price,
        image: product.images?.[0] || product.image,
        brand: product.brand,
      });
      await addToWishlist(product.id);
      setWishlisted(true);
      toast.success("Added to Wish List");
    } catch { toast.error("Could not add to Wish List"); }
  }

  async function handleRufusQuestion(q) {
    const question = q || rufusInput.trim();
    if (!question) return;
    setRufusInput("");
    setRufusLoading(true);
    setRufusAnswer(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rufusQuery: question, productName: product.name, mode: "rufus" }),
      });
      if (res.ok) {
        const data = await res.json();
        setRufusAnswer(data.answer || `Based on customer reviews, ${product.name} is well-regarded for its quality and value for money.`);
      } else {
        setRufusAnswer(`Based on customer reviews, ${product.name} is highly rated for its performance and build quality. Most customers recommend it.`);
      }
    } catch {
      setRufusAnswer(`${product.name} is one of our best-selling products in this category with over ${(product.reviews_count || 1000).toLocaleString("en-IN")} verified ratings.`);
    } finally {
      setRufusLoading(false);
    }
  }

  async function handleBuyNow() {
    if (!loggedIn) { toast.error("Please sign in first"); return; }
    addItem({ id: product.id, name: product.name, price: product.discount_price || product.price, image: product.image || (product.images?.[0]) });
    setCheckoutStep("address");
  }

  async function confirmOrder() {
    setPlacing(true);
    try {
      await createOrder({});
      setCheckoutStep("success");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Order failed — please try again");
    } finally {
      setPlacing(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
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
  const images = product.images || (product.image ? [product.image] : []);
  const colors = product.colors || [];
  const features = product.features || (product.description ? product.description.split(". ").filter(Boolean) : []);
  const rufusQuestions = generateRufusQuestions(product.name);

  // Customers also bought — from mock data, pick related category
  const alsoBoughtIds = product.also_bought || [];
  const alsoProducts = alsoBoughtIds.length
    ? alsoBoughtIds.map((aid) => getProductById(aid)).filter(Boolean)
    : MOCK_PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || !product.category)).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white px-4 py-2 text-xs text-[#0066c0]">
          <Link href="/" className="hover:underline hover:text-[#c45500]">Home</Link>
          {" › "}
          {product.category && <><Link href={`/search?q=${product.category}`} className="hover:underline hover:text-[#c45500]">{product.category}</Link>{" › "}</>}
          <span className="text-[#565959] line-clamp-1">{product.name}</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="bg-white shadow-sm">
            <div className="flex gap-0 flex-col lg:flex-row">

              {/* ── LEFT: Image gallery ── */}
              <div className="lg:w-[420px] shrink-0 p-4">
                {/* Thumbnails column + main image */}
                <div className="flex gap-2">
                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="flex flex-col gap-2 shrink-0">
                      {images.map((img, i) => (
                        <button key={i} onClick={() => setSelectedImage(i)}
                          className={`w-14 h-14 border-2 rounded overflow-hidden flex items-center justify-center bg-[#f7f7f7] transition-colors ${selectedImage === i ? "border-[#e77600]" : "border-[#ddd] hover:border-[#ccc]"}`}>
                          <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Main image */}
                  <div className="flex-1 border border-[#d5d9d9] flex items-center justify-center bg-white" style={{ minHeight: 340 }}>
                    {images.length > 0
                      ? <img src={images[selectedImage] || images[0]} alt={product.name}
                          className="max-h-[340px] max-w-full object-contain p-4" key={selectedImage} />
                      : <div className="w-full h-64 bg-gray-100" />}
                  </div>
                </div>

                {/* Wishlist button */}
                <div className="flex gap-2 mt-3">
                  <button onClick={handleWishlist}
                    className={`flex-1 border rounded py-1.5 text-xs flex items-center justify-center gap-1.5 transition-colors ${wishlisted ? "border-[#c45500] text-[#c45500] bg-[#fff8f0]" : "border-[#d5d9d9] text-[#0f1111] hover:bg-[#f7f8f8]"}`}>
                    <FaHeart size={11} className={wishlisted ? "text-[#c45500]" : "text-[#c45500]"} />
                    {wishlisted ? "Saved to Wish List" : "Add to Wish List"}
                  </button>
                </div>
              </div>

              {/* ── MIDDLE: Product details ── */}
              <div className="flex-1 border-l border-[#ddd] p-5">
                {product.brand && (
                  <p className="text-xs text-[#0066c0] mb-1">
                    Brand: <span className="hover:underline cursor-pointer">{product.brand}</span>
                  </p>
                )}
                <h1 className="text-xl font-medium text-[#0f1111] mb-2 leading-snug">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#ddd]">
                  <div className="flex gap-0.5 text-[#f0a500]">
                    {[1,2,3,4,5].map((s) => (
                      <FaStar key={s} size={14} className={s <= Math.round(product.rating || 4) ? "" : "text-[#ddd]"} />
                    ))}
                  </div>
                  <span className="text-[#0066c0] text-sm hover:underline cursor-pointer">{product.rating || "4.0"}</span>
                  {product.reviews_count > 0 && (
                    <span className="text-[#0066c0] text-sm hover:underline cursor-pointer">{Number(product.reviews_count).toLocaleString("en-IN")} ratings</span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  {hasDiscount && (
                    <span className="inline-block bg-[#cc0c39] text-white text-xs font-bold px-2 py-0.5 rounded mb-1">-{pct}% Limited time deal</span>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-medium text-[#0f1111]">
                      <span className="text-sm align-top leading-loose">₹</span>{Number(finalPrice).toLocaleString("en-IN")}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-[#565959]">M.R.P.: <span className="line-through">₹{Number(product.price).toLocaleString("en-IN")}</span></span>
                    )}
                  </div>
                  <p className="text-xs text-[#565959] mt-0.5">Inclusive of all taxes</p>
                </div>

                {/* Color variants */}
                {colors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[#0f1111] mb-2">
                      Colour: <span className="font-bold">{colors[selectedColor]}</span>
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map((color, i) => (
                        <button key={color} onClick={() => setSelectedColor(i)}
                          className={`border-2 rounded px-3 py-1.5 text-xs font-medium transition-colors ${selectedColor === i ? "border-[#e77600] bg-[#fffbf3] text-[#c45500]" : "border-[#d5d9d9] hover:border-[#e77600] text-[#0f1111]"}`}>
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery info */}
                <div className="space-y-2 mb-4 text-sm border-t border-[#ddd] pt-3">
                  <div className="flex items-center gap-2 text-[#007600]">
                    <FaTruck size={14} /> <span className="font-bold">FREE Delivery</span>
                    <span className="text-[#0f1111]">by Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0f1111]">
                    <FaShieldAlt size={14} className="text-[#0066c0]" /> 1 Year Manufacturer Warranty
                  </div>
                  <div className="flex items-center gap-2 text-[#0f1111] text-xs">
                    <FaCheckCircle size={12} className="text-[#007600]" /> Returnable within 10 days
                  </div>
                </div>

                {/* About this item — bullet points */}
                {features.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-[#0f1111] mb-2">About this item</h3>
                    <ul className="space-y-1.5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#0f1111]">
                          <span className="text-[#c45500] mt-0.5 shrink-0">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ask Rufus */}
                <div className="border border-[#d5d9d9] rounded p-4 bg-[#fafafa]">
                  <p className="text-sm font-bold text-[#0f1111] flex items-center gap-1.5 mb-3">
                    <HiSparkles className="text-[#ff9900]" size={15} /> Ask Rufus
                  </p>
                  {/* Quick question chips */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {rufusQuestions.map((q) => (
                      <button key={q} onClick={() => handleRufusQuestion(q)}
                        className="text-xs border border-[#0066c0] text-[#0066c0] rounded-full px-3 py-1 hover:bg-[#0066c0] hover:text-white transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>
                  {/* Custom input */}
                  <div className="flex gap-2">
                    <input
                      value={rufusInput}
                      onChange={(e) => setRufusInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRufusQuestion()}
                      placeholder="Ask something else..."
                      className="flex-1 border border-[#d5d9d9] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#e77600]"
                    />
                    <button onClick={() => handleRufusQuestion()}
                      disabled={!rufusInput.trim() || rufusLoading}
                      className="px-3 py-1.5 bg-[#ff9900] hover:bg-[#fa8900] rounded text-xs font-bold text-[#0f1111] disabled:opacity-50">
                      Ask
                    </button>
                  </div>
                  {rufusLoading && <p className="text-xs text-[#565959] mt-2 animate-pulse">Rufus is thinking...</p>}
                  {rufusAnswer && (
                    <div className="mt-3 bg-white border border-[#d5d9d9] rounded p-3 text-xs text-[#0f1111] leading-relaxed">
                      <HiSparkles className="text-[#ff9900] inline mr-1" size={11} />
                      {rufusAnswer}
                    </div>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Buy box ── */}
              <div className="lg:w-56 shrink-0 border-l border-[#ddd] p-4">
                <div className="sticky top-20">
                  <p className="text-2xl font-medium text-[#0f1111] mb-1">₹{Number(finalPrice).toLocaleString("en-IN")}</p>
                  {hasDiscount && <p className="text-xs text-[#cc0c39] font-semibold mb-2">Save ₹{Number(product.price - finalPrice).toLocaleString("en-IN")} ({pct}%)</p>}
                  <p className="text-xs text-[#007600] font-bold mb-1">In Stock</p>
                  <p className="text-xs text-[#565959] mb-3">FREE delivery Tomorrow</p>

                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <label className="text-[#0f1111]">Qty:</label>
                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))}
                      className="border border-[#d5d9d9] rounded px-2 py-1 bg-[#f0f2f2]">
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  <button onClick={handleAddToCart}
                    className="w-full amazon-btn py-1.5 text-sm flex items-center justify-center gap-1.5 mb-2">
                    <FaShoppingCart size={13} /> Add to Cart
                  </button>
                  <button onClick={handleBuyNow}
                    className="w-full bg-[#ff9900] hover:bg-[#fa8900] border border-[#e47911] text-[#0f1111] rounded py-1.5 text-sm flex items-center justify-center gap-1.5 font-medium mb-3">
                    <FaBolt size={13} /> Buy Now
                  </button>

                  <div className="text-xs text-[#565959] space-y-1 border-t border-[#ddd] pt-3">
                    <p><span className="text-[#0f1111] font-medium">Ships from</span> Amazon</p>
                    <p><span className="text-[#0f1111] font-medium">Sold by</span> {product.brand || "Amazon Seller"}</p>
                    <p><span className="text-[#0f1111] font-medium">Payment</span> Secure transaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Customers also bought ── */}
          {alsoProducts.length > 0 && (
            <div className="mt-4 bg-white shadow-sm p-5">
              <h2 className="text-lg font-bold text-[#0f1111] mb-1">Customers also bought</h2>
              <p className="text-xs text-[#565959] mb-4">Based on products customers bought together</p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {alsoProducts.map((p) => {
                  const fp = p.discount_price || p.price;
                  const disc = p.discount_price && p.discount_price < p.price ? Math.round(((p.price - p.discount_price) / p.price) * 100) : 0;
                  const img = p.image || (p.images && p.images[0]);
                  return (
                    <Link key={p.id} href={`/product/${p.id}`}
                      className="shrink-0 w-36 group">
                      <div className="h-36 bg-[#f7f7f7] rounded flex items-center justify-center mb-2 overflow-hidden border border-[#eee] group-hover:border-[#e77600] transition-colors">
                        <img src={img} alt={p.name} className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform" />
                      </div>
                      <p className="text-xs text-[#0f1111] line-clamp-2 group-hover:text-[#c45500] mb-1">{p.name}</p>
                      <div className="flex gap-0.5 mb-1">
                        {[1,2,3,4,5].map((s) => <FaStar key={s} size={9} className={s <= Math.round(p.rating || 4) ? "text-[#f0a500]" : "text-[#ddd]"} />)}
                      </div>
                      {disc > 0 && <p className="text-[10px] text-[#cc0c39] font-bold">-{disc}%</p>}
                      <p className="text-xs font-bold text-[#0f1111]">₹{Number(fp).toLocaleString("en-IN")}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Buy Now checkout modal ── */}
      {checkoutStep && checkoutStep !== "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="bg-[#131921] text-white flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-bold ${checkoutStep === "address" ? "text-[#febd69]" : "text-[#888]"}`}>1. Address</span>
                <span className="text-[#555]">›</span>
                <span className={`font-bold ${checkoutStep === "payment" ? "text-[#febd69]" : "text-[#888]"}`}>2. Payment</span>
              </div>
              <button onClick={() => setCheckoutStep(null)} className="hover:text-[#ff9900]"><FaTimes size={16} /></button>
            </div>
            <div className="p-6">
              {checkoutStep === "address" && (
                <>
                  <h2 className="text-lg font-bold text-[#0f1111] mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#c45500]" size={16} /> Delivery Address
                  </h2>
                  <div className="space-y-3">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Enter full name" },
                      { key: "line1", label: "Street / Area", placeholder: "House no, street, locality" },
                      { key: "city", label: "City", placeholder: "City" },
                      { key: "pincode", label: "PIN Code", placeholder: "6-digit PIN code" },
                      { key: "phone", label: "Mobile Number", placeholder: "10-digit mobile number" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-[#565959] mb-1">{label}</label>
                        <input value={address[key]}
                          onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border border-[#d5d9d9] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (!address.name || !address.pincode || !address.phone) { toast.error("Please fill name, pincode and phone"); return; }
                    setCheckoutStep("payment");
                  }} className="w-full amazon-btn py-2 text-sm font-medium mt-5">
                    Continue to Payment
                  </button>
                </>
              )}
              {checkoutStep === "payment" && (
                <>
                  <h2 className="text-lg font-bold text-[#0f1111] mb-4 flex items-center gap-2">
                    <FaCreditCard className="text-[#c45500]" size={16} /> Payment Method
                  </h2>
                  <div className="space-y-2 mb-4">
                    {PAYMENT_METHODS.map((m) => (
                      <label key={m.id}
                        className={`flex items-center gap-3 border rounded p-3 cursor-pointer ${payMethod === m.id ? "border-[#e77600] bg-[#fffbf3]" : "border-[#d5d9d9] hover:border-[#e77600]"}`}>
                        <input type="radio" name="pay2" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="accent-[#e77600]" />
                        <m.icon size={16} className="text-[#565959] shrink-0" />
                        <span className="text-sm font-medium text-[#0f1111]">{m.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="bg-[#f7f7f7] rounded p-3 mb-4 text-sm">
                    <div className="flex justify-between font-bold">
                      <span>Order Total</span>
                      <span>₹{Number(finalPrice * qty).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setCheckoutStep("address")}
                      className="flex-1 border border-[#d5d9d9] rounded py-2 text-sm hover:bg-[#f7f7f7]">← Back</button>
                    <button onClick={confirmOrder} disabled={placing}
                      className="flex-1 bg-[#ff9900] hover:bg-[#fa8900] border border-[#e47911] text-[#0f1111] rounded py-2 text-sm font-bold disabled:opacity-60">
                      {placing ? "Placing..." : "Place Order"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {checkoutStep === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 p-8 text-center">
            <FaCheckCircle size={56} className="text-[#007600] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0f1111] mb-2">Order Placed!</h2>
            <p className="text-sm text-[#565959] mb-5">Delivering to {address.city || "your address"}</p>
            <div className="space-y-2">
              <Link href="/orders" onClick={() => setCheckoutStep(null)} className="block w-full amazon-btn py-2 text-sm font-medium">View Orders</Link>
              <Link href="/" onClick={() => setCheckoutStep(null)} className="block w-full border border-[#d5d9d9] rounded py-2 text-sm hover:bg-[#f7f7f7]">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
