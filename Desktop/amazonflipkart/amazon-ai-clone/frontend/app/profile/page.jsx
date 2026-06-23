"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getMe, logout, isLoggedIn } from "../../services/auth";
import { toast } from "sonner";
import Link from "next/link";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt, FaChevronRight } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }
    getMe().then(setUser).catch(() => toast.error("Could not load profile")).finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    logout();
    toast.success("Signed out");
    router.push("/");
  }

  const MENU_ITEMS = [
    { icon: FaShoppingBag, label: "Your Orders", desc: "Track, return, or buy things again", href: "/orders" },
    { icon: FaHeart, label: "Your Wish List", desc: "Items you've saved for later", href: "/wishlist" },
  ];

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 py-8">
        {loading ? (
          <div className="text-center py-12 text-[#565959]">Loading...</div>
        ) : !user ? (
          <div className="text-center py-12">
            <Link href="/login" className="amazon-btn px-6 py-2 text-sm">Sign in</Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-white shadow-sm p-6 mb-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#232f3e] flex items-center justify-center shrink-0">
                <FaUser size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-[#0f1111]">Hello, {user.full_name || user.email}</h1>
                <p className="text-sm text-[#565959]">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex items-center gap-2 text-sm text-[#0066c0] hover:text-[#c45500] hover:underline"
              >
                <FaSignOutAlt size={14} /> Sign Out
              </button>
            </div>

            {/* Menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MENU_ITEMS.map(({ icon: Icon, label, desc, href }) => (
                <Link key={label} href={href}>
                  <div className="bg-white shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-[#e77600] rounded">
                    <div className="w-12 h-12 bg-[#f0f2f2] rounded flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-[#232f3e]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#0f1111]">{label}</p>
                      <p className="text-xs text-[#565959]">{desc}</p>
                    </div>
                    <FaChevronRight size={14} className="text-[#888]" />
                  </div>
                </Link>
              ))}

              {/* Account info card */}
              <div className="bg-white shadow-sm p-5 sm:col-span-2 rounded">
                <h2 className="font-bold text-[#0f1111] mb-3">Login & Security</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#eee]">
                    <span className="text-[#565959]">Name</span>
                    <span className="text-[#0f1111] font-medium">{user.full_name || "—"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#eee]">
                    <span className="text-[#565959]">Email</span>
                    <span className="text-[#0f1111] font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#565959]">Account created</span>
                    <span className="text-[#0f1111] font-medium">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("en-IN") : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
