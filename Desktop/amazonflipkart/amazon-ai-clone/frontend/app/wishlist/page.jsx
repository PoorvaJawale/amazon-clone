"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getWishlist, removeFromWishlist } from "../../services/wishlist";
import { getProduct } from "../../services/products";
import { isLoggedIn } from "../../services/auth";
import { enrichWishlistItems, cacheWishlistProduct, getLocalWishlistItems, removeLocalWishlistItem } from "../../store/wishlistCache";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import Link from "next/link";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) { setLoading(false); return; }

    getWishlist()
      .then(async (d) => {
        const raw = d.items || d || [];

        // Pass 1: enrich API items from localStorage cache
        let enriched = enrichWishlistItems(raw);

        // Pass 2: for items still missing name/price, try fetching from backend
        const missing = enriched.filter(
          (item) => !item.name || item.name === "Product" || item.price === 0
        );
        if (missing.length > 0) {
          const results = await Promise.allSettled(
            missing.map((item) => getProduct(item.product_id || item.id))
          );
          results.forEach((result, i) => {
            if (result.status === "fulfilled" && result.value) {
              const prod = result.value;
              const idx = enriched.findIndex((e) => e === missing[i]);
              if (idx !== -1) {
                enriched[idx] = {
                  ...enriched[idx],
                  name: prod.name,
                  price: prod.discount_price || prod.price || 0,
                  image: prod.image,
                  brand: prod.brand || "",
                  discount_price: prod.discount_price,
                };
                cacheWishlistProduct(String(prod.id), {
                  name: prod.name, price: prod.price,
                  discount_price: prod.discount_price,
                  image: prod.image, brand: prod.brand,
                });
              }
            }
          });
        }

        // Pass 3: merge in locally-saved items (mock products the backend doesn't know)
        const localItems = getLocalWishlistItems();
        const apiProductIds = new Set(enriched.map((e) => String(e.product_id || e.id)));
        const uniqueLocal = localItems.filter(
          (li) => !apiProductIds.has(String(li.product_id))
        );

        setItems([...enriched, ...uniqueLocal]);
      })
      .catch(() => toast.error("Could not load wishlist"))
      .finally(() => setLoading(false));
  }, [loggedIn]);

  async function handleRemove(item) {
    const wishlistId = item.wishlist_item_id || item.id;
    // Local-only items just need localStorage removal
    if (item.isLocal) {
      removeLocalWishlistItem(item.product_id);
      setItems((p) => p.filter((i) => (i.wishlist_item_id || i.id) !== wishlistId));
      toast.success("Removed from Wish List");
      return;
    }
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
          <div className="flex items-center gap-2 mb-1">
            <FaHeart className="text-[#c45500]" size={20} />
            <h1 className="text-2xl font-medium text-[#0f1111]">Your Wish List</h1>
          </div>
          {items.length > 0 && (
            <p className="text-sm text-[#565959] mb-6">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          )}

          {!loggedIn ? (
            <div className="text-center py-12">
              <p className="text-[#565959] mb-4">Please sign in to view your Wish List.</p>
              <Link href="/login" className="amazon-btn px-6 py-2 text-sm">Sign in</Link>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-[#565959]">
              <div className="w-5 h-5 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
              Loading your Wish List...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <FaHeart size={40} className="text-[#ddd] mx-auto mb-4" />
              <p className="text-[#565959] text-lg mb-4">Your Wish List is empty.</p>
              <Link href="/" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((item) => {
                const name = item.name || "Product";
                const price = item.price || 0;
                const img = item.image;
                const brand = item.brand;
                const wishlistId = item.wishlist_item_id || item.id;
                const productId = item.product_id || item.id;
                const hasDiscount = item.discount_price && item.discount_price < item.price;
                const pct = hasDiscount ? Math.round(((item.price - item.discount_price) / item.price) * 100) : 0;

                return (
                  <div key={wishlistId} className="border border-gray-100 hover:border-gray-300 rounded p-3 group flex flex-col transition-shadow hover:shadow-md">
                    {/* Image */}
                    <Link href={`/product/${productId}`} className="relative h-44 bg-[#f7f7f7] rounded overflow-hidden mb-2 flex items-center justify-center block">
                      {img
                        ? <img src={img} alt={name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 p-2" />
                        : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">?</div>}
                      {hasDiscount && (
                        <span className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">-{pct}%</span>
                      )}
                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.preventDefault(); handleRemove(item); }}
                        className="absolute top-1 right-1 p-1.5 bg-white rounded-full shadow text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from Wish List"
                      >
                        <FaTrash size={11} />
                      </button>
                    </Link>

                    {/* Info */}
                    <div className="flex flex-col flex-1 gap-0.5">
                      {brand && <p className="text-[10px] text-[#0066c0]">{brand}</p>}
                      <Link href={`/product/${productId}`} className="text-sm text-[#0f1111] hover:text-[#c45500] line-clamp-2 leading-snug flex-1">
                        {name}
                      </Link>

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <p className="text-base font-bold text-[#0f1111]">
                          ₹{Number(price).toLocaleString("en-IN")}
                        </p>
                        {hasDiscount && (
                          <p className="text-xs text-[#565959] line-through">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <p className="text-[11px] text-[#007600]">FREE Delivery</p>

                      <button
                        onClick={() => { addItem({ id: productId, name, price, image: img }); toast.success("Added to cart"); }}
                        className="mt-2 amazon-btn w-full text-xs flex items-center justify-center gap-1 py-1.5"
                      >
                        <FaShoppingCart size={11} /> Add to Cart
                      </button>
                    </div>
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
