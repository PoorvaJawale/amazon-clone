import api from "./api";
export const getOrders = () => api.get("/orders").then((r) => r.data);
export const createOrder = (data) => api.post("/orders/create", data).then((r) => r.data);
