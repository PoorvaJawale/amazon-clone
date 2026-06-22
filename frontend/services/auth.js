import api from "./api";

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const register = (full_name, email, password) =>
  api.post("/auth/register", { full_name, email, password }).then((r) => r.data);

export const getMe = () => api.get("/auth/me").then((r) => r.data);

export const logout = () => typeof window !== "undefined" && localStorage.removeItem("token");

export const isLoggedIn = () =>
  typeof window !== "undefined" && !!localStorage.getItem("token");
