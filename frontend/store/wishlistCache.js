// Two-layer wishlist persistence:
//  1. PRODUCT_CACHE: product details keyed by id (used to enrich API items)
//  2. LOCAL_LIST:    full wishlist items for products the backend doesn't know
//     (mock / frontend-only IDs like "feat-1", "m1", etc.)

const PRODUCT_CACHE_KEY = "wishlist_product_cache";
const LOCAL_LIST_KEY = "wishlist_local_items";

function readCache() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(PRODUCT_CACHE_KEY) || "{}"); } catch { return {}; }
}

function readLocalList() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LOCAL_LIST_KEY) || "[]"); } catch { return []; }
}

export function cacheWishlistProduct(productId, { name, price, image, brand, discount_price }) {
  const cache = readCache();
  cache[String(productId)] = { name, price, image, brand, discount_price };
  localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(cache));
}

// Save a full item locally when the API can't accept it (mock product IDs)
export function saveLocalWishlistItem(productId, { name, price, image, brand, discount_price }) {
  cacheWishlistProduct(productId, { name, price, image, brand, discount_price });
  const list = readLocalList();
  if (!list.find((i) => String(i.product_id) === String(productId))) {
    list.push({
      id: `local-${productId}`,
      wishlist_item_id: `local-${productId}`,
      product_id: productId,
      name, price: discount_price || price, price_original: price,
      image, brand, discount_price, isLocal: true,
    });
    localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(list));
  }
}

export function removeLocalWishlistItem(productId) {
  const list = readLocalList().filter((i) => String(i.product_id) !== String(productId) && i.wishlist_item_id !== productId);
  localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(list));
}

export function getLocalWishlistItems() {
  return readLocalList();
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
