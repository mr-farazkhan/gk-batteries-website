/* ===== GK BATTERIES — SITE DATA (Edit this file to update website content) ===== */

const SITE_DATA = {
  // ─── SHOP PROFILE ───
  profile: {
    name: "GK Batteries",
    tagline: "Your Trusted Power Partner in Alnavar",
    description: "Multi-brand battery & inverter dealer in Alnavar with 50+ years of expertise. From handcrafting hard-rubber (HR) batteries to becoming Alnavar's most trusted authorized dealer for Exide, Amaron, SF, Yokohama & Dynex — we've powered this community since 1994.",
    phone: "+919448667528",
    phoneDisplay: "94486 67528",
    email: "",
    sinceYear: 1994,
    googleReviewLink: "https://g.page/r/CRpn7PDqpJobEBM/review",
    socialLinks: {
      facebook: "",
      instagram: "https://www.instagram.com/gk_batteries",
    },
    seo: {
      title: "GK Batteries Alnavar — Car, Inverter & Tractor Battery Dealer | Jump Start 24/7",
      description: "GK Batteries Alnavar — authorized Exide, Amaron, SF, Yokohama & Dynex dealer. Car, bike, SUV, tractor, truck, e-rickshaw & inverter batteries, old battery exchange, rental battery, jump start on NH-67. Two branches in Alnavar. Call 94486 67528.",
      keywords: [
        "car battery shop Alnavar",
        "car battery Alnavar",
        "inverter battery Alnavar",
        "inverter battery Dharwad",
        "tubular battery Dharwad",
        "bike battery Alnavar",
        "tractor battery Dharwad",
        "truck battery Dharwad",
        "e-rickshaw battery Dharwad",
        "battery shop near me Alnavar",
        "battery shop Londa",
        "battery shop Belgaum",
        "Exide battery dealer Alnavar",
        "Amaron battery Alnavar",
        "jump start service NH 67",
        "battery exchange Alnavar",
        "battery rental Alnavar",
        "home inverter battery installation Alnavar",
        "GK Batteries Alnavar",
        "Gous Khan GK Batteries"
      ]
    }
  },

  // ─── ANALYTICS ───
  // 1. Paste your Google Analytics 4 Measurement ID here (Analytics → Admin → Data Streams).
  //    Format: "G-XXXXXXXXXX". Leave empty to keep GA4 off.
  // 2. Vercel Web Analytics: click "Enable" in the Vercel dashboard → Analytics, then deploy.
  //    The script path is auto-added by Vercel at /_vercel/insights/script.js
  // 3. Region data: see ANALYTICS.md for the step-by-step guide.
  analytics: {
    gaId: "",                                  // ← paste your GA4 ID, e.g. "G-XXXXXXXXXX"
    vercelPath: "/_vercel/insights/script.js", // Vercel Web Analytics script
    vercelAlwaysOn: true,                      // cookie-free Vercel analytics loads even before consent
    consentExpiryDays: 180                     // re-ask for consent after this many days
  },

  // ─── STATS (shown in hero) ───
  stats: [
    { value: "50+", label: "Years Experience" },
    { value: "5", label: "Brands Authorized" },
    { value: "4.9", label: "Google Rating" },
    { value: "2", label: "Branches" }
  ],

  // ─── TICKER MESSAGES ───
  ticker: [
    "Jump Start Service Available 24/7",
    "New Battery Stock Arrived — All Brands",
    "Call 94486 67528 for Instant Price",
    "Old Battery Exchange — Best Rates",
    "Rental Batteries for Functions & Emergencies",
    "Agri Sprayer Pump Battery Service"
  ],

  // ─── HERO BADGES ───
  badges: [
    { icon: "shield-check", text: "Authorized Dealer" },
    { icon: "truck", text: "Doorstep Delivery" },
    { icon: "clock", text: "Since 1994" },
    { icon: "repeat", text: "Old Battery Exchange" }
  ],

  // ─── BRANDS ───
  brands: ["EXIDE", "AMARON", "SF BATTERIES", "YOKOHAMA", "DYNEX"],

  // ─── ABOUT / OWNER JOURNEY ───  // ⚠ FACT CHECK BEFORE PUBLISHING — edit the values below (all in ONE place):
  //   1. FOUNDING YEAR  → profile.sinceYear is 1994, but "50+ years" implies ~1976.
  //      social_media.txt says "since 2011". Pick one and make the whole site match.
  //   2. milestone[0].years  → year hard-rubber (HR) battery making began.
  //   3. milestone[1].years  → year of the material shift (HR → poly/lead-acid/tubular).
  //   4. milestone[2].years  → year the authorized-retail stage began.
  //   5. OWNER NAME SPELLING → "Gous Khan" (or "Gaus Khan"?) and the era captions below.
  about: {
    eyebrow: "Our Story",
    owner: {
      name: "Gous Khan",
      role: "Founder & Owner",
      icon: "user-round"
    },
    headline: "From Handcrafted HR Batteries to Alnavar's Trusted Multi-Brand Dealer",
    lead: "Fifty-plus years ago, Gous Khan built batteries by hand in a small Alnavar workshop. Today GK Batteries is an authorized multi-brand dealer with two branches — and the same promise: honest batteries, fair exchange rates, and a phone that always gets answered.",
    story: [
      "It began with hard rubber. In the early days, Gous Khan made hard-rubber (HR) batteries the hard way — plates, cells and casings assembled by hand, cured and tested on the bench, one battery at a time. There were no brands to order from and no dealer network to fall back on. There was workmanship, and the local word-of-mouth that followed it.",
      "As the industry moved, so did he. Hard rubber gave way to new materials — poly-cased shells, better lead-acid paste chemistry, tubular plates and, later, maintenance-free VRLA and tall tubular inverter batteries. Re-tooling the workshop was hard work, but it kept GK ahead of the change instead of watching customers drive to the next town for a battery they could have bought at home.",
      "The third shift was the biggest: from making batteries to selling them. GK Batteries became an authorized retail dealer for Exide, Amaron, SF, Yokohama and Dynex — real stock, fair old-battery exchange rates, delivery and installation, and a service record built on picking up the phone. Two branches later, one at Goa Cross on NH-67 for highway emergencies and one on Azad Road for local sales, service and setup. The hands at the counter have changed. The promise hasn't."
    ],
    milestones: [
      {
        era: "The Workshop Years",
        years: "1970s",
        icon: "hammer",
        title: "Handcrafted Hard-Rubber (HR) Batteries",
        text: "Gous Khan starts a one-man workshop in Alnavar and hand-builds hard-rubber (HR) batteries — plate work, cell assembly and casing done by hand, one unit at a time, for two-wheelers, jeeps and tractors."
      },
      {
        era: "The Material Shift",
        years: "1980s",
        icon: "layers",
        title: "Hard Rubber Out, Modern Chemistry In",
        text: "The industry changes materials — from hard-rubber casings to poly-cased shells, improved lead-acid chemistry, and later tubular and maintenance-free VRLA technology. GK re-tools the workshop and masters the new build so customers never travel further for a reliable battery."
      },
      {
        era: "Into Authorized Retail",
        years: "1990s",
        icon: "badge-check",
        title: "From Workshop to Authorized Battery Dealer",
        text: "The call to make batteries gives way to the call to sell them honestly. GK becomes an authorized dealer for leading brands, adds genuine stock, fair old-battery exchange, delivery and installation — and a service record built on answering the phone."
      },
      {
        era: "Two Branches Today",
        years: "Today",
        icon: "map-pin",
        title: "Goa Cross, Azad Road, One Mission",
        text: "Goa Cross on NH-67 keeps highway travellers running with jump starts and instant swaps. Azad Road is the full-service hub for battery sales, inverter setup, charging, agri sprayer pump batteries and rentals. Over 50 years in, the shop is still owner-led and the phone is still answered."
      }
    ],
    legacy: [
      { value: "50+", label: "Years in Batteries" },
      { value: "5", label: "Authorized Brands" },
      { value: "2", label: "Branches in Alnavar" },
      { value: "20", label: "km Free Delivery" }
    ],
    values: [
      { icon: "handshake", title: "Straight Exchange", text: "Old batteries valued at fair rates, quoted before we touch them. No pressure tactics, no shortcuts." },
      { icon: "tractor", title: "On-Field Service", text: "Tractor, e-rickshaw and agri sprayer pump batteries delivered and installed at your farm or doorstep." },
      { icon: "users", title: "Owner-Led, Family Run", text: "Owner-led since day one. The person who built the batteries is still the one who picks up the phone." }
    ]
  },

  // ─── SERVICES ───
  services: [
    {
      icon: "zap",
      iconColor: "red",
      title: "Jump Start Service",
      description: "Battery dead on the highway? Call us for instant jump start service on NH-67 Alnavar–Goa and Londa routes. Quick response, any vehicle.",
      branch: "highway",
      branchLabel: "Highway Branch"
    },
    {
      icon: "battery-charging",
      iconColor: "amber",
      title: "Battery Rental",
      description: "Short-term rental batteries for weddings, functions, events & emergencies. Inverter battery rental available with delivery and pickup.",
      branch: "both",
      branchLabel: "Both Branches"
    },
    {
      icon: "plug-zap",
      iconColor: "green",
      title: "Battery Charging",
      description: "Professional battery charging service for all types — car, tractor, inverter. Slow charge and fast charge options with health check.",
      branch: "local",
      branchLabel: "Azad Road Branch"
    },
    {
      icon: "sprout",
      iconColor: "blue",
      title: "Agri Sprayer Pump Battery",
      description: "Electric agricultural sprayer pump battery sales, repair & replacement. Keep your farm sprayers running through every season.",
      branch: "local",
      branchLabel: "Azad Road Branch"
    },
    {
      icon: "tractor",
      iconColor: "amber",
      title: "On-Field Tractor Installation",
      description: "We deliver and install heavy-duty batteries right at your farm. Mahindra, John Deere, Eicher — all covered. No need to bring the tractor.",
      branch: "both",
      branchLabel: "Both Branches"
    },
    {
      icon: "home",
      iconColor: "blue",
      title: "Inverter Sales & Setup",
      description: "Complete home inverter sales, installation, wiring & annual maintenance. Exide, Amaron — sizing, setup & water top-ups included.",
      branch: "local",
      branchLabel: "Azad Road Branch"
    },
    {
      icon: "wrench",
      iconColor: "green",
      title: "Battery Repair & Service",
      description: "Battery health check, terminal cleaning, water topping, and repair for all brands. Walk in or call for doorstep service.",
      branch: "both",
      branchLabel: "Both Branches"
    },
    {
      icon: "truck",
      iconColor: "red",
      title: "Doorstep Delivery",
      description: "Free delivery and installation within 20 km — Alnavar, Londa, Ramapur, Kakkeri, Mugad, Tamboor & surrounding villages.",
      branch: "both",
      branchLabel: "Both Branches"
    }
  ],

  // ─── PRODUCTS ───
  products: [
    // --- BIKE / TWO-WHEELER ---
    {
      category: "auto",
      image: "images/products/exide-bike.png",
      title: "Exide Xplore Bike Battery",
      brand: "exide",
      brandLabel: "EXIDE · 2.5Ah – 9Ah",
      badge: "",
      badgeType: "",
      features: ["18 Months Warranty", "Fits Activa, Splendor, Pulsar, Jupiter", "Sealed maintenance-free (VRLA)"],
    },
    {
      category: "auto",
      image: "images/products/amaron-bike.png",
      title: "Amaron Pro Rider Bike Battery",
      brand: "amaron",
      brandLabel: "AMARON · 2.5Ah – 9Ah",
      badge: "",
      badgeType: "",
      features: ["24 Months Warranty", "Zero-maintenance, factory-charged", "Fits all popular Indian 2-wheelers"],
    },
    // --- CAR / SEDAN ---
    {
      category: "auto",
      image: "images/products/exide-car.png",
      title: "Exide Mileage Car Battery",
      brand: "exide",
      brandLabel: "EXIDE · 35Ah – 65Ah",
      badge: "Best Seller",
      badgeType: "popular",
      features: ["36 Months Warranty", "Fits Maruti, Hyundai, Toyota, Honda", "Maintenance-free option available"],
    },
    {
      category: "auto",
      image: "images/products/amaron-car.png",
      title: "Amaron Go Car Battery",
      brand: "amaron",
      brandLabel: "AMARON · 35Ah – 80Ah",
      badge: "",
      badgeType: "",
      features: ["40 Months Warranty", "Zero-maintenance, factory-charged", "Silver alloy technology for longer life"],
    },
    {
      category: "auto",
      image: "images/products/yokohama-car.png",
      title: "Yokohama MF Car Battery",
      brand: "yokohama",
      brandLabel: "YOKOHAMA · 35Ah – 75Ah",
      badge: "Value Pick",
      badgeType: "exchange",
      features: ["30 Months Warranty", "Japanese technology, Indian price", "Fits all popular car models"],
    },
    // --- SUV / MUV ---
    {
      category: "auto",
      image: "images/products/exide-suv.png",
      title: "Exide Matrix SUV Battery",
      brand: "exide",
      brandLabel: "EXIDE · 65Ah – 100Ah",
      badge: "",
      badgeType: "",
      features: ["42 Months Warranty", "Fits Scorpio, Innova, XUV, Fortuner", "High cranking power for diesel engines"],
    },
    {
      category: "auto",
      image: "images/products/amaron-suv.png",
      title: "Amaron Fresh SUV Battery",
      brand: "amaron",
      brandLabel: "AMARON · 65Ah – 105Ah",
      badge: "",
      badgeType: "",
      features: ["48 Months Warranty", "BIC technology for extreme heat", "Fits all popular SUV/MUV models"],
    },
    // --- TRACTOR / COMMERCIAL ---
    {
      category: "tractor",
      image: "images/products/exide-tractor.png",
      title: "Exide Heavy Vehicle / Tractor Battery",
      brand: "exide",
      brandLabel: "EXIDE · 100Ah – 180Ah",
      badge: "Heavy Duty",
      badgeType: "exchange",
      features: ["36 Months Warranty", "Mahindra, Swaraj, Eicher, TAFE", "Extra vibration resistance for rough terrain"],
    },
    {
      category: "tractor",
      image: "images/products/amaron-tractor.png",
      title: "Amaron Hi-Way Tractor Battery",
      brand: "amaron",
      brandLabel: "AMARON · 100Ah – 200Ah",
      badge: "",
      badgeType: "",
      features: ["48 Months Warranty", "John Deere, Mahindra, Eicher", "On-field installation available"],
    },
    // --- TRUCK ---
    {
      category: "tractor",
      image: "images/products/dynex-truck.png",
      title: "Dynex Truck & Heavy Vehicle Battery",
      brand: "dynex",
      brandLabel: "DYNEX · 130Ah – 200Ah",
      badge: "Commercial",
      badgeType: "exchange",
      features: ["30 Months Warranty", "Tata, Ashok Leyland, BharatBenz", "High reserve capacity for long hauls"],
    },
    // --- E-RICKSHAW ---
    {
      category: "tractor",
      image: "images/products/exide-erickshaw.png",
      title: "Exide E-Rickshaw Battery",
      brand: "exide",
      brandLabel: "EXIDE · 100Ah – 130Ah Tubular",
      badge: "",
      badgeType: "",
      features: ["36 Months Warranty", "Deep-cycle tubular design", "High charge acceptance for daily use"],
    },
    // --- INVERTER ---
    {
      category: "inverter",
      image: "images/products/exide-inverter.png",
      title: "Exide Inva Master Inverter Battery",
      brand: "exide",
      brandLabel: "EXIDE · 100Ah – 200Ah Tubular",
      badge: "Popular",
      badgeType: "popular",
      features: ["48 Months Warranty", "Long backup — fans, lights, TV", "Free installation in Alnavar"],
    },
    {
      category: "inverter",
      image: "images/products/amaron-inverter.png",
      title: "Amaron Current Inverter Battery",
      brand: "amaron",
      brandLabel: "AMARON · 135Ah – 200Ah Tall Tubular",
      badge: "",
      badgeType: "",
      features: ["48 Months Warranty", "Patented Silica Gel technology", "Top-up intervals up to 18 months"],
    },
    {
      category: "inverter",
      image: "images/products/dynex-inverter.png",
      title: "Dynex Tall Tubular Inverter Battery",
      brand: "dynex",
      brandLabel: "DYNEX · 150Ah – 220Ah Tubular",
      badge: "Budget Pick",
      badgeType: "exchange",
      features: ["36 Months Warranty", "Affordable tall tubular option", "Consistent backup performance"],
    }
  ],

  // ─── WHY CHOOSE US ───
  advantages: [
    { icon: "shield-check", title: "Authorized Dealer", text: "Official dealer for Exide, Amaron, SF & Yokohama" },
    { icon: "clock", title: "Since 1994", text: "50+ years of battery expertise in Alnavar" },
    { icon: "repeat", title: "Best Exchange", text: "Top rates for old battery exchange" },
    { icon: "truck", title: "Free Delivery", text: "Doorstep delivery within 20 km radius" },
    { icon: "award", title: "Legacy of Quality", text: "From handcrafting HR batteries to multi-brand dealer" },
    { icon: "map-pin", title: "2 Branches", text: "Highway + local — always accessible" }
  ],

  // ─── SERVICE AREA (local SEO — towns we deliver & service) ───
  serviceArea: {
    title: "We Deliver & Service Batteries Across the Alnavar–Belgaum–Goa Belt",
    intro: "From our Alnavar branches we deliver, install and jump-start batteries across Dharwad district and the NH-67 corridor. Free delivery and installation within 20 km; other towns on order.",
    items: [
      { name: "Alnavar", distance: "0 km", note: "Both branches — Goa Cross (NH-67) & Azad Road", tag: "hub" },
      { name: "Ramapur", distance: "5 km", note: "Free doorstep delivery & installation", tag: "free" },
      { name: "Mugad", distance: "7 km", note: "Free doorstep delivery & installation", tag: "free" },
      { name: "Kakkeri", distance: "9 km", note: "Free doorstep delivery & installation", tag: "free" },
      { name: "Tamboor", distance: "11 km", note: "Free doorstep delivery & installation", tag: "free" },
      { name: "Londa", distance: "14 km", note: "NH-67 highway route — jump start & instant swap", tag: "free" },
      { name: "Khanapur", distance: "18 km", note: "Free doorstep delivery & installation", tag: "free" },
      { name: "Bailhongal", distance: "25 km", note: "Delivery on order, same-day on request", tag: "order" },
      { name: "Dharwad", distance: "30 km", note: "Delivery on order — car & inverter batteries", tag: "order" },
      { name: "Hubli", distance: "42 km", note: "Delivery on order — commercial & inverter", tag: "order" },
      { name: "Belgaum (Belagavi)", distance: "42 km", note: "Delivery on order — bulk & dealer rates", tag: "order" },
      { name: "Gadag", distance: "65 km", note: "Delivery on order", tag: "order" },
      { name: "Goa — Ponda, Panaji, Vasco", distance: "78 km", note: "Delivery on order — highway jump start en route", tag: "order" },
      { name: "Kolhapur", distance: "145 km", note: "Delivery on order for bulk & dealer enquiries", tag: "order" }
    ]
  },

  // ─── FAQ (AEO — answer-first questions for Google & AI answers) ───
  faq: {
    title: "Battery Questions, Answered",
    intro: "Straight answers about batteries, prices, delivery and service in Alnavar.",
    items: [
      {
        q: "Which is the best battery shop in Alnavar for car batteries?",
        a: "GK Batteries is an authorized multi-brand battery dealer with two branches in Alnavar — the highway branch at NH-67, Goa Cross and the local hub on Azad Road. We stock Exide, Amaron, SF, Yokohama and Dynex batteries for two-wheelers, cars, SUVs, tractors, trucks and e-rickshaws, with free doorstep installation within 20 km and old-battery exchange at fair rates. Call 94486 67528 for the best price."
      },
      {
        q: "How much does a car battery cost in Alnavar?",
        a: "A new car battery in Alnavar usually runs from about ₹4,500 for a 35Ah maintenance-free unit up to ₹16,000 for a 100Ah tubular or SUV battery, depending on brand, capacity and warranty. The final price also depends on your vehicle and the old battery you exchange. Call 94486 67528 for an exact same-day quote — we quote before we deliver."
      },
      {
        q: "Do you sell inverter batteries for home backup in Alnavar?",
        a: "Yes. We stock tubular and maintenance-free inverter batteries from 100Ah to 220Ah (Exide Inva Master, Amaron Current, Dynex and SF) for homes, shops and offices. We size the battery to your load, deliver it, install the terminals, do the wiring and set up a water-top-up schedule. Installation is free in Alnavar."
      },
      {
        q: "Which inverter battery is best for a 2 BHK home in Alnavar?",
        a: "For a typical 2 BHK running fans, lights, TV and a few appliances, a 150–180Ah tall tubular battery gives roughly 3 to 5 hours of backup, while 200Ah or more suits longer outages or heavier loads. In Alnavar, where outages are common, we usually recommend a tall tubular over a maintenance-free unit because it lasts longer. Send us your load and we will size it free of charge."
      },
      {
        q: "Do you provide jump start service on NH-67?",
        a: "Yes — our Goa Cross branch sits on NH-67 for exactly this reason. A dead battery on the highway between Alnavar, Londa and Goa is a quick job for us. Call 94486 67528 and we will reach you with a jump pack and a replacement battery, day or night, for cars, bikes and commercial vehicles."
      },
      {
        q: "Do you deliver batteries to Londa, Ramapur, Kakkeri and nearby villages?",
        a: "Yes. We deliver and install free within a 20 km radius of Alnavar, which covers Londa, Ramapur, Kakkeri, Mugad, Tamboor and Khanapur. For Dharwad, Hubli, Belgaum, Gadag and the Goa belt, delivery is available on order. Call us with your location and we will confirm the timing."
      },
      {
        q: "Do you accept old batteries in exchange?",
        a: "Yes, and we quote the exchange value before we remove anything. The value depends on the battery's age, brand and condition, and it is applied as a discount against your new purchase. We accept old car, bike, tractor, inverter and e-rickshaw batteries."
      },
      {
        q: "What is the difference between a hard-rubber battery and a modern battery?",
        a: "Hard-rubber (HR) batteries used a rubber casing with hard-rubber separators — they were heavy, needed frequent water top-ups and had a shorter life. Modern batteries use poly-cased bodies, improved lead-acid chemistry, tubular or maintenance-free plates (VRLA) and last far longer with almost no maintenance. GK Batteries began by hand-building HR batteries more than 50 years ago and moved with the material shift to modern chemistry."
      },
      {
        q: "How long does a car battery last?",
        a: "A good car battery lasts 3 to 5 years in Indian heat, 2 to 3 years for a two-wheeler, and 4 to 6 years for a tubular inverter battery that gets regular water top-ups. If your car struggles to start, the lights dim at idle, or the battery is over three years old, get a free health check at either branch."
      },
      {
        q: "Do you repair and charge batteries, or only sell new ones?",
        a: "Both. We run battery health checks, terminal cleaning, water top-ups, slow and fast charging and re-conditioning of old batteries at the Azad Road branch. We also rent batteries for weddings, functions and emergencies, and service agri sprayer pump and e-rickshaw batteries."
      },
      {
        q: "Do you sell tractor, truck and e-rickshaw batteries?",
        a: "Yes. We stock 100Ah to 200Ah heavy-duty batteries for Mahindra, Swaraj, John Deere, Eicher and TAFE tractors, 130Ah to 200Ah for trucks and commercial vehicles, and deep-cycle tubular batteries for e-rickshaws. For tractors we deliver and install at your farm — you do not need to bring the vehicle in."
      },
      {
        q: "What are your timings, address and branch locations?",
        a: "GK Batteries is open Monday to Sunday, 7:00 AM to 7:00 PM, at two branches in Alnavar, Dharwad District, Karnataka 581103 — the highway branch at NH-67, Goa Cross, and the local hub on Azad Road. Call 94486 67528 for directions or an immediate price."
      }
    ]
  },

  // ─── TRUST / GUARANTEE STRIP ───
  trust: [
    { icon: "badge-check", title: "100% Genuine", text: "Authorised Exide, Amaron, SF, Yokohama & Dynex stock with brand warranty" },
    { icon: "repeat", title: "Fair Exchange", text: "Old battery value quoted before removal, applied as instant discount" },
    { icon: "truck", title: "Free Delivery", text: "Delivery and installation free within 20 km of Alnavar" },
    { icon: "wrench", title: "Free Health Check", text: "Battery testing, terminal cleaning and water top-up at no charge" }
  ],

  // ─── CUSTOMER REVIEWS (swap in real quotes — placeholder samples) ───
  // ⚠ Replace with genuine Google reviews before publishing.
  reviews: [
    { name: "Prakash K.", location: "Alnavar", rating: 5, text: "Stranded on NH-67 with a dead battery at 9 PM. They reached me in 20 minutes with a jump start and installed a new Exide the same night. Genuinely saved my trip." },
    { name: "Shivanand P.", location: "Ramapur", rating: 5, text: "Bought an Amaron inverter battery for my shop. They came to the shop, did the wiring, explained the water top-up schedule and did not charge extra for installation. Very honest dealing." },
    { name: "Anita M.", location: "Londa", rating: 5, text: "We use their service every season for our sprayer pump batteries. They deliver to the farm and the price is exactly what was quoted on the phone. Rare these days." },
    { name: "Ravi Kulkarni", location: "Alnavar", rating: 5, text: "Third generation running my tractor on their batteries since my father's time. Exchange rate was fair and the old battery was valued properly in front of me." }
  ],

  // ─── LOCATIONS ───
  locations: [
    {
      name: "Branch 1 — Goa Cross",
      tag: "highway",
      tagLabel: "Highway Service",
      tagIcon: "zap",
      address: "NH 67, Goa Cross, Alnavar, Dharwad District — 581103",
      hours: "Mon–Sun: 7:00 AM – 7:00 PM",
      phone: "+91 94486 67528",
      phoneLink: "+919448667528",
      highlight: "Specializes in highway battery replacement, jump start service, emergency roadside assistance & quick car/bike battery swaps for travelers.",
      highlightIcon: "car",
      mapLink: "https://maps.google.com/?cid=1989083514408822554",
      mapEmbed: "https://maps.google.com/maps?cid=1989083514408822554&output=embed"
    },
    {
      name: "Branch 2 — Azad Road",
      tag: "local",
      tagLabel: "Local Hub",
      tagIcon: "store",
      address: "Azad Road, Alnavar Town, Dharwad District — 581103",
      hours: "Mon–Sun: 7:00 AM – 7:00 PM",
      phone: "+91 94486 67528",
      phoneLink: "+919448667528",
      highlight: "Full-service hub — all battery sales, inverter installation, charging, agri sprayer pump service, rental batteries, repair & annual maintenance.",
      highlightIcon: "wrench",
      mapLink: "https://maps.google.com/maps?q=GK+Battery,+Azad+Road,+Alnavar,+Karnataka",
      mapEmbed: "https://maps.google.com/maps?q=GK+Battery,+Azad+Road,+Alnavar,+Karnataka&output=embed"
    }
  ]
};

// Expose to other scripts (analytics.js) and the browser console.
window.SITE_DATA = SITE_DATA;
