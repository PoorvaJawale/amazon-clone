"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useCartStore } from "../../store/cartStore";
import { getCart, removeFromCart } from "../../services/cart";
import { createOrder } from "../../services/orders";
import { isLoggedIn } from "../../services/auth";
import { toast } from "sonner";
import Link from "next/link";
import { FaTrash, FaLock } from "react-icons/fa";

export default function CartPage() {
  const { items: localItems, removeItem, updateQty, count, clear } = useCartStore();
  const [apiItems, setApiItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      getCart().then((d) => setApiItems(d.items || d)).catch(() => {});
    }
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
      try { await removeFromCart(item.cart_item_id); setApiItems((p) => p.filter((i) => i.cart_item_id !== item.cart_item_id)); } catch { toast.error("Remove failed"); }
    } else {
      removeItem(id);
    }
  }

  async function handlePlaceOrder() {
    if (!loggedIn) { toast.error("Please sign in to place an order"); return; }
    setPlacing(true);
    try {
      await createOrder({});
      toast.success("Order placed successfully!");
      clear();
      setApiItems([]);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Order failed");
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
                <Link href="/" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">
                  Continue Shopping
                </Link>
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
                          <p className="text-base font-medium text-[#0f1111] hover:text-[#c45500] cursor-pointer line-clamp-2">{name}</p>
                          <p className="text-xs text-[#007600] font-bold mt-1">In Stock</p>
                          <div className="flex items-center gap-3 mt-2">
                            <select
                              value={qty}
                              onChange={(e) => updateQty(id, Number(e.target.value))}
                              className="border border-[#d5d9d9] rounded px-2 py-1 text-xs bg-[#f0f2f2] focus:outline-none"
                            >
                              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>Qty: {n}</option>)}
                            </select>
                            <button
                              onClick={() => handleRemove(item)}
                              className="flex items-center gap-1 text-xs text-[#c45500] hover:underline"
                            >
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
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full amazon-btn py-2 text-sm font-medium"
              >
                {placing ? "Placing..." : "Proceed to Buy"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
