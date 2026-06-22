"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, User, RefreshCw } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export default function RufusDrawer() {
  const { isRufusOpen, setRufusOpen } = useCartStore();
  const [messages, setMessages] = useState([
    {
      sender: "rufus",
      text: "Hello Poorva! I'm Rufus, your Amazon Shopping Assistant. What can I help you find today? I can help you search, compare products, check deals, and answer shopping questions!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    "What are today's top deals?",
    "Compare stainless steel vs glass straws",
    "Smartwatches under ₹3,000",
    "Return policy for electronics"
  ];

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Rufus response
    setTimeout(() => {
      let reply = "";
      const normalized = text.toLowerCase();

      if (normalized.includes("deal") || normalized.includes("discount")) {
        reply = "Here are today's featured Deals of the Day on Amazon.in:\n\n• **Philips Air Fryers**: Starting at ₹6,499 (45% Off)\n• **Prestige Cookware Sets**: Starting at ₹1,299 (35% Off)\n• **Premium Glass Tumbler Sets**: Starting at ₹399 (60% Off)\n\nWould you like me to add any of these to your shopping cart?";
      } else if (normalized.includes("straw") || normalized.includes("compare")) {
        reply = "Here is a comparison between Stainless Steel and Glass Straws:\n\n• **Stainless Steel Straws**: Extremely durable, dishwasher safe, plastic-free, and perfect for travel. (e.g. *ANTIL'S Reusable Straws* on sale for **₹349**)\n• **Glass Straws**: Highly aesthetic, transparent (easy to see if clean inside), hypoallergenic, but fragile.\n\nMost customers prefer **Stainless Steel** for durability and safety.";
      } else if (normalized.includes("smartwatch") || normalized.includes("watch")) {
        reply = "I found these top-rated smartwatches under ₹3,000 on Amazon.in:\n\n• **Noise ColorFit Pulse**: Activity tracking, 1.4\" display — **₹1,899**\n• **boAt Wave Call**: Bluetooth calling, HD screen — **₹2,199**\n• **OnePlus Nord Watch Lite**: AMOLED display, heart rate monitor — **₹2,899**\n\nAll of these include free Prime delivery and return options.";
      } else if (normalized.includes("return")) {
        reply = "Amazon's standard return policy allows returns within **10 days of delivery** for most electronics, provided the item is unused, in original packaging, and with all accessories. For defective items, a free replacement is offered. You can manage this under the **Returns & Orders** page.";
      } else {
        reply = `I can help you look up information on "${text}". Here's a tip: you can browse the categories sub-navbar, add products like insulating tumblers directly to your cart, or track your orders in the top navigation. Let me know if you have specific product questions!`;
      }

      setMessages((prev) => [...prev, { sender: "rufus", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isRufusOpen && (
        <div
          onClick={() => setRufusOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] sm:w-[420px] bg-slate-50 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col font-sans border-l border-slate-200 ${
          isRufusOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-[#131921] text-white p-4 flex items-center justify-between border-b border-cyan-500/20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-cyan-900 rounded-full border border-cyan-400">
              <Sparkles size={16} className="text-cyan-300 fill-cyan-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                Rufus <span className="text-[10px] text-cyan-400 font-medium px-1 bg-cyan-900/50 rounded">Beta</span>
              </h3>
              <p className="text-[10px] text-gray-300 leading-none">Your Amazon Shopping Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setRufusOpen(false)}
            className="text-gray-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div
                className={`p-1.5 rounded-full shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#febd69] text-gray-900"
                    : "bg-[#232f3e] text-white border border-cyan-500/30"
                }`}
              >
                {msg.sender === "user" ? <User size={14} /> : <Sparkles size={14} />}
              </div>

              {/* Message bubble */}
              <div
                className={`p-3 rounded-lg shadow-sm text-xs leading-relaxed whitespace-pre-line border ${
                  msg.sender === "user"
                    ? "bg-amber-100 text-gray-900 border-amber-200 rounded-tr-none"
                    : "bg-white text-gray-800 border-slate-200 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
              <div className="p-1.5 bg-[#232f3e] text-white border border-cyan-500/30 rounded-full shrink-0">
                <Sparkles size={14} className="animate-spin" />
              </div>
              <div className="p-3 bg-white text-gray-500 border border-slate-200 rounded-lg rounded-tl-none text-xs flex items-center gap-1.5 italic">
                <RefreshCw size={12} className="animate-spin" />
                Rufus is thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions Panel */}
        {messages.length === 1 && !isTyping && (
          <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 shrink-0">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Try asking:</p>
            <div className="flex flex-col gap-1.5">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="w-full text-left text-xs bg-white hover:bg-amber-50 hover:border-amber-400 border border-slate-200 text-slate-700 py-2 px-3 rounded shadow-sm transition-all cursor-pointer font-medium"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask Rufus a question..."
            className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-full py-2 px-4 text-xs outline-none focus:bg-white focus:border-[#f3a847] transition-all"
          />
          <button
            onClick={() => handleSend(inputValue)}
            className="bg-[#febd69] hover:bg-[#f3a847] text-gray-800 p-2 rounded-full cursor-pointer hover:shadow-md transition-all shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
