// Stores product details keyed by product_id in localStorage so the
// wishlist page can display correct name/price/image even when the
// backend returns items without a nested product object.

const KEY = "wishlist_product_cache";

function readCache() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}

export function cacheWishlistProduct(productId, { name, price, image, brand, discount_price }) {
  const cache = readCache();
  cache[String(productId)] = { name, price, image, brand, discount_price };
  localStorage.setItem(KEY, JSON.stringify(cache));
}

export function enrichWishlistItems(apiItems) {
  const cache = readCache();
  return (apiItems || []).map((item) => {
    const pid = String(item.product_id || item.id || "");
    const cached = cache[pid] || {};
    return {
      ...item,
      name: item.name || item.product?.name || cached.name || "Product",
      price: item.price || item.product?.price || cached.discount_price || cached.price || 0,
      image: item.image || item.product?.image || cached.image || null,
      brand: item.brand || item.product?.brand || cached.brand || "",
    };
  });
}
