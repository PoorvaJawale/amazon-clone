const KEY = "recent_searches";
const MAX = 5;

export function saveSearch(query) {
  if (!query || typeof window === "undefined") return;
  const q = query.trim().toLowerCase();
  if (!q) return;
  const prev = getRecentSearches().filter((s) => s !== q);
  const updated = [q, ...prev].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getRecentSearches() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function clearSearchHistory() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

// Return products from a pool that match any recent search term
export function filterByRecentSearches(products, searches) {
  if (!searches || searches.length === 0) return [];
  return products.filter((p) => {
    const haystack = `${p.name} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
    return searches.some((s) => haystack.includes(s));
  });
}
