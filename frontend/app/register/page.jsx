"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register, login } from "../../services/auth";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      // Register
      await register(form.full_name, form.email, form.password);
      // Auto-login to get token (register endpoint doesn't return a token)
      const data = await login(form.email, form.password);
      localStorage.setItem("token", data.access_token);
      toast.success("Account created! Welcome to Amazon.in");
      router.push("/");
    } catch (err) {
      const msg = err?.response?.data?.detail;
      if (typeof msg === "string") toast.error(msg);
      else if (Array.isArray(msg)) toast.error(msg[0]?.msg || "Registration failed");
      else toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      <Link href="/" className="mb-6">
        <span className="text-3xl font-extrabold text-[#131921] tracking-tight">
          amazon<span className="text-[#ff9900]">.in</span>
        </span>
      </Link>

      <div className="w-full max-w-sm border border-[#d5d9d9] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-medium text-[#0f1111] mb-4">Create account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Your name", key: "full_name", type: "text", placeholder: "First and last name" },
            { label: "Email", key: "email", type: "email", placeholder: "" },
            { label: "Password", key: "password", type: "password", placeholder: "At least 6 characters" },
            { label: "Re-enter password", key: "confirm", type: "password", placeholder: "" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-bold text-[#0f1111] mb-1">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="w-full border border-[#888c8c] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                required
              />
              {key === "password" && (
                <p className="text-xs text-[#565959] mt-1">Passwords must be at least 6 characters.</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full amazon-btn py-2 text-sm font-medium"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        <p className="text-xs text-[#565959] mt-4 leading-relaxed">
          By creating an account, you agree to Amazon's{" "}
          <Link href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</Link>
          {" "}and{" "}
          <Link href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</Link>.
        </p>

        <div className="mt-4 text-sm border-t border-[#ddd] pt-3">
          <span className="text-[#0f1111]">Already have an account? </span>
          <Link href="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">Sign in</Link>
        </div>
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
