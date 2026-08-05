// Single source of truth for the whole site. Facts here mirror content/profile.ts
// in the mosawer-cv workspace — edit both if a fact changes.

export const profile = {
  name: "Mosawer Ghousi",
  shortName: "MOSAWER GHOUSI",
  role: "Full-Stack Developer & DevOps Engineer",
  location: "Kabul, Afghanistan",
  timezone: "Asia/Kabul",
  availability: "Open to remote work worldwide",
  email: "a.mosawer.ghousi@gmail.com",
  phone: "+93 780 345 384",
  phoneHref: "tel:+93780345384",
  whatsapp: "https://wa.me/93780345384",
  github: "https://github.com/mosawerghousi",
  linkedin: "https://www.linkedin.com/in/mosawerghousi/",
  portfolio: "https://mosawerghousi.vercel.app",
  photo: "/me.webp",
  pitch:
    "Building the software behind real Afghan businesses — from the interface down to the deploy pipeline.",
};

export const navLinks = [
  { label: "STUDIO", href: "#studio" },
  { label: "WORK", href: "#work" },
  { label: "MOBILE", href: "#mobile" },
  { label: "CONTACT", href: "#contact" },
];

export const about = [
  "I'm Mosawer, a full-stack developer and DevOps engineer based in Kabul. I like the parts of the job most people skip — the accounting logic that has to balance to the cent, the deploy pipeline that has to not break production, the RTL edge case that breaks every other developer's assumptions.",
  "Day to day, I'm the lead contributor on Zoroo's customer-facing app, own its POS and notifications systems end-to-end, and built the Dari/Pashto localization that makes it usable for the businesses it's actually built for. Alongside that, I lead web development for Nairika Kohsar Trading, and I've spent a chunk of my own time building production-quality Flutter and React UI kits.",
  "I'm ACCA-trained, which sounds unrelated until you're the one deciding whether a currency-exchange gain belongs in the P&L — it's why the ERP systems I build tend to get the accounting right the first time.",
];

export const stats = [
  { value: 6, suffix: "", label: "Years shipping\nproduction software" },
  { value: 30, suffix: "+", label: "Products, kits &\ntemplates built" },
  { value: 12, suffix: "", label: "Flutter apps\nshipped solo" },
  { value: 3, suffix: "", label: "Languages —\nEN / Dari / Pashto" },
];

// Words that ride the ticker between the hero and the work section.
export const marquee = [
  "NEXT.JS",
  "FLUTTER",
  "DJANGO",
  "LARAVEL",
  "TYPESCRIPT",
  "POSTGRESQL",
  "DOCKER",
  "REDUX TOOLKIT",
  "TAILWIND",
  "GO",
  "RIVERPOD",
  "CI/CD",
];

export type Category = "product" | "erp" | "web" | "mobile";

export const categories: { key: Category | "all"; label: string; blurb: string }[] = [
  { key: "all", label: "Everything", blurb: "The whole shelf" },
  { key: "product", label: "Products", blurb: "Live, in production, used by real businesses" },
  { key: "erp", label: "ERP & Dashboards", blurb: "Operations software — the dense, data-heavy kind" },
  { key: "web", label: "Web", blurb: "Storefronts, marketing sites, templates" },
  { key: "mobile", label: "Mobile", blurb: "Flutter, clean architecture, 60fps" },
];

export type Project = {
  key: string;
  name: string;
  tagline: string;
  category: Category;
  /** Shown as the card's eyebrow — what this thing actually is. */
  kind: string;
  year: string;
  role: string;
  /** Longer copy for the detail overlay. */
  detail: string;
  tech: string[];
  images: string[];
  /** Phone-shaped screenshots render in a device frame; desktop ones in a browser chrome. */
  frame: "browser" | "phone";
  href?: string;
  /** Set when there's no public screenshot — the card falls back to a typographic treatment. */
  confidential?: boolean;
  metrics?: { value: string; label: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  // ── Products ───────────────────────────────────────────────────────────────
  {
    key: "zoroo",
    name: "Zoroo",
    tagline: "Multi-tenant business SaaS for companies across Afghanistan",
    category: "product",
    kind: "ERP / SaaS Platform",
    year: "2024 — now",
    role: "Lead contributor · Full-stack & DevOps",
    detail:
      "Accounting, sales, inventory, POS and HR in one multi-tenant platform. I own the POS and real-time notification systems end-to-end — from the Django REST APIs through the React/Redux Toolkit front end — and built the Dari/Pashto localization with RTL-correct currency formatting, including accounting-convention negative numbers for formal financial statements. Designed the GAAP/IFRS-compliant advance-payment model that applies prepayments across invoices, and built the staging CI/CD pipeline that keeps untested code out of production.",
    tech: ["Django", "React", "TypeScript", "Redux Toolkit", "PostgreSQL", "Docker", "Traefik"],
    images: ["/work/zoroo.webp"],
    frame: "browser",
    href: "https://zoroo.net",
    metrics: [
      { value: "Multi-tenant", label: "Architecture" },
      { value: "3", label: "Languages, RTL-first" },
      { value: "POS", label: "Owned end-to-end" },
    ],
    featured: true,
  },
  {
    key: "kctp",
    name: "KCTP",
    tagline: "Complete printing-press ERP — built and run solo",
    category: "product",
    kind: "ERP · Client Work",
    year: "2023 — now",
    role: "Sole developer · Database to deploy",
    detail:
      "Accounting, inventory, sales, purchasing, expenses, CRM and reporting for a printing-press business. Every sale or purchase atomically updates stock, line items, multi-currency payment balances and auto-generated journal entries — real transactional double-entry bookkeeping. I own the database design, the REST routes and Zod-validated Server Actions, NextAuth role-based access control, print-ready reporting, and the production Docker/cPanel deployment with automated deploy and backup scripts.",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "MySQL", "NextAuth", "Docker"],
    images: [],
    frame: "browser",
    href: "https://kctp.af",
    confidential: true,
    metrics: [
      { value: "Double-entry", label: "Bookkeeping engine" },
      { value: "7", label: "Modules" },
      { value: "Solo", label: "Design → production" },
    ],
    featured: true,
  },
  {
    key: "lajward",
    name: "Lajward",
    tagline: "Multi-branch clinic ERP for Afghan healthcare",
    category: "product",
    kind: "Healthcare ERP",
    year: "2025",
    role: "Full-stack",
    detail:
      "Patients, scheduling, EMR, pharmacy, billing and MoPH regulatory reporting across multiple branches. Trilingual (English/Dari/Pashto), RTL-first, with both Jalali and Gregorian calendars — the kind of localization that has to be right before a clinic will trust it with a patient record.",
    tech: ["Laravel 12", "PHP 8.3", "React 18", "TypeScript", "RTK Query", "PostgreSQL", "Redis", "Docker"],
    images: ["/work/lajward-1.webp", "/work/lajward-2.webp"],
    frame: "browser",
    metrics: [
      { value: "Jalali + Gregorian", label: "Dual calendar" },
      { value: "MoPH", label: "Regulatory reporting" },
    ],
    featured: true,
  },
  {
    key: "nairika",
    name: "Nairika",
    tagline: "Server-rendered storefront for the Nairika Manteau apparel line",
    category: "product",
    kind: "E-commerce",
    year: "2024",
    role: "Lead web developer",
    detail:
      "Product catalog, search and cart flows built as a responsive, server-rendered Next.js storefront with an SEO-optimized page structure. Maintained in production — performance, security patches and ongoing support in direct collaboration with the client.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO"],
    images: ["/work/nairika.webp"],
    frame: "browser",
    href: "https://nairika.org",
  },
  {
    key: "meridian",
    name: "Meridian",
    tagline: "Project & team management with role-based admin",
    category: "product",
    kind: "Management System",
    year: "2025",
    role: "Full-stack",
    detail:
      "Dashboards, reports, milestones, time tracking and role-based administration. English/Dari/Pashto with full RTL, light and dark themes, built on a repository pattern and covered by feature tests.",
    tech: ["Laravel 13", "PHP 8.3", "Blade", "Alpine.js", "Tailwind CSS", "PHPUnit"],
    images: ["/work/meridian-1.webp", "/work/meridian-2.webp"],
    frame: "browser",
  },
  {
    key: "nairika-corp",
    name: "Nairika Kohsar Trading",
    tagline: "Corporate site — production, export, import & financial training",
    category: "web",
    kind: "Corporate Site",
    year: "2024",
    role: "Lead web developer",
    detail:
      "The corporate face of the group, covering its production, export/import and financial-training business lines.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    images: ["/work/nairika-corp.webp"],
    frame: "browser",
    href: "https://nairikakohsartrading.com",
  },
  {
    key: "mizan",
    name: "Mizan Sarafi",
    tagline: "Multi-tenant hawala & currency-exchange back office",
    category: "product",
    kind: "Fintech · Independent",
    year: "2024",
    role: "Sole developer",
    detail:
      "Cashboxes, exchange rates, ledgers and journal-based accounting for hawala operators — designed and built solo. This is where the ACCA training earns its keep: deciding where a currency-exchange gain belongs is an accounting question long before it's a code question.",
    tech: ["Django", "React", "TypeScript", "Redux Toolkit", "PostgreSQL"],
    images: [],
    frame: "browser",
    confidential: true,
    metrics: [
      { value: "Journal-based", label: "Accounting core" },
      { value: "Multi-tenant", label: "Architecture" },
    ],
  },
  {
    key: "sauda",
    name: "Sauda",
    tagline: "Trilingual two-sided marketplace built for low-bandwidth Afghanistan",
    category: "product",
    kind: "Marketplace · Flutter + Django",
    year: "2025",
    role: "Sole developer",
    detail:
      "Shopkeepers list products; customers browse, search and contact sellers. Freemium, trilingual (Dari/Pashto/English), privacy-first, and deliberately tuned for low bandwidth, low-end Android hardware and lower literacy — which drives everything from image budgets to how much text a screen is allowed to carry.",
    tech: ["Flutter", "Dart", "Django REST Framework", "PostgreSQL", "Docker"],
    images: [],
    frame: "phone",
    confidential: true,
    metrics: [
      { value: "3", label: "Languages" },
      { value: "Low-bandwidth", label: "Design constraint" },
    ],
  },
  {
    key: "correspondence",
    name: "Correspondence MS",
    tagline: "Document and correspondence tracking for organisations",
    category: "product",
    kind: "Internal System",
    year: "2025",
    role: "Full-stack",
    detail:
      "Incoming and outgoing correspondence, routing, attachments and audit trail — a Next.js front end over a containerised API, internationalised for Dari and Pashto offices.",
    tech: ["Next.js", "TypeScript", "Docker", "i18n"],
    images: [],
    frame: "browser",
    confidential: true,
  },

  // ── ERP & dashboard kits ───────────────────────────────────────────────────
  {
    key: "cadre",
    name: "Cadre",
    tagline: "Freelancing dashboard portal — 19 pages, warm & lime",
    category: "erp",
    kind: "SaaS UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A fully-featured freelancing dashboard portal shipped as a reusable SaaS UI kit — warm off-white canvas, near-black sidebar, signature lime accent. Clean-architecture API layer so the whole thing swaps from mock data to a real backend in one place.",
    tech: ["React", "TypeScript", "Vite", "Redux Toolkit", "Tailwind CSS"],
    images: ["/work/cadre-1.webp", "/work/cadre-2.webp", "/work/cadre-3.webp"],
    frame: "browser",
    href: "https://cadre-topaz.vercel.app/",
    metrics: [{ value: "19", label: "Pages" }],
    featured: true,
  },
  {
    key: "mediso",
    name: "Mediso",
    tagline: "Hospital ERP dashboard — 26 pages of clinical operations",
    category: "erp",
    kind: "Medical ERP Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Patients, appointments, wards, staff, pharmacy and analytics — the dense, table-heavy screens real clinical software actually needs, with Recharts visualisations that stay readable at data volume.",
    tech: ["React", "Vite", "Redux Toolkit", "Recharts", "TypeScript"],
    images: ["/work/mediso-1.webp", "/work/mediso-2.webp", "/work/mediso-3.webp"],
    frame: "browser",
    href: "https://mediso-beryl.vercel.app/",
    metrics: [{ value: "26", label: "Pages" }],
    featured: true,
  },
  {
    key: "taskms",
    name: "TaskMS",
    tagline: "Commercial-grade task management dashboard",
    category: "erp",
    kind: "Productivity Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "Dashboard, kanban board, task list, calendar, projects, chat, files and team management — built on React 19 with strict TypeScript, Redux Toolkit and Mantine. Feature-sliced architecture, i18n-ready, with light and dark themes throughout.",
    tech: ["React 19", "TypeScript", "Redux Toolkit", "Mantine 9", "Vite"],
    images: ["/work/taskms-1.webp", "/work/taskms-2.webp", "/work/taskms-3.webp"],
    frame: "browser",
    metrics: [
      { value: "13", label: "Page groups" },
      { value: "Strict", label: "TypeScript" },
    ],
  },
  {
    key: "tradeup",
    name: "Estate ERP",
    tagline: "Real-estate operations — properties, leases, clients, occupancy",
    category: "erp",
    kind: "Property ERP Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "A property-management ERP built to a measured design system — every colour, radius and spacing value sampled from the reference rather than guessed. Occupancy tracking, lease pipelines, client records and a dashboard that holds a lot of numbers without feeling loud.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Clean Architecture"],
    images: ["/work/tradeup-1.webp"],
    frame: "browser",
    metrics: [{ value: "Sampled", label: "Design system" }],
  },
  {
    key: "crypto",
    name: "Crypto Desk",
    tagline: "Trading terminal — markets, portfolio, order flow",
    category: "erp",
    kind: "Fintech Dashboard Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "Markets, portfolio, trade and transaction history in a dark trading terminal — the kind of interface that has to stay legible when every cell is changing at once. Clean-architecture layering with a Redux listener middleware driving live updates.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Vite", "Clean Architecture"],
    images: ["/work/crypto-1.webp", "/work/crypto-2.webp", "/work/crypto-3.webp"],
    frame: "browser",
  },
  {
    key: "travelcrm",
    name: "TravelCRM",
    tagline: "Travel agency management — customers, leads, payments",
    category: "erp",
    kind: "CRM Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Lead pipelines, customer records, bookings and payment tracking for travel agencies, built on Next.js with a full authentication flow.",
    tech: ["Next.js", "React", "TypeScript", "Prisma"],
    images: ["/work/travelcrm-1.webp", "/work/travelcrm-2.webp", "/work/travelcrm-3.webp"],
    frame: "browser",
    href: "https://travel-phi-olive.vercel.app/login",
  },
  {
    key: "learnpeak",
    name: "LearnPeak",
    tagline: "Learning platform — courses, progress, dark-first",
    category: "erp",
    kind: "EdTech Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Course catalog, lesson player and progress tracking in a dark-first learning environment, with Redux Toolkit managing enrolment and playback state.",
    tech: ["React", "Vite", "Redux Toolkit", "TypeScript"],
    images: ["/work/learnpeak-1.webp", "/work/learnpeak-2.webp"],
    frame: "browser",
    href: "https://learnpeak-omega.vercel.app/",
  },
  {
    key: "pharmacy",
    name: "Pharmacy PMS",
    tagline: "Pharmacy management — stock, dispensing, prescriptions",
    category: "erp",
    kind: "Pharmacy Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Inventory, dispensing and prescription workflows in a clean light theme built on Mantine, with a companion API and public website in the same repo.",
    tech: ["React", "Vite", "Mantine UI", "TypeScript"],
    images: ["/work/pharmacy-1.webp"],
    frame: "browser",
    href: "https://pharmacy-frontend-weld.vercel.app/",
  },

  // ── Web templates ──────────────────────────────────────────────────────────
  {
    key: "roamly",
    name: "Roamly",
    tagline: "Travel-planning template — 11 pages, deploy-ready",
    category: "web",
    kind: "Marketing Template",
    year: "2025",
    role: "Design & build",
    detail:
      "A premium travel-planning template with 11 designed pages, a built-in journal, SPA routing fallbacks for Vercel and Netlify, Open Graph and Twitter meta, sitemap and a 1200×630 share image — the boring deploy details done so the buyer doesn't have to.",
    tech: ["React", "Vite", "Tailwind CSS", "React Router"],
    images: ["/work/roamly-1.webp", "/work/roamly-2.webp"],
    frame: "browser",
    href: "https://roamly-premium-ui.vercel.app/",
    metrics: [{ value: "11", label: "Pages" }],
    featured: true,
  },
  {
    key: "honey",
    name: "Golden Harvest",
    tagline: "Honey product landing page — warm, editorial, unhurried",
    category: "web",
    kind: "Landing Page",
    year: "2025",
    role: "Design & build",
    detail:
      "A product landing page for an artisanal honey brand — big photography, generous whitespace and typography that lets the product breathe.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    images: ["/work/honey-1.webp", "/work/honey-2.webp"],
    frame: "browser",
    href: "https://honey-business-ui.vercel.app/",
  },
  {
    key: "msoftware",
    name: "MSoftware",
    tagline: "Studio site — project gallery & UI-kit showcase",
    category: "web",
    kind: "Studio Site",
    year: "2026",
    role: "Design & build",
    detail:
      "A software studio site with a filterable project gallery and a dedicated UI-kit showcase, light and dark themes, built in React and TypeScript.",
    tech: ["React", "TypeScript", "Vite", "CSS Modules"],
    images: ["/work/msoftware-1.webp"],
    frame: "browser",
  },

  // ── Flutter kits ───────────────────────────────────────────────────────────
  {
    key: "luxe",
    name: "Luxe",
    tagline: "Luxury hotel discovery & multi-step reservation",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Hotel discovery, room detail, a multi-step reservation flow and profile management across 15 screens — Riverpod state, go_router navigation, clean architecture.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Clean Architecture"],
    images: ["/mobile/luxe-1.webp", "/mobile/luxe-2.webp", "/mobile/luxe-3.webp", "/mobile/luxe-4.webp"],
    frame: "phone",
    href: "https://luxe-hotel-rho.vercel.app/",
    metrics: [{ value: "15", label: "Screens" }],
    featured: true,
  },
  {
    key: "yum",
    name: "Yum",
    tagline: "Food delivery — discovery, cart, checkout",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Restaurant discovery, dish detail, cart and checkout across 18 screens, with the kind of appetite-forward photography treatment food delivery lives or dies on.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Clean Architecture"],
    images: ["/mobile/yum-1.webp", "/mobile/yum-2.webp", "/mobile/yum-3.webp", "/mobile/yum-4.webp"],
    frame: "phone",
    href: "https://yum-ui-kit.vercel.app/",
    metrics: [{ value: "18", label: "Screens" }],
    featured: true,
  },
  {
    key: "jewels",
    name: "Royal Brilliance Jewels",
    tagline: "Premium jewellery e-commerce, full shopping flow",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "An 18-screen jewellery storefront — browse, detail, favourites, cart and checkout — styled for a category where the product photography has to carry the luxury and the chrome has to get out of the way.",
    tech: ["Flutter", "Dart", "Riverpod", "go_router", "Clean Architecture"],
    images: ["/mobile/jewels-1.webp", "/mobile/jewels-2.webp", "/mobile/jewels-3.webp", "/mobile/jewels-4.webp"],
    frame: "phone",
    href: "https://royal-jewels-weld.vercel.app/",
    metrics: [{ value: "18", label: "Screens" }],
  },
  {
    key: "nimbus",
    name: "Nimbus",
    tagline: "Neobank — real-time ledger, cards, transfers",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "A modern neobank kit built on Riverpod and clean architecture — onboarding, authentication, a real-time transaction feed, card management and transfers.",
    tech: ["Flutter", "Dart", "Riverpod", "Clean Architecture"],
    images: ["/mobile/nimbus-1.webp", "/mobile/nimbus-2.webp"],
    frame: "phone",
  },
  {
    key: "zestora",
    name: "Zestora",
    tagline: "Recipes — cook step by step, save favourites",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "A food-recipe kit with step-by-step cooking mode, smart serving sizes and ingredient lists that scale with them, plus a personal cookbook of saved dishes.",
    tech: ["Flutter", "Dart", "Riverpod"],
    images: ["/mobile/zestora-1.webp", "/mobile/zestora-2.webp", "/mobile/zestora-3.webp"],
    frame: "phone",
  },
  {
    key: "modanisa",
    name: "Modanisa",
    tagline: "Modest fashion — onboarding through checkout",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A modest-fashion e-commerce kit covering the full path from onboarding to checkout, with the category browsing and size-selection patterns apparel shopping needs.",
    tech: ["Flutter", "Dart"],
    images: ["/mobile/modanisa-1.webp", "/mobile/modanisa-2.webp", "/mobile/modanisa-3.webp"],
    frame: "phone",
    href: "https://modanisa-two.vercel.app",
  },
  {
    key: "fitquest",
    name: "FitQuest",
    tagline: "Workout tracker & personal trainer",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A dark-theme workout tracker — onboarding, sign-in, programme browsing and session tracking, designed for the one-handed, mid-set reality of actually using a fitness app in a gym.",
    tech: ["Flutter", "Dart"],
    images: ["/mobile/fitquest-1.webp", "/mobile/fitquest-2.webp", "/mobile/fitquest-3.webp"],
    frame: "phone",
    href: "https://fitquest-taupe.vercel.app/",
  },
  {
    key: "solevibe",
    name: "SoleVibe",
    tagline: "Footwear commerce — OTP auth, wishlist, dark",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A dark-theme sneaker store with OTP authentication, wishlist and a product detail page built to make the shoe the loudest thing on screen.",
    tech: ["Flutter", "Dart"],
    images: ["/mobile/solevibe-1.webp", "/mobile/solevibe-2.webp", "/mobile/solevibe-3.webp"],
    frame: "phone",
    href: "https://solevibe-uikit.vercel.app/",
  },
  {
    key: "iqraa",
    name: "Iqraa",
    tagline: "Learn the Quran — recitation guidance & daily practice",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Recitation guidance and daily practice tracking, with Arabic typography given the room and the line height it actually needs to be read comfortably.",
    tech: ["Flutter", "Dart"],
    images: ["/mobile/iqraa-1.webp", "/mobile/iqraa-2.webp", "/mobile/iqraa-3.webp"],
    frame: "phone",
    href: "https://quran-psi-vert.vercel.app/",
  },
  {
    key: "whatsapp",
    name: "Messenger Kit",
    tagline: "Pixel-faithful messaging UI — chats, calls, status",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "A messaging kit rebuilt to the pixel on Riverpod and clean architecture — onboarding, phone verification, chat list, conversation view, calls and status. A study in how much precision a familiar interface actually demands.",
    tech: ["Flutter", "Dart", "Riverpod", "Clean Architecture"],
    images: ["/mobile/whatsapp-1.webp", "/mobile/whatsapp-2.webp"],
    frame: "phone",
  },
  {
    key: "parking",
    name: "Smart Parking",
    tagline: "Real-time parking finder — map, reserve, EV charging",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Find spots on a map, view details, reserve cashless, manage EV charging and track bookings — one codebase running on Android, iOS and Linux desktop at 60fps.",
    tech: ["Flutter", "Dart", "Riverpod"],
    images: [],
    frame: "phone",
    confidential: true,
  },
];

export const featured = projects.filter((p) => p.featured);

/** Phone gallery — the Flutter kits that have real screenshots to show. */
export const phoneGallery = projects.filter(
  (p) => p.category === "mobile" && p.frame === "phone" && p.images.length > 0
);

export type Experience = {
  company: string;
  role: string;
  timeframe: string;
  summary: string;
  href?: string;
  achievements: string[];
  clients?: { name: string; href?: string; bullets: string[] }[];
};

export const experience: Experience[] = [
  {
    company: "Orhan Technology",
    role: "Full-Stack Developer / DevOps Engineer",
    timeframe: "Feb 2024 — Present",
    href: "https://zoroo.net",
    summary:
      "Zoroo — a multi-tenant ERP / business-management SaaS (accounting, sales, inventory, HR) built for companies across Afghanistan.",
    achievements: [
      "Lead contributor to Zoroo's customer-facing ERP web app and public marketing site; own the POS and real-time notification systems end-to-end, from the Django REST APIs through the React/Redux Toolkit front end.",
      "Built Dari/Pashto localization and RTL-correct currency formatting across the platform, including accounting-convention negative-number display for formal financial statements.",
      "Designed GAAP/IFRS-compliant customer and supplier advance-payment accounting, including a payment-allocation model for applying prepayments across invoices.",
      "Implemented barcode-scanning workflows across sales and purchase order forms, integrating hardware scanners with the inventory system.",
      "Built a staging CI/CD pipeline (isolated database, Traefik routing, Dokploy auto-deploy) to keep untested code out of production, and tuned PgBouncer connection pooling for multi-tenant performance.",
    ],
  },
  {
    company: "Freelance — Afghanistan",
    role: "Sole Full-Stack Developer for Afghan businesses",
    timeframe: "2020 — Present",
    summary:
      "Independent end-to-end delivery of ERP and business software — sole developer from database design through production deployment.",
    achievements: [],
    clients: [
      {
        name: "KCTP",
        href: "https://kctp.af",
        bullets: [
          "Designed and developed a complete ERP for a printing-press business — accounting, inventory, sales, purchasing, expenses, CRM and reporting — in Next.js, React, TypeScript and Prisma on MySQL.",
          "Engineered transactional double-entry bookkeeping: each sale or purchase atomically updates stock, line items, multi-currency payment balances and auto-generated journal entries.",
          "Own database design and optimization, REST API routes and Zod-validated Server Actions, NextAuth role-based access control, and print-ready reporting.",
          "Run production end-to-end — Docker/Linux and cPanel deployment, automated deploy and backup scripts, and direct stakeholder collaboration.",
        ],
      },
      {
        name: "Nairika Kohsar Trading Company",
        bullets: [
          "Designed and built nairika.org, a responsive, server-rendered Next.js storefront for the Nairika Manteau apparel line — product catalog, search and cart flows with SEO-optimized page structure.",
          "Delivered nairikakohsartrading.com, the corporate site covering the company's production, export, import and financial-training business lines.",
          "Maintain both sites in production — performance, security patches and ongoing support in direct collaboration with the client.",
        ],
      },
    ],
  },
];

export const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Mantine UI"],
  },
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "Riverpod", "go_router", "Clean Architecture"],
  },
  {
    group: "Backend",
    items: ["Laravel", "PHP", "Django", "DRF", "Python", "Go", "Node.js", "PostgreSQL", "Celery", "RabbitMQ"],
  },
  {
    group: "DevOps & Cloud",
    items: ["Docker", "Dokploy", "Traefik", "PgBouncer", "OpenTelemetry", "CI/CD", "Vercel"],
  },
  {
    group: "Practice",
    items: ["Clean Architecture", "Git & GitHub", "i18n & RTL", "Figma-to-code"],
  },
];

export const education = [
  {
    institution: "Rana University",
    credential: "Bachelor of Software Engineering",
    detail: "Kabul, Afghanistan — Graduated 2025",
  },
];

export const certifications = [
  "ACCA F3 — Financial Accounting",
  "ACCA FA1 — Recording Financial Transactions",
  "ACCA FA2 — Maintaining Financial Records",
];

export const socials = [
  { label: "GITHUB", href: profile.github, meta: "@mosawerghousi" },
  { label: "LINKEDIN", href: profile.linkedin, meta: "in/mosawerghousi" },
  { label: "EMAIL", href: `mailto:${profile.email}`, meta: profile.email },
  { label: "WHATSAPP", href: profile.whatsapp, meta: profile.phone },
];
