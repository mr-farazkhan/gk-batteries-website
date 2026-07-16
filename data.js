/* ===== GK BATTERIES — SITE DATA (Edit this file to update website content) ===== */

const SITE_DATA = {

  // ─── SHOP PROFILE ───
  profile: {
    name: "GK Batteries",
    tagline: "Your Trusted Power Partner in Alnavar",
    description: "Authorized multi-brand battery & inverter dealer. From highway jump starts to home inverter setups, farm tractor batteries to emergency rentals — we keep Alnavar powered. Since 2011.",
    phone: "+919448667528",
    phoneDisplay: "94486 67528",
    whatsapp: "919448667528",
    whatsappMessage: "Hi, I need battery enquiry",
    email: "",
    sinceYear: 2011,
    googleReviewLink: "https://g.page/r/CRpn7PDqpJobEBM/review",
    socialLinks: {
      facebook: "",
      instagram: "",
    },
    seo: {
      title: "GK Batteries Alnavar — Multi-Brand Battery & Inverter Dealer | Jump Start | Rental",
      description: "GK Batteries Alnavar — Exide, Amaron, SF & Luminous dealer. Car, tractor, bike, inverter batteries. Jump start, rental battery, agri sprayer pump service. Two branches in Alnavar."
    }
  },

  // ─── STATS (shown in hero) ───
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "5000+", label: "Batteries Sold" },
    { value: "4.9★", label: "Google Rating" },
    { value: "2", label: "Branches" }
  ],

  // ─── TICKER MESSAGES ───
  ticker: [
    "⚡ Jump Start Service Available 24/7",
    "🔋 New Battery Stock Arrived — All Brands",
    "📞 Call 94486 67528 for Instant Price",
    "🔄 Old Battery Exchange — Best Rates",
    "🏠 Rental Batteries for Functions & Emergencies",
    "🌾 Agri Sprayer Pump Battery Service"
  ],

  // ─── HERO BADGES ───
  badges: [
    { icon: "shield-check", text: "Authorized Dealer" },
    { icon: "truck", text: "Doorstep Delivery" },
    { icon: "clock", text: "Since 2011" },
    { icon: "repeat", text: "Old Battery Exchange" }
  ],

  // ─── BRANDS ───
  brands: ["EXIDE", "AMARON", "SF BATTERIES", "LUMINOUS"],

  // ─── SERVICES ───
  services: [
    {
      icon: "zap",
      iconColor: "red",
      title: "Jump Start Service",
      description: "Battery dead on the highway? Call us for instant jump start service on NH-67 Alnavar–Goa and Londa routes. Quick response, any vehicle.",
      branch: "highway",
      branchLabel: "⚡ Highway Branch"
    },
    {
      icon: "battery-charging",
      iconColor: "amber",
      title: "Battery Rental",
      description: "Short-term rental batteries for weddings, functions, events & emergencies. Inverter battery rental available with delivery and pickup.",
      branch: "both",
      branchLabel: "✓ Both Branches"
    },
    {
      icon: "plug-zap",
      iconColor: "green",
      title: "Battery Charging",
      description: "Professional battery charging service for all types — car, tractor, inverter. Slow charge and fast charge options with health check.",
      branch: "local",
      branchLabel: "🏪 Azad Road Branch"
    },
    {
      icon: "sprout",
      iconColor: "blue",
      title: "Agri Sprayer Pump Battery",
      description: "Electric agricultural sprayer pump battery sales, repair & replacement. Keep your farm sprayers running through every season.",
      branch: "local",
      branchLabel: "🏪 Azad Road Branch"
    },
    {
      icon: "tractor",
      iconColor: "amber",
      title: "On-Field Tractor Installation",
      description: "We deliver and install heavy-duty batteries right at your farm. Mahindra, John Deere, Eicher — all covered. No need to bring the tractor.",
      branch: "both",
      branchLabel: "✓ Both Branches"
    },
    {
      icon: "home",
      iconColor: "blue",
      title: "Inverter Sales & Setup",
      description: "Complete home inverter sales, installation, wiring & annual maintenance. Luminous, Exide — sizing, setup & water top-ups included.",
      branch: "local",
      branchLabel: "🏪 Azad Road Branch"
    },
    {
      icon: "wrench",
      iconColor: "green",
      title: "Battery Repair & Service",
      description: "Battery health check, terminal cleaning, water topping, and repair for all brands. Walk in or call for doorstep service.",
      branch: "both",
      branchLabel: "✓ Both Branches"
    },
    {
      icon: "truck",
      iconColor: "red",
      title: "Doorstep Delivery",
      description: "Free delivery and installation within 20 km — Alnavar, Londa, Ramapur, Kakkeri, Mugad, Tamboor & surrounding villages.",
      branch: "both",
      branchLabel: "✓ Both Branches"
    }
  ],

  // ─── PRODUCTS ───
  products: [
    {
      category: "auto",
      image: "images/car-battery.png",
      title: "Exide Mileage Car Battery",
      brand: "exide",
      brandLabel: "EXIDE · 35Ah – 65Ah",
      badge: "Best Seller",
      badgeType: "popular",
      features: ["36 Months Warranty", "Fits Maruti, Hyundai, Toyota", "Maintenance-free option"],
      whatsappText: "Hi, price for Exide Mileage Car Battery"
    },
    {
      category: "auto",
      image: "images/car-battery.png",
      title: "Amaron Go Car Battery",
      brand: "amaron",
      brandLabel: "AMARON · 35Ah – 80Ah",
      badge: "",
      badgeType: "",
      features: ["40 Months Warranty", "Zero-maintenance, factory-charged", "Silver alloy technology"],
      whatsappText: "Hi, price for Amaron Go Car Battery"
    },
    {
      category: "auto",
      image: "images/bike-battery.png",
      title: "Exide Xplore Bike Battery",
      brand: "exide",
      brandLabel: "EXIDE · 2.5Ah – 9Ah",
      badge: "",
      badgeType: "",
      features: ["18 Months Warranty", "Fits Activa, Splendor, Pulsar", "Sealed maintenance-free"],
      whatsappText: "Hi, price for Exide Bike Battery"
    },
    {
      category: "tractor",
      image: "images/tractor-battery-prod.png",
      title: "Amaron Hi-Way Tractor Battery",
      brand: "amaron",
      brandLabel: "AMARON · 100Ah – 200Ah",
      badge: "Heavy Duty",
      badgeType: "exchange",
      features: ["48 Months Warranty", "Mahindra, John Deere, Eicher", "On-field installation available"],
      whatsappText: "Hi, price for Amaron Tractor Battery"
    },
    {
      category: "tractor",
      image: "images/tractor-battery-prod.png",
      title: "Exide Heavy Vehicle Battery",
      brand: "exide",
      brandLabel: "EXIDE · 100Ah – 180Ah",
      badge: "",
      badgeType: "",
      features: ["36 Months Warranty", "Trucks, tempos, commercial", "Extra vibration resistance"],
      whatsappText: "Hi, price for Exide Heavy Vehicle Battery"
    },
    {
      category: "inverter",
      image: "images/inverter-battery.png",
      title: "Luminous 150Ah Inverter Battery",
      brand: "luminous",
      brandLabel: "LUMINOUS · Tall Tubular",
      badge: "Popular",
      badgeType: "popular",
      features: ["48 Months Warranty", "Long backup — fans, lights, TV", "Free installation in Alnavar"],
      whatsappText: "Hi, price for Luminous 150Ah Inverter"
    }
  ],

  // ─── WHY CHOOSE US ───
  advantages: [
    { icon: "shield-check", title: "Authorized Dealer", text: "Official dealer for Exide, Amaron, SF & Luminous" },
    { icon: "clock", title: "15+ Years", text: "Serving Alnavar since 2011 with trust" },
    { icon: "repeat", title: "Best Exchange", text: "Top rates for old battery exchange" },
    { icon: "truck", title: "Free Delivery", text: "Doorstep delivery within 20 km radius" },
    { icon: "map-pin", title: "2 Branches", text: "Highway + local — always accessible" }
  ],

  // ─── LOCATIONS ───
  locations: [
    {
      name: "Branch 1 — Goa Cross",
      tag: "highway",
      tagLabel: "⚡ Highway Service",
      address: "NH 67, Goa Cross, Alnavar, Dharwad District — 581103",
      hours: "Mon–Sat: 9 AM – 8:30 PM · Sun: 10 AM – 2 PM",
      phone: "+91 94486 67528",
      phoneLink: "+919448667528",
      highlight: "🚗 Specializes in highway battery replacement, jump start service, emergency roadside assistance & quick car/bike battery swaps for travelers.",
      mapQuery: "GK+Batteries+Goa+Cross+Alnavar",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15345!2d74.595!3d15.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf2e3b00000001%3A0x1!2sAlnavar%2C+Karnataka!5e0!3m2!1sen!2sin!4v1"
    },
    {
      name: "Branch 2 — Azad Road",
      tag: "local",
      tagLabel: "🏪 Local Hub",
      address: "Azad Road, Alnavar Town, Dharwad District — 581103",
      hours: "Mon–Sat: 9 AM – 8:30 PM · Sun: 10 AM – 2 PM",
      phone: "+91 94486 67528",
      phoneLink: "+919448667528",
      highlight: "🔧 Full-service hub — all battery sales, inverter installation, charging, agri sprayer pump service, rental batteries, repair & annual maintenance.",
      mapQuery: "GK+Batteries+Azad+Road+Alnavar",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15345!2d74.595!3d15.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf2e3b00000001%3A0x1!2sAlnavar%2C+Karnataka!5e0!3m2!1sen!2sin!4v1"
    }
  ]
};
