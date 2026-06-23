// Rich product catalogue — covers all mock IDs used in search + product pages
// Featured products (feat-*) have full gallery + features + color variants

export const MOCK_PRODUCTS = [
  /* ── ELECTRONICS ── */
  {
    id: "feat-1",
    name: "boAt Airdopes 161 TWS Bluetooth Earbuds with 42H Playtime",
    brand: "boAt", price: 2990, discount_price: 1299, rating: 4.3, reviews_count: 85432,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=60",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=600&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&q=80",
      "https://images.unsplash.com/photo-1631176093617-6a5f3d53e3b1?w=600&q=80",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&q=80",
    ],
    colors: ["Active Black", "Pristine White", "Navy Blue", "Raging Red"],
    features: [
      "42H total playtime — 8H earbuds + 34H with charging case",
      "BEAST™ Mode for 40ms ultra-low gaming latency",
      "13mm dynamic drivers delivering rich, deep bass",
      "IPX4 water and sweat resistant build",
      "Rapid charge: 10 min charge = 75 min playback",
      "Instaconnect for seamless device switching",
    ],
    description: "boAt Airdopes 161 comes equipped with BEAST™ Mode ensuring super-low 40ms latency for gaming. The 13mm drivers deliver immersive audio while the TWS chip ensures seamless connectivity across devices.",
    also_bought: ["feat-2", "feat-3", "feat-5"],
  },
  {
    id: "feat-2",
    name: "Noise ColorFit Ultra 3 AMOLED Smartwatch 1.96\" Display",
    brand: "Noise", price: 4999, discount_price: 1899, rating: 4.1, reviews_count: 65210,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=60",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1617625802912-cde586faf749?w=600&q=80",
    ],
    colors: ["Jet Black", "Rose Gold", "Silver Grey", "Olive Green"],
    features: [
      "1.96\" AMOLED always-on display with 60Hz refresh rate",
      "100+ sports modes including yoga, cricket, and football",
      "24×7 SpO2 and continuous heart rate monitoring",
      "7-day battery life with power saving mode",
      "IP68 water resistant up to 50 metres",
      "Inbuilt GPS for accurate outdoor activity tracking",
    ],
    description: "Noise ColorFit Ultra 3 combines premium AMOLED display technology with advanced health monitoring. Track your fitness with 100+ sports modes, SpO2 monitoring, and up to 7 days battery life.",
    also_bought: ["feat-1", "feat-4", "feat-3"],
  },
  {
    id: "feat-3",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    brand: "Sony", price: 29990, discount_price: 19990, rating: 4.7, reviews_count: 14300,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=60",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80",
    ],
    colors: ["Midnight Black", "Platinum Silver"],
    features: [
      "Industry-leading noise cancellation with 8 microphones + 2 processors",
      "30-hour battery life with 3-min quick charge giving 3 hours",
      "Multipoint connection — pair two Bluetooth devices simultaneously",
      "Speak-to-Chat technology pauses music automatically when you talk",
      "Precise Voice Pickup for crystal-clear calls in any environment",
      "Hi-Res Audio certified with LDAC codec support",
    ],
    description: "Sony WH-1000XM5 headphones set the industry bar for noise cancellation. Featuring Auto NC Optimizer, Precise Voice Pickup Technology, and seamless multipoint Bluetooth connection.",
    also_bought: ["feat-1", "feat-4", "feat-2"],
  },
  {
    id: "feat-4",
    name: "Samsung Galaxy M34 5G Smartphone (6GB RAM/128GB Storage)",
    brand: "Samsung", price: 18999, discount_price: 15999, rating: 4.2, reviews_count: 23456,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=60",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80",
    ],
    colors: ["Midnight Blue", "Waterfall Blue", "Charcoal Black"],
    features: [
      "6.5\" sAMOLED+ FHD+ display with 120Hz smooth refresh",
      "50MP OIS + 8MP ultra-wide + 2MP macro triple rear camera",
      "6000mAh monster battery with 25W fast charging",
      "Exynos 1280 octa-core 5nm flagship-grade processor",
      "128GB internal + expandable up to 1TB microSD",
      "5G connectivity for blazing-fast internet speeds",
    ],
    description: "Samsung Galaxy M34 5G is a powerhouse featuring a 6000mAh battery, 120Hz AMOLED+ display, and 50MP OIS camera — engineered for all-day performance and all-night battery life.",
    also_bought: ["feat-2", "feat-3", "feat-5"],
  },
  {
    id: "feat-5",
    name: "Wildcraft Ultra-Lite 45L Trekking Backpack with Rain Cover",
    brand: "Wildcraft", price: 3499, discount_price: 2199, rating: 4.0, reviews_count: 8750,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=60",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
    ],
    colors: ["Teal", "Midnight Black", "Forest Green", "Burnt Orange"],
    features: [
      "45-litre capacity with internal aluminium frame for support",
      "Ergonomic padded shoulder straps with adjustable hip belt",
      "Dedicated laptop sleeve fits up to 15.6\" display",
      "Water-resistant 500D ripstop nylon outer fabric",
      "Multiple organiser pockets and dual side bottle holders",
      "Removable rain cover included for all-weather protection",
    ],
    description: "Wildcraft Ultra-Lite 45L is built for trekkers and travellers who demand durability without bulk. The ergonomic design with padded straps distributes weight evenly for all-day comfort on the trail.",
    also_bought: ["feat-1", "feat-2", "feat-4"],
  },
  // Basic electronics
  { id: "m1", name: "boAt Airdopes 141 Bluetooth Earbuds with 24H Playtime", brand: "boAt", price: 2490, discount_price: 899, rating: 4.0, reviews_count: 72100, category: "Electronics", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=300&q=60" },
  { id: "m2", name: "Prestige PPCS 3L Svachh Pressure Cooker", brand: "Prestige", price: 2595, discount_price: 1799, rating: 4.2, reviews_count: 12300, category: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=60" },
  { id: "m3", name: "Philips HD9252 Air Fryer 4.1L Digital", brand: "Philips", price: 12995, discount_price: 7999, rating: 4.5, reviews_count: 31200, category: "Kitchen", image: "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?w=300&q=60" },
  { id: "m4", name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones", brand: "Sony", price: 29990, discount_price: 17490, rating: 4.6, reviews_count: 21800, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=60" },
  { id: "m5", name: "Milton Thermosteel Flip Lid Flask 1000ml", brand: "Milton", price: 1299, discount_price: 799, rating: 4.5, reviews_count: 45600, category: "Kitchen", image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=300&q=60" },
  { id: "m6", name: "Lavie Handbag Women's Structured Tote - Tan", brand: "Lavie", price: 3495, discount_price: 1749, rating: 4.1, reviews_count: 7890, category: "Fashion", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=60" },
  { id: "m7", name: "Cello Opalware Dazzle Series Dinner Set 35pcs", brand: "Cello", price: 4499, discount_price: 2799, rating: 4.3, reviews_count: 9870, category: "Kitchen", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&q=60" },
  { id: "m8", name: "Zebronics ZEB-COLT Wireless Optical Mouse", brand: "Zebronics", price: 999, discount_price: 549, rating: 4.0, reviews_count: 23100, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=60" },
  { id: "m9", name: "Fossil Gen 6 Hybrid Smartwatch 44mm Stainless Steel", brand: "Fossil", price: 24995, discount_price: 16995, rating: 4.3, reviews_count: 5420, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=60" },
  { id: "m10", name: "Samsung 43\" Crystal 4K Smart LED TV (2023)", brand: "Samsung", price: 35990, discount_price: 27990, rating: 4.4, reviews_count: 18900, category: "Electronics", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=60" },
  { id: "m11", name: "Apple AirPods Pro (2nd Gen) with MagSafe Charging Case", brand: "Apple", price: 24900, discount_price: 19900, rating: 4.8, reviews_count: 52300, category: "Electronics", image: "https://images.unsplash.com/photo-1588423771073-b8903fead714?w=300&q=60" },
  { id: "m12", name: "Logitech MX Keys S Advanced Wireless Keyboard", brand: "Logitech", price: 7495, discount_price: 5995, rating: 4.6, reviews_count: 8900, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=60" },

  /* ── FASHION ── */
  { id: "f1", name: "Manyavar Men's Silk Blend Kurta Pajama Set", brand: "Manyavar", price: 2999, discount_price: 1899, rating: 4.3, reviews_count: 4560, category: "Fashion", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=60" },
  { id: "f2", name: "W for Woman Anarkali Ethnic Kurti - Blue Floral", brand: "W", price: 1799, discount_price: 1099, rating: 4.2, reviews_count: 8320, category: "Fashion", image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=300&q=60" },
  { id: "f3", name: "Levi's 511 Slim Fit Men's Jeans - Dark Blue", brand: "Levi's", price: 3599, discount_price: 2159, rating: 4.5, reviews_count: 15700, category: "Fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=60" },
  { id: "f4", name: "Nike Air Max 270 Running Shoes - Black/White", brand: "Nike", price: 9995, discount_price: 7497, rating: 4.6, reviews_count: 23400, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=60" },
  { id: "f5", name: "Allen Solly Men's Slim Fit Formal Shirt - White", brand: "Allen Solly", price: 1299, discount_price: 849, rating: 4.1, reviews_count: 6780, category: "Fashion", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&q=60" },
  { id: "f6", name: "Titan Raga Women's Analog Gold Watch", brand: "Titan", price: 4995, discount_price: 3496, rating: 4.4, reviews_count: 3210, category: "Fashion", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=300&q=60" },
  { id: "f7", name: "Baggit Women's Faux Leather Sling Bag - Black", brand: "Baggit", price: 1999, discount_price: 1199, rating: 4.0, reviews_count: 5440, category: "Fashion", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=60" },
  { id: "f8", name: "Fabindia Cotton Printed Saree with Blouse", brand: "Fabindia", price: 3599, discount_price: 2519, rating: 4.3, reviews_count: 2870, category: "Fashion", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=60" },

  /* ── HOME & KITCHEN ── */
  { id: "h1", name: "Bajaj Platini 750W Mixer Grinder 3 Jars", brand: "Bajaj", price: 3995, discount_price: 2699, rating: 4.3, reviews_count: 18900, category: "Kitchen", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&q=60" },
  { id: "h2", name: "Aquaguard Enhance UV+UF Water Purifier 7L", brand: "Aquaguard", price: 14999, discount_price: 10999, rating: 4.4, reviews_count: 9870, category: "Home", image: "https://images.unsplash.com/photo-1624958723474-60efbd4fec1a?w=300&q=60" },
  { id: "h3", name: "Story@Home Microfibre Comforter Double Bed - Blue", brand: "Story@Home", price: 1999, discount_price: 1199, rating: 4.1, reviews_count: 12100, category: "Home", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=60" },
  { id: "h4", name: "Philips Smart LED Bulb 9W B22 3 Pack", brand: "Philips", price: 799, discount_price: 599, rating: 4.5, reviews_count: 34500, category: "Home", image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=60" },
  { id: "h5", name: "Pigeon 1.5L Stainless Steel Pressure Cooker", brand: "Pigeon", price: 1499, discount_price: 999, rating: 4.2, reviews_count: 7800, category: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=60" },
  { id: "h6", name: "Godrej 7kg Fully Automatic Top Load Washing Machine", brand: "Godrej", price: 24999, discount_price: 18999, rating: 4.0, reviews_count: 4560, category: "Home", image: "https://images.unsplash.com/photo-1626806787461-102c1a7f1b2b?w=300&q=60" },
  { id: "h7", name: "Amazon Brand - Solimo 3-Piece Fry Pan Set Non-Stick", brand: "Solimo", price: 2499, discount_price: 1499, rating: 4.3, reviews_count: 22300, category: "Kitchen", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=60" },

  /* ── SPORTS & FITNESS ── */
  { id: "s1", name: "Nivia Storm Football Size 5 - Yellow/Black", brand: "Nivia", price: 1299, discount_price: 849, rating: 4.2, reviews_count: 8900, category: "Sports", image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=300&q=60" },
  { id: "s2", name: "Boldfit Yoga Mat 6mm Non-Slip with Carry Bag", brand: "Boldfit", price: 999, discount_price: 599, rating: 4.4, reviews_count: 31200, category: "Sports", image: "https://images.unsplash.com/photo-1601925228135-d71ce67c3dd3?w=300&q=60" },
  { id: "s3", name: "Kookaburra Pace 41 Tennis Cricket Bat - Short Handle", brand: "Kookaburra", price: 4999, discount_price: 3499, rating: 4.5, reviews_count: 2340, category: "Sports", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&q=60" },
  { id: "s4", name: "Decathlon Domyos Adjustable Dumbbell Set 20kg", brand: "Decathlon", price: 3999, discount_price: 2999, rating: 4.3, reviews_count: 5670, category: "Sports", image: "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=300&q=60" },
  { id: "s5", name: "Adidas Tiro 23 Training Track Pants - Black", brand: "Adidas", price: 2499, discount_price: 1749, rating: 4.1, reviews_count: 7890, category: "Sports", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=300&q=60" },

  /* ── BOOKS ── */
  { id: "b1", name: "Atomic Habits by James Clear (Paperback)", brand: "Random House", price: 699, discount_price: 419, rating: 4.8, reviews_count: 89700, category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=60" },
  { id: "b2", name: "The Psychology of Money by Morgan Housel", brand: "Jaico Publishing", price: 499, discount_price: 299, rating: 4.7, reviews_count: 54300, category: "Books", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=60" },
  { id: "b3", name: "Rich Dad Poor Dad – Robert T. Kiyosaki", brand: "Manjul Publishing", price: 399, discount_price: 249, rating: 4.6, reviews_count: 112000, category: "Books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=60" },
  { id: "b4", name: "Ikigai: The Japanese Secret to a Long Happy Life", brand: "Penguin", price: 350, discount_price: 209, rating: 4.5, reviews_count: 67800, category: "Books", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=60" },

  /* ── BEAUTY & HEALTH ── */
  { id: "bh1", name: "Mamaearth Vitamin C Face Serum 30ml with Turmeric", brand: "Mamaearth", price: 599, discount_price: 449, rating: 4.3, reviews_count: 43200, category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=60" },
  { id: "bh2", name: "Himalaya Herbals Moisturizing Aloe Vera Face Wash 200ml", brand: "Himalaya", price: 199, discount_price: 149, rating: 4.4, reviews_count: 87600, category: "Beauty", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=60" },
  { id: "bh3", name: "Philips BT3221 Trimmer for Men with 20 Length Settings", brand: "Philips", price: 1495, discount_price: 1099, rating: 4.5, reviews_count: 32100, category: "Beauty", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&q=60" },
  { id: "bh4", name: "Lakme Absolute Blur Perfect Makeup Primer 30g", brand: "Lakme", price: 750, discount_price: 525, rating: 4.2, reviews_count: 18900, category: "Beauty", image: "https://images.unsplash.com/photo-1625093854001-e56c0e19f1b1?w=300&q=60" },
  { id: "bh5", name: "Oneplus Nord CE 4 5G (128GB, 8GB RAM)", brand: "OnePlus", price: 24999, discount_price: 19999, rating: 4.3, reviews_count: 12300, category: "Electronics", image: "https://images.unsplash.com/photo-1592950630581-03cb41342cc5?w=300&q=60" },

  /* ── MORE ELECTRONICS ── */
  { id: "e1", name: "JBL Go 3 Portable Bluetooth Speaker Waterproof", brand: "JBL", price: 3499, discount_price: 2399, rating: 4.5, reviews_count: 28900, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=60" },
  { id: "e2", name: "HP 250 G9 Laptop Intel i3 12th Gen 8GB/512GB SSD", brand: "HP", price: 39990, discount_price: 31990, rating: 4.2, reviews_count: 6780, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=60" },
  { id: "e3", name: "Realme Buds Air 5 Pro ANC True Wireless Earbuds", brand: "Realme", price: 3999, discount_price: 2999, rating: 4.2, reviews_count: 18700, category: "Electronics", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=300&q=60" },
  { id: "e4", name: "Mi Smart Band 8 Active Fitness Tracker 1.47\" AMOLED", brand: "Mi", price: 2799, discount_price: 1999, rating: 4.0, reviews_count: 34500, category: "Electronics", image: "https://images.unsplash.com/photo-1617625802912-cde586faf749?w=300&q=60" },
  { id: "e5", name: "Anker 65W USB-C GaN Charger 3-Port Fast Charger", brand: "Anker", price: 2999, discount_price: 2199, rating: 4.6, reviews_count: 12300, category: "Electronics", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=60" },
  { id: "e6", name: "Canon EOS 1500D DSLR Camera 24.1MP with 18-55mm Lens", brand: "Canon", price: 44995, discount_price: 32995, rating: 4.5, reviews_count: 8900, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=60" },
];

export function getProductById(id) {
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}
