import Header from "../components/layout/Header";
import HeroBanner from "../components/home/HeroBanner";
import ProductGrid from "../components/home/ProductGrid";
import Footer from "../components/layout/Footer";
import RufusDrawer from "../components/layout/RufusDrawer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Toast notifications */}
      <Toaster richColors closeButton />

      {/* Dual Header Navigation */}
      <Header />
      
      {/* Main Body */}
      <main className="flex-grow">
        <HeroBanner />
        <ProductGrid />
      </main>

      {/* Rufus AI chat drawer overlay */}
      <RufusDrawer />

      {/* Corporate Footer Directory */}
      <Footer />
    </div>
  );
}
