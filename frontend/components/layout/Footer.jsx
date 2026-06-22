import Link from "next/link";

const COL1 = ["About Amazon", "Careers", "Press Releases", "Amazon Science"];
const COL2 = ["Facebook", "Twitter", "Instagram", "YouTube"];
const COL3 = [
  "Sell on Amazon", "Sell under Amazon Accelerator", "Protect and Build Your Brand",
  "Amazon Global Selling", "Supply to Amazon", "Become an Affiliate",
  "Fulfilment by Amazon", "Advertise Your Products", "Amazon Pay on Merchants",
];
const COL4 = [
  "Your Account", "Returns Centre", "Recalls and Product Safety Alerts",
  "100% Purchase Protection", "Amazon App Download", "Help",
];
const SUBS = [
  { name: "AbeBooks", sub: "Books, art & collectibles" },
  { name: "Amazon Web Services", sub: "Scalable Cloud Computing Services" },
  { name: "Audible", sub: "Download Audio Books" },
  { name: "IMDb", sub: "Movies, TV & Celebrities" },
  { name: "Shopbop", sub: "Designer Fashion Brands" },
  { name: "Amazon Business", sub: "Everything For Your Business" },
  { name: "Amazon Music", sub: "Stream millions of songs" },
];

export default function Footer() {
  return (
    <footer className="text-white text-xs select-none mt-4">
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-[#37475a] hover:bg-[#485769] text-center py-4 text-sm cursor-pointer transition-colors"
      >
        Back to top
      </div>

      {/* Main columns */}
      <div className="bg-[#232f3e] py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Get to Know Us", links: COL1 },
            { title: "Connect with Us", links: COL2 },
            { title: "Make Money with Us", links: COL3 },
            { title: "Let Us Help You", links: COL4 },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-3">{title}</h4>
              <ul className="space-y-2 text-[#ddd]">
                {links.map((l) => (
                  <li key={l}><a href="#" className="hover:underline">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logo + lang */}
      <div className="bg-[#232f3e] border-t border-[#3a4553] py-6 flex flex-col items-center gap-4">
        <Link href="/" className="text-white font-extrabold text-2xl tracking-tight">
          amazon<span className="text-[#ff9900] text-base">.in</span>
        </Link>
        <div className="flex gap-3">
          <button className="border border-[#555] rounded px-3 py-1.5 flex items-center gap-2 hover:border-white text-xs">
            🌐 English
          </button>
          <button className="border border-[#555] rounded px-3 py-1.5 flex items-center gap-2 hover:border-white text-xs">
            🇮🇳 India
          </button>
        </div>
      </div>

      {/* Subsidiaries */}
      <div className="bg-[#131921] py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {SUBS.map(({ name, sub }) => (
            <a key={name} href="#" className="hover:underline text-[#ddd]">
              <span className="font-semibold block text-[11px]">{name}</span>
              <span className="text-[10px] text-[#999]">{sub}</span>
            </a>
          ))}
        </div>
        <div className="text-center text-[#999] text-[11px] space-y-1">
          <div className="space-x-4">
            <a href="#" className="hover:underline">Conditions of Use &amp; Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <p>© 1996–2026, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}
