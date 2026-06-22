import Header from "../components/layout/Header";
import HeroBanner from "../components/home/HeroBanner";
import ProductGrid from "../components/home/ProductGrid";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col font-sans">
      {/* Prime branding / Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <HeroBanner />
        <ProductGrid />
      </main>

      {/* Corporate directory / Footer */}
      <Footer />
    </div>
  );
}
