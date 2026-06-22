import api from "./api";
export const getRecommendations = (params = {}) =>
  api.get("/recommendations", { params }).then((r) => r.data);
export const generateRecommendations = (data) => api.post("/recommendations/generate", data).then((r) => r.data);
