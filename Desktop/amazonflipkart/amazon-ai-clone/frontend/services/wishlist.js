import api from "./api";
export const getWishlist = () => api.get("/wishlist").then((r) => r.data);
export const addToWishlist = (product_id) => api.post("/wishlist/add", { product_id }).then((r) => r.data);
export const removeFromWishlist = (id) => api.delete(`/wishlist/${id}`).then((r) => r.data);
