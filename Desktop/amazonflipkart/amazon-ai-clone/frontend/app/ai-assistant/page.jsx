"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { generateRecommendations } from "../../services/recommendations";
import { isLoggedIn } from "../../services/auth";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import Link from "next/link";
import { FaShoppingCart, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const STARTERS = [
  "Show me the best laptops under ₹50,000",
  "I need wireless headphones with noise cancellation",
  "What are the top kitchen appliances on sale?",
  "Recommend a smartwatch for fitness tracking",
  "Find me eco-friendly home products",
];

// Mock purchase & browsing history for demo accounts — used to personalise recommendations
const DEMO_HISTORY = {
  "poorva@example.com": {
    purchased: ["boAt Airdopes 161 TWS Earbuds", "Noise ColorFit Ultra 3 Smartwatch", "Wildcraft 45L Backpack"],
    viewed: ["Sony WH-1000XM5 Headphones", "Samsung Galaxy M34 5G", "Philips Air Fryer"],
    interests: ["Electronics", "Fitness", "Travel Gear"],
  },
  "demo@amazon.in": {
    purchased: ["Prestige Pressure Cooker", "Milton Flask 1L", "Cello Dinner Set"],
    viewed: ["Bajaj Mixer Grinder", "Story@Home Comforter", "Philips LED Bulbs"],
    interests: ["Kitchen", "Home Decor", "Daily Essentials"],
  },
};

function getHistoryContext() {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem("userEmail") || "";
  if (DEMO_HISTORY[email]) return DEMO_HISTORY[email];
  // Generic history based on cart/wishlist usage
  return {
    purchased: [],
    viewed: [],
    interests: ["Electronics", "Fashion", "Home & Kitchen"],
  };
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-[#232f3e]" : "bg-gradient-to-br from-[#00b4d8] to-[#0077b6]"}`}>
        {isUser ? <FaUser size={14} className="text-white" /> : <FaRobot size={14} className="text-white" />}
      </div>
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "bg-[#232f3e] text-white rounded-tr-sm" : "bg-white border border-[#d5d9d9] text-[#0f1111] rounded-tl-sm shadow-sm"}`}>
          {msg.content}
        </div>
        {/* Product recommendations */}
        {msg.products && msg.products.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {msg.products.map((p) => (
              <ProductChip key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductChip({ product }) {
  const { addItem } = useCartStore();
  const price = product.discount_price || product.price || 0;
  return (
    <div className="bg-white border border-[#d5d9d9] rounded-lg p-2 w-36 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-20 bg-[#f7f7f7] rounded flex items-center justify-center mb-1.5 overflow-hidden">
        {product.image
          ? <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          : <div className="w-full h-full bg-gray-200" />}
      </div>
      <p className="text-[10px] text-[#0f1111] line-clamp-2 leading-tight mb-1">{product.name}</p>
      <p className="text-[11px] font-bold text-[#0f1111] mb-1.5">₹{Number(price).toLocaleString("en-IN")}</p>
      <button
        onClick={() => addItem({ id: product.id, name: product.name, price, image: product.image })}
        className="w-full amazon-btn text-[9px] flex items-center justify-center gap-0.5 py-1"
      >
        <FaShoppingCart size={8} /> Add
      </button>
    </div>
  );
}

export default function AIAssistantPage() {
  const history = getHistoryContext();
  const historyGreeting = history?.purchased?.length
    ? `\n\nBased on your past purchases — *${history.purchased.slice(0, 2).join(", ")}* — I'll tailor my picks for you.`
    : "";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm Rufus, your Amazon AI assistant. I can help you find products, compare prices, and get personalised recommendations.${historyGreeting}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const contextualQuery = history?.purchased?.length
        ? `${msg} (User previously bought: ${history.purchased.join(", ")}; interests: ${history.interests.join(", ")})`
        : msg;
      const result = await generateRecommendations({ query: contextualQuery });
      const products = Array.isArray(result) ? result : (result.recommendations || result.products || []);
      const replyText = products.length
        ? `Here are ${products.length} recommendations for "${msg}":`
        : `I couldn't find specific products for "${msg}", but you can browse our full catalog. Try being more specific!`;
      setMessages((p) => [...p, { role: "assistant", content: replyText, products }]);
    } catch (err) {
      const errMsg = err?.response?.status === 401
        ? "Please sign in to get personalized recommendations."
        : "Sorry, I encountered an error. Please try again.";
      setMessages((p) => [...p, { role: "assistant", content: errMsg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col max-w-[900px] mx-auto w-full px-4 py-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f1111] to-[#232f3e] text-white rounded-t-xl px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00b4d8] flex items-center justify-center">
            <HiSparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold">Rufus — Amazon AI</h1>
            <p className="text-xs text-[#ccc]">Your personal shopping assistant</p>
          </div>
          {!loggedIn && (
            <Link href="/login" className="ml-auto text-xs text-[#ff9900] hover:underline">Sign in for personalized picks</Link>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-[#f7f7f7] border border-[#d5d9d9] border-t-0 px-6 py-4 space-y-4 overflow-y-auto" style={{ minHeight: 400, maxHeight: "60vh" }}>
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0077b6] flex items-center justify-center shrink-0">
                <FaRobot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-[#d5d9d9] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center h-4">
                  <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Starter chips */}
        {messages.length <= 1 && (
          <div className="bg-white border border-[#d5d9d9] border-t-0 px-6 py-3 flex gap-2 flex-wrap">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs border border-[#d5d9d9] rounded-full px-3 py-1.5 text-[#0066c0] hover:bg-[#f7f7f7] hover:border-[#c45500] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="bg-white border border-[#d5d9d9] border-t-0 rounded-b-xl px-4 py-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask Rufus anything — products, deals, comparisons..."
            className="flex-1 text-sm border border-[#d5d9d9] rounded-full px-4 py-2 focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-[#ff9900] hover:bg-[#fa8900] disabled:opacity-50 flex items-center justify-center shrink-0 transition-colors"
          >
            <FaPaperPlane size={14} className="text-white" />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
