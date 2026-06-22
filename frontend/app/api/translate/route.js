import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json({ error: "No OpenAI key" }, { status: 503 });
    }

    // Rufus product Q&A mode
    if (body.mode === "rufus") {
      const { rufusQuery, productName } = body;
      const prompt = `You are Rufus, Amazon's AI shopping assistant. A customer is viewing "${productName}" and asked: "${rufusQuery}".
Answer in 2-3 sentences based on common product knowledge. Be helpful, specific, and positive. Do not mention you are an AI.`;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 150 }),
      });
      if (!res.ok) return NextResponse.json({ answer: `Based on customer reviews, ${productName} is well-regarded for its quality and performance.` });
      const data = await res.json();
      return NextResponse.json({ answer: data.choices?.[0]?.message?.content?.trim() || "" });
    }

    // Translation mode
    const { lang, texts } = body;
    const prompt = `Translate the following UI labels to ${lang}. Return ONLY a valid JSON object where each key is the original English text and the value is the translation. No extra text, no markdown.

English texts to translate:
${texts.map((t) => `"${t}"`).join("\n")}

Return format:
{"Search Amazon.in": "<translation>", ...}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", err);
      return NextResponse.json({ error: "OpenAI error" }, { status: res.status });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: "Bad response" }, { status: 500 });

    const translations = JSON.parse(jsonMatch[0]);
    return NextResponse.json(translations);
  } catch (err) {
    console.error("Translate error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
