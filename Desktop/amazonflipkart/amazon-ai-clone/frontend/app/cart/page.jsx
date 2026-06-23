"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useCartStore } from "../../store/cartStore";
import { getCart, addToCart, removeFromCart } from "../../services/cart";
import { createOrder } from "../../services/orders";
import { isLoggedIn } from "../../services/auth";
import { toast } from "sonner";
import Link from "next/link";
import { FaTrash, FaLock, FaTimes, FaMapMarkerAlt, FaCreditCard, FaMobile, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / Google Pay / PhonePe", icon: FaMobile, hint: "Instant — no extra charge" },
  { id: "card", label: "Credit / Debit Card", icon: FaCreditCard, hint: "Visa, Mastercard, Rupay" },
  { id: "cod", label: "Cash on Delivery", icon: FaMoneyBillWave, hint: "Pay when your order arrives" },
];

export default function CartPage() {
  const { items: localItems, removeItem, updateQty, count, clear } = useCartStore();
  const [apiItems, setApiItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(null); // null | "address" | "payment" | "success"
  const [address, setAddress] = useState({
    name: "", line1: "", city: "", pincode: "", phone: "",
  });
  const [payMethod, setPayMethod] = useState("upi");
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      getCart().then((d) => setApiItems(d.items || d)).catch(() => {});
    }
    // Pre-fill from localStorage if user set address in navbar
    const pin = typeof window !== "undefined" ? localStorage.getItem("pincode") || "" : "";
    const city = typeof window !== "undefined" ? localStorage.getItem("savedCity") || "" : "";
    const line = typeof window !== "undefined" ? localStorage.getItem("addressLine") || "" : "";
    setAddress((a) => ({ ...a, pincode: pin, city, line1: line }));
  }, [loggedIn]);

  const displayItems = loggedIn && apiItems.length ? apiItems : localItems;

  const subtotal = displayItems.reduce((sum, it) => {
    const price = it.price || it.product?.price || 0;
    const qty = it.quantity || it.qty || 1;
    return sum + price * qty;
  }, 0);

  async function handleRemove(item) {
    const id = item.id || item.cart_item_id;
    if (loggedIn && item.cart_item_id) {
      try { await removeFromCart(item.cart_item_id); setApiItems((p) => p.filter((i) => i.cart_item_id !== item.cart_item_id)); }
      catch { toast.error("Remove failed"); }
    } else {
      removeItem(id);
    }
  }

  // Items with numeric IDs exist in the backend products table; string IDs are demo/mock products
  const syncableItems = localItems.filter((item) => Number.isInteger(Number(item.id)) && String(item.id) === String(Number(item.id)));
  const allDemo = apiItems.length === 0 && syncableItems.length === 0 && localItems.length > 0;

  async function startCheckout() {
    if (!loggedIn) { toast.error("Please sign in to place an order"); return; }
    if (!allDemo && apiItems.length === 0 && syncableItems.length > 0) {
      // Sync real backend products to the server cart
      await Promise.allSettled(
        syncableItems.map((item) => addToCart(Number(item.id), item.qty || item.quantity || 1))
      );
      try {
        const fresh = await getCart();
        setApiItems(fresh.items || fresh);
      } catch { /* ignore */ }
    }
    setCheckoutStep("address");
  }

  async function confirmOrder() {
    setPlacing(true);
    try {
      if (allDemo) {
        // All items are demo/mock products — simulate order placement
        await new Promise((r) => setTimeout(r, 800));
      } else {
        await createOrder({});
      }
      setCheckoutStep("success");
      clear();
      setApiItems([]);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Order failed — please try again");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 py-6">
        <div className="flex gap-4 items-start">

          {/* Cart items */}
          <div className="flex-1 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-medium text-[#0f1111] mb-1">Shopping Cart</h1>
            {displayItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#565959] text-lg mb-4">Your Amazon Cart is empty.</p>
                <Link href="/" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">Continue Shopping</Link>
              </div>
            ) : (
              <>
                <p className="text-right text-xs text-[#565959] border-b border-[#ddd] pb-2 mb-4">Price</p>
                <div className="space-y-4">
                  {displayItems.map((item, idx) => {
                    const name = item.name || item.product?.name || "Product";
                    const price = item.price || item.product?.price || 0;
                    const qty = item.quantity || item.qty || 1;
                    const img = item.image || item.product?.image;
                    const id = item.id || item.cart_item_id || idx;
                    return (
                      <div key={id} className="flex gap-4 border-b border-[#ddd] pb-4">
                        <div className="w-32 h-32 bg-[#f7f7f7] flex items-center justify-center rounded overflow-hidden shrink-0">
                          {img ? <img src={img} alt={name} className="max-h-full max-w-full object-contain" /> : <div className="w-full h-full bg-gray-200" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-[#0f1111] line-clamp-2">{name}</p>
                          <p className="text-xs text-[#007600] font-bold mt-1">In Stock</p>
                          <div className="flex items-center gap-3 mt-2">
                            <select value={qty} onChange={(e) => updateQty(id, Number(e.target.value))}
                              className="border border-[#d5d9d9] rounded px-2 py-1 text-xs bg-[#f0f2f2] focus:outline-none">
                              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>Qty: {n}</option>)}
                            </select>
                            <button onClick={() => handleRemove(item)}
                              className="flex items-center gap-1 text-xs text-[#c45500] hover:underline">
                              <FaTrash size={10} /> Delete
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-bold text-[#0f1111]">₹{Number(price * qty).toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-right mt-4">
                  <p className="text-lg">
                    Subtotal ({count || displayItems.length} item{displayItems.length !== 1 ? "s" : ""}):
                    {" "}<span className="font-bold">₹{Number(subtotal).toLocaleString("en-IN")}</span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Summary sidebar */}
          {displayItems.length > 0 && (
            <div className="w-64 bg-white p-4 shadow-sm shrink-0">
              <div className="flex items-center gap-1 text-[#007600] text-xs font-bold mb-2">
                <FaLock size={11} /> Your order is secure
              </div>
              <p className="text-lg mb-3">
                Subtotal ({count || displayItems.length} item{displayItems.length !== 1 ? "s" : ""}):
                {" "}<span className="font-bold">₹{Number(subtotal).toLocaleString("en-IN")}</span>
              </p>
              <button onClick={startCheckout} className="w-full amazon-btn py-2 text-sm font-medium">
                Proceed to Buy
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Checkout Modal ── */}
      {checkoutStep && checkoutStep !== "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-[#131921] text-white flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-bold ${checkoutStep === "address" ? "text-[#febd69]" : "text-[#888]"}`}>1. Address</span>
                <span className="text-[#555]">›</span>
                <span className={`font-bold ${checkoutStep === "payment" ? "text-[#febd69]" : "text-[#888]"}`}>2. Payment</span>
                <span className="text-[#555]">›</span>
                <span className="font-bold text-[#888]">3. Confirm</span>
              </div>
              <button onClick={() => setCheckoutStep(null)} className="hover:text-[#ff9900]">
                <FaTimes size={16} />
              </button>
            </div>

            <div className="p-6">
              {/* Step 1 — Address */}
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
                        <input
                          value={address[key]}
                          onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border border-[#d5d9d9] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (!address.name || !address.pincode || !address.phone) { toast.error("Please fill name, pincode and phone"); return; }
                      setCheckoutStep("payment");
                    }}
                    className="w-full amazon-btn py-2 text-sm font-medium mt-5"
                  >
                    Continue to Payment
                  </button>
                </>
              )}

              {/* Step 2 — Payment */}
              {checkoutStep === "payment" && (
                <>
                  <h2 className="text-lg font-bold text-[#0f1111] mb-4 flex items-center gap-2">
                    <FaCreditCard className="text-[#c45500]" size={16} /> Payment Method
                  </h2>
                  <div className="space-y-2 mb-5">
                    {PAYMENT_METHODS.map((m) => (
                      <label key={m.id}
                        className={`flex items-center gap-3 border rounded p-3 cursor-pointer transition-colors ${payMethod === m.id ? "border-[#e77600] bg-[#fffbf3]" : "border-[#d5d9d9] hover:border-[#e77600]"}`}>
                        <input type="radio" name="pay" value={m.id} checked={payMethod === m.id}
                          onChange={() => setPayMethod(m.id)} className="accent-[#e77600]" />
                        <m.icon size={18} className="text-[#565959] shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[#0f1111]">{m.label}</p>
                          <p className="text-xs text-[#565959]">{m.hint}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="bg-[#f7f7f7] rounded p-3 mb-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#565959]">Items</span>
                      <span className="font-medium">₹{Number(subtotal).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#565959]">Delivery</span>
                      <span className="text-[#007600] font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-[#ddd] pt-2 mt-2">
                      <span>Order Total</span>
                      <span>₹{Number(subtotal).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setCheckoutStep("address")}
                      className="flex-1 border border-[#d5d9d9] rounded py-2 text-sm hover:bg-[#f7f7f7]">
                      ← Back
                    </button>
                    <button onClick={confirmOrder} disabled={placing}
                      className="flex-1 bg-[#ff9900] hover:bg-[#fa8900] border border-[#e47911] text-[#0f1111] rounded py-2 text-sm font-bold disabled:opacity-60">
                      {placing ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Order Success ── */}
      {checkoutStep === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 p-8 text-center">
            <FaCheckCircle size={56} className="text-[#007600] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0f1111] mb-2">Order Placed!</h2>
            <p className="text-sm text-[#565959] mb-2">
              Delivering to <strong>{address.city || "your address"}</strong>
            </p>
            <p className="text-xs text-[#565959] mb-5">
              Payment via <strong>{PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}</strong>
            </p>
            <div className="space-y-2">
              <Link href="/orders" onClick={() => setCheckoutStep(null)}
                className="block w-full amazon-btn py-2 text-sm font-medium">
                View Orders
              </Link>
              <Link href="/" onClick={() => setCheckoutStep(null)}
                className="block w-full border border-[#d5d9d9] rounded py-2 text-sm hover:bg-[#f7f7f7]">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
