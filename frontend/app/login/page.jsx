"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../services/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      toast.success("Signed in successfully");
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <span className="text-3xl font-extrabold text-[#131921] tracking-tight">
          amazon<span className="text-[#ff9900]">.in</span>
        </span>
      </Link>

      <div className="w-full max-w-sm border border-[#d5d9d9] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-medium text-[#0f1111] mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Email or mobile phone number</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#888c8c] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#888c8c] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full amazon-btn py-2 text-sm font-medium"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <p className="text-xs text-[#565959] mt-4">
          By continuing, you agree to Amazon's{" "}
          <Link href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</Link>
          {" "}and{" "}
          <Link href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</Link>.
        </p>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#d5d9d9]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-[#767676]">New to Amazon?</span>
          </div>
        </div>

        <Link href="/register">
          <button className="w-full border border-[#d5d9d9] rounded-lg px-3 py-2 text-sm text-[#0f1111] hover:bg-[#f7f8f8] bg-white font-medium shadow-sm">
            Create your Amazon account
          </button>
        </Link>
      </div>

      <div className="mt-8 text-center space-x-4 text-xs text-[#0066c0]">
        <Link href="#" className="hover:underline hover:text-[#c45500]">Conditions of Use</Link>
        <Link href="#" className="hover:underline hover:text-[#c45500]">Privacy Notice</Link>
        <Link href="#" className="hover:underline hover:text-[#c45500]">Help</Link>
      </div>
      <p className="text-xs text-[#767676] mt-2">© 1996–2026, Amazon.com, Inc. or its affiliates</p>
    </div>
  );
}
