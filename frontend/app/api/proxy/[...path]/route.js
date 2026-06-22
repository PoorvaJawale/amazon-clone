import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8001";

async function handler(request, { params }) {
  const { path } = await params;
  const pathStr = Array.isArray(path) ? path.join("/") : path;
  const url = `${BACKEND}/${pathStr}${request.nextUrl.search}`;

  const headers = {};
  const auth = request.headers.get("authorization");
  if (auth) headers["authorization"] = auth;
  headers["content-type"] = request.headers.get("content-type") || "application/json";

  let body;
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") {
    try { body = await request.text(); } catch { body = undefined; }
  }

  try {
    const res = await fetch(url, { method, headers, body });
    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") || "application/json" },
    });
  } catch (err) {
    return NextResponse.json({ detail: "Backend unreachable" }, { status: 503 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
