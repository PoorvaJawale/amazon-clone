import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { lang, texts } = await request.json();

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json({ error: "No OpenAI key" }, { status: 503 });
    }

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
