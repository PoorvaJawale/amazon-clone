import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "../../../data/mockProducts";

/*
  POST /api/recommend
  Body: { searches: string[], recentlyViewed: Product[], wishlistItems: Product[] }
  Returns: { picks: Product[], title: string }

  Sends user context to OpenAI → GPT returns ordered list of product IDs from the catalogue
  that are most relevant. We then hydrate and return the full product objects.
*/

// Slim catalogue sent to GPT — just enough for it to decide relevance
const CATALOGUE = MOCK_PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: p.discount_price || p.price,
}));

export async function POST(request) {
  try {
    const { searches = [], recentlyViewed = [], wishlistItems = [] } = await request.json();

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY || OPENAI_KEY === "your_openai_key_here") {
      return NextResponse.json({ error: "No OpenAI key configured" }, { status: 503 });
    }

    // Build context block for GPT
    const contextParts = [];
    if (searches.length > 0)
      contextParts.push(`Recent searches: ${searches.join(", ")}`);
    if (recentlyViewed.length > 0)
      contextParts.push(`Recently viewed products: ${recentlyViewed.map((p) => p.name).join("; ")}`);
    if (wishlistItems.length > 0)
      contextParts.push(`Wishlisted products: ${wishlistItems.map((p) => p.name).join("; ")}`);

    const userContext = contextParts.length > 0
      ? contextParts.join("\n")
      : "No browsing history — recommend popular products across categories.";

    const catalogueText = CATALOGUE.map(
      (p) => `ID:${p.id} | ${p.name} | ${p.brand} | ${p.category} | ₹${p.price}`
    ).join("\n");

    const prompt = `You are an AI recommendation engine for an Indian e-commerce platform (like Amazon India).

USER CONTEXT:
${userContext}

PRODUCT CATALOGUE:
${catalogueText}

TASK:
Based on the user's interests shown above, select and rank up to 12 product IDs from the catalogue that the user is most likely to buy next. Consider:
- Direct matches to their search terms
- Complementary/accessory products
- Products in the same category they've shown interest in
- Price similarity to items they've viewed

Return ONLY a JSON array of product IDs, most relevant first. Example: ["feat-2","m3","feat-1"]
No explanation, no markdown, just the JSON array.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI recommend error:", err);
      // Graceful fallback: return first 12 products
      return NextResponse.json({
        picks: MOCK_PRODUCTS.slice(0, 12),
        title: searches[0] ? `More picks based on "${searches[0]}"` : "Recommended for You",
      });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    // Parse the ID array GPT returned
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) {
      return NextResponse.json({ picks: MOCK_PRODUCTS.slice(0, 12), title: "Recommended for You" });
    }

    const ids = JSON.parse(match[0]);

    // Hydrate: look up full product objects in order GPT chose
    const idMap = Object.fromEntries(MOCK_PRODUCTS.map((p) => [p.id, p]));
    const picks = ids
      .map((id) => idMap[id])
      .filter(Boolean);

    // Dynamic section title
    const title = searches.length > 0
      ? `More picks based on "${searches[0]}"`
      : "AI Picks for You";

    return NextResponse.json({ picks, title });
  } catch (err) {
    console.error("Recommend route error:", err);
    return NextResponse.json({ picks: MOCK_PRODUCTS.slice(0, 12), title: "Recommended for You" });
  }
}
