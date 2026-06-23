"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import ProductCard from "../../../components/product/ProductCard";
import { getProducts } from "../../../services/products";
import { toast } from "sonner";
import Link from "next/link";

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ category_id: id })
      .then(setProducts)
      .catch(() => toast.error("Could not load products"))
      .finally(() => setLoading(false));
  }, [id]);

  const categoryName = decodeURIComponent(id).replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white px-4 py-2 text-xs text-[#0066c0]">
          <Link href="/" className="hover:underline hover:text-[#c45500]">Home</Link>
          {" › "}
          <span className="text-[#565959] capitalize">{categoryName}</span>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 py-6">
          <h1 className="text-xl font-medium text-[#0f1111] mb-4 capitalize">{categoryName}</h1>

          {loading ? (
            <div className="bg-white p-12 text-center shadow-sm text-[#565959]">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="bg-white p-12 text-center shadow-sm">
              <p className="text-[#565959] mb-4">No products found in this category.</p>
              <Link href="/" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">Back to Home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
