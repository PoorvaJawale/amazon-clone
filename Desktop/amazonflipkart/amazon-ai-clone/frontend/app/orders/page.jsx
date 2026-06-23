"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getOrders } from "../../services/orders";
import { isLoggedIn } from "../../services/auth";
import { getLocalOrders } from "../../store/localOrdersStore";
import { toast } from "sonner";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";

const STATUS_COLORS = {
  delivered: "text-[#007600]",
  shipped: "text-[#0066c0]",
  pending: "text-[#c45500]",
  cancelled: "text-[#cc0c39]",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) { setLoading(false); return; }
    const local = getLocalOrders();
    getOrders()
      .then((d) => {
        // Merge backend orders + locally-saved demo orders, newest first
        const backend = d || [];
        const merged = [...local, ...backend].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setOrders(merged);
      })
      .catch(() => {
        // Backend unavailable — show local orders only
        setOrders(local);
      })
      .finally(() => setLoading(false));
  }, [loggedIn]);

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-medium text-[#0f1111] mb-4">Your Orders</h1>

        {!loggedIn ? (
          <div className="bg-white p-8 text-center shadow-sm">
            <p className="text-[#565959] mb-4">Please sign in to view your orders.</p>
            <Link href="/login" className="amazon-btn px-6 py-2 text-sm">Sign in</Link>
          </div>
        ) : loading ? (
          <div className="bg-white p-8 text-center shadow-sm text-[#565959]">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center shadow-sm">
            <FaBoxOpen size={48} className="mx-auto text-[#d5d9d9] mb-4" />
            <h2 className="text-xl font-medium text-[#0f1111] mb-2">No orders yet</h2>
            <p className="text-[#565959] mb-6">You haven't placed any orders yet.</p>
            <Link href="/" className="amazon-btn px-6 py-2 text-sm inline-block">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm border border-[#d5d9d9] rounded">
                {/* Order header */}
                <div className="bg-[#f0f2f2] px-4 py-3 flex flex-wrap items-center gap-4 text-xs border-b border-[#d5d9d9] rounded-t">
                  <div>
                    <p className="text-[#565959] font-bold">ORDER PLACED</p>
                    <p className="text-[#0f1111]">{new Date(order.created_at || order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <div>
                    <p className="text-[#565959] font-bold">TOTAL</p>
                    <p className="text-[#0f1111] font-bold">₹{Number(order.total_amount || order.total || 0).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[#565959]">ORDER # {order.id}</p>
                    <p className={`font-bold capitalize ${STATUS_COLORS[order.status] || "text-[#0f1111]"}`}>{order.status || "Processing"}</p>
                  </div>
                </div>

                {/* Order items */}
                <div className="p-4">
                  {(order.items || []).map((item, idx) => {
                    const name = item.name || item.product?.name || `Item ${idx + 1}`;
                    const price = item.price || item.product?.price || 0;
                    const img = item.image || item.product?.image;
                    const qty = item.quantity || 1;

                    return (
                      <div key={idx} className="flex gap-4 mb-3">
                        <div className="w-20 h-20 bg-[#f7f7f7] rounded flex items-center justify-center shrink-0">
                          {img ? <img src={img} alt={name} className="max-h-full max-w-full object-contain" /> : null}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0f1111]">{name}</p>
                          <p className="text-sm text-[#565959]">Qty: {qty}</p>
                          <p className="text-sm font-bold text-[#0f1111]">₹{Number(price).toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    );
                  })}

                  {(!order.items || order.items.length === 0) && (
                    <p className="text-sm text-[#565959]">Order #{order.id} — ₹{Number(order.total_amount || order.total || 0).toLocaleString("en-IN")}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
