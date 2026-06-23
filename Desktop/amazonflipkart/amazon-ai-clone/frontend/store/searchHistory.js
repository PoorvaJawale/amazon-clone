const SEARCH_KEY = "recent_searches";
const VIEWED_KEY = "recently_viewed";
const MAX_SEARCHES = 5;
const MAX_VIEWED = 8;

/* ── Search history ── */
export function saveSearch(query) {
  if (!query || typeof window === "undefined") return;
  const q = query.trim().toLowerCase();
  if (!q) return;
  const prev = getRecentSearches().filter((s) => s !== q);
  localStorage.setItem(SEARCH_KEY, JSON.stringify([q, ...prev].slice(0, MAX_SEARCHES)));
}

export function getRecentSearches() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(SEARCH_KEY) || "[]"); } catch { return []; }
}

/* ── Recently viewed products ── */
export function saveRecentlyViewed(product) {
  if (!product || typeof window === "undefined") return;
  const prev = getRecentlyViewed().filter((p) => String(p.id) !== String(product.id));
  const updated = [product, ...prev].slice(0, MAX_VIEWED);
  localStorage.setItem(VIEWED_KEY, JSON.stringify(updated));
}

export function getRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]"); } catch { return []; }
}

/* ── Filter helpers ── */
export function filterByRecentSearches(products, searches) {
  if (!searches || searches.length === 0) return [];
  return products.filter((p) => {
    const haystack = `${p.name} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
    return searches.some((s) => haystack.includes(s));
  });
}
