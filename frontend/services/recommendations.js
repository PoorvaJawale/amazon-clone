import api from "./api";
export const getRecommendations = () => api.get("/recommendations").then((r) => r.data);
export const generateRecommendations = (data) => api.post("/recommendations/generate", data).then((r) => r.data);
