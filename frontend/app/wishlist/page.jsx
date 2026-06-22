"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getWishlist, removeFromWishlist } from "../../services/wishlist";
import { isLoggedIn } from "../../services/auth";
import { enrichWishlistItems } from "../../store/wishlistCache";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) { setLoading(false); return; }
    getWishlist()
      .then((d) => {
        const raw = d.items || d || [];
        setItems(enrichWishlistItems(raw));
      })
      .catch(() => toast.error("Could not load wishlist"))
      .finally(() => setLoading(false));
  }, [loggedIn]);

  async function handleRemove(wishlistId) {
    try {
      await removeFromWishlist(wishlistId);
      setItems((p) => p.filter((i) => (i.wishlist_item_id || i.id) !== wishlistId));
      toast.success("Removed from Wish List");
    } catch { toast.error("Remove failed"); }
  }

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">
        <div className="bg-white shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaHeart className="text-[#c45500]" size={20} />
            <h1 className="text-2xl font-medium text-[#0f1111]">Your Wish List</h1>
          </div>

          {!loggedIn ? (
            <div className="text-center py-12">
              <p className="text-[#565959] mb-4">Please sign in to view your Wish List.</p>
              <Link href="/login" className="amazon-btn px-6 py-2 text-sm">Sign in</Link>
            </div>
          ) : loading ? (
            <div className="text-center py-12 text-[#565959]">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#565959] text-lg mb-4">Your Wish List is empty.</p>
              <Link href="/" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((item) => {
                // enrichWishlistItems already resolved name/price/image
                const name = item.name;
                const price = item.price;
                const img = item.image;
                const brand = item.brand;
                const wishlistId = item.wishlist_item_id || item.id;
                const productId = item.product_id || item.id;
                const id = wishlistId;

                return (
                  <div key={id} className="border border-gray-100 hover:border-gray-300 rounded p-3 group flex flex-col">
                    <div className="relative h-40 bg-[#f7f7f7] rounded overflow-hidden mb-2 flex items-center justify-center">
                      {img ? <img src={img} alt={name} className="max-h-full max-w-full object-contain" /> : <div className="w-full h-full bg-gray-200" />}
                      <button
                        onClick={() => handleRemove(id)}
                        className="absolute top-1 right-1 p-1.5 bg-white rounded-full shadow text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaHeart size={12} />
                      </button>
                    </div>
                    {brand && <p className="text-[10px] text-[#0066c0] mb-0.5">{brand}</p>}
                    <Link href={`/product/${productId}`} className="text-sm text-[#0f1111] hover:text-[#c45500] line-clamp-2 leading-snug flex-1">{name}</Link>
                    <p className="text-base font-bold text-[#0f1111] mt-1">₹{Number(price).toLocaleString("en-IN")}</p>
                    <button
                      onClick={() => { addItem({ id: productId, name, price, image: img }); toast.success("Added to cart"); }}
                      className="mt-2 amazon-btn w-full text-xs flex items-center justify-center gap-1"
                    >
                      <FaShoppingCart size={11} /> Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
