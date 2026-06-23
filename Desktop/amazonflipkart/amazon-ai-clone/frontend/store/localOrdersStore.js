"use client";

const KEY = "local_orders";

function load() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

function save(orders) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function saveLocalOrder(order) {
  const orders = load();
  orders.unshift(order);
  save(orders);
}

export function getLocalOrders() {
  return load();
}
