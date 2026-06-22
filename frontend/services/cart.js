import api from "./api";
export const getCart = () => api.get("/cart").then((r) => r.data);
export const addToCart = (product_id, quantity = 1) => api.post("/cart/add", { product_id, quantity }).then((r) => r.data);
export const removeFromCart = (id) => api.delete(`/cart/${id}`).then((r) => r.data);
