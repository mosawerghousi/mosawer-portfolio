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
  { value: 45, suffix: "", label: "Products, kits &\ntemplates built" },
  { value: 17, suffix: "", label: "Flutter apps\nshipped solo" },
  { value: 29, suffix: "", label: "Deployed &\nlive right now" },
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

/**
 * What a thing *is*, not how well it went. Every project gets exactly one of these,
 * so a Flutter app is filed under Mobile whether it's a client build or a UI kit —
 * "in production" is already said by the Live badge, and doesn't need a tab of its own.
 */
export type Category = "web" | "mobile" | "erp" | "extension";

/**
 * "New" cuts across the four buckets rather than being a fifth one — the newest
 * Web build and the newest Flutter kit both belong in it. Bump YEAR_NEW each January
 * and the tab refills itself; nothing per-project needs touching.
 */
export const YEAR_NEW = "2026";

export type Filter = Category | "all" | "new";

export const categories: { key: Filter; label: string; blurb: string }[] = [
  { key: "all", label: "Everything", blurb: "The whole shelf" },
  { key: "new", label: "New", blurb: `Built this year — the ${YEAR_NEW} shelf` },
  { key: "web", label: "Web", blurb: "Storefronts, marketing sites, studio work" },
  { key: "mobile", label: "Mobile", blurb: "Flutter, clean architecture, 60fps" },
  { key: "erp", label: "ERP & Dashboards", blurb: "Operations software — the dense, data-heavy kind" },
  { key: "extension", label: "Extensions & Tools", blurb: "Developer tooling that lives in the editor" },
];

/** The one place the filter chips and the grid agree on what a tab contains. */
export const matchesFilter = (p: Project, filter: Filter) =>
  filter === "all" ? true : filter === "new" ? p.year.includes(YEAR_NEW) : p.category === filter;

export type Project = {
  key: string;
  /**
   * Presentation order — lower shows first. Ranked by how strong the work looks,
   * not by date, so filtering any category leads with its best-looking piece.
   */
  rank: number;
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
  /** Deployed and reachable — earns a "Live" badge and a visit link on the card. */
  live?: boolean;
  /** Set when there's no public screenshot — the card falls back to a typographic treatment. */
  confidential?: boolean;
  metrics?: { value: string; label: string }[];
  featured?: boolean;
};

/**
 * The headers below only group the file for reading — `category` is what the tabs
 * filter on, and `rank` is what orders them. Add a project wherever it reads best.
 */
export const projects: Project[] = [
  // ── Newest ─────────────────────────────────────────────────────────────────
  {
    key: "vaultline",
    rank: 1,
    name: "Vaultline",
    tagline: "A treasury site whose hero never scrolls away — it gets masked into a window",
    category: "web",
    kind: "Marketing Site Template",
    year: "2026",
    role: "Design & build · Sole developer",
    detail:
      "The centrepiece is an aperture. A sticky, full-bleed WebGL layer sits behind the page and its clip-path: rect() is scrubbed inward as you scroll, so the cinematic opening is not replaced by the next section — it is progressively masked by it, contracting into a framed window that the section was already arranged around. By the time the window settles it is showing a treasury chart, and the page has gone from night to daylight without a cut. Both 3D scenes are generated at runtime rather than pre-rendered: a procedural atmosphere shader with a drifting faceted solid, and a machined glass-and-steel core pinned beside the propositions and rotated by scroll progress — no HDRIs, no textures, no network fetches, so it renders identically offline. GSAP's ticker drives Lenis on one clock, because two rAF loops make ScrollTrigger read a stale position and every pinned section shimmers. Under prefers-reduced-motion the scroll system never starts and no canvas mounts; below 1024px the aperture is bypassed entirely and the chart renders inline, so the server-rendered HTML is itself the fallback.",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Three Fiber",
      "GLSL",
    ],
    images: [
      "/work/vaultline-1.webp",
      "/work/vaultline-2.webp",
      "/work/vaultline-3.webp",
      "/work/vaultline-4.webp",
    ],
    frame: "browser",
    href: "https://vaultline-ruby.vercel.app",
    live: true,
    metrics: [
      { value: "clip-path", label: "Hero masks, never cuts" },
      { value: "2 scenes", label: "WebGL, zero assets loaded" },
      { value: "0 canvases", label: "Under reduced motion" },
    ],
    featured: true,
  },
  {
    key: "sarv",
    rank: 2,
    name: "Sarv",
    tagline: "Site for a Dushanbe furniture and interior studio, built around one word",
    category: "web",
    kind: "Studio Site",
    year: "2026",
    role: "Design & build · Sole developer",
    detail:
      "Sarv (سرو) is the Persian cypress — evergreen, perfectly upright, and in Persian poetry the image of a graceful, unbending figure. The whole site is drawn out of that one word: deep forest green, vertical proportions, and a tagline that refuses to move — \"Rooms that stand still.\" GSAP and Lenis drive everything scroll-linked (masked headings, the featured projects that stack as you pass them, a preloader that draws the wordmark one letter at a time); Framer Motion handles list state on the two filtered indexes. No component names a colour: each section carries data-theme=\"dark | light | raised | bone\", which rebinds --bg, --fg and --rule, so the page alternates dark to light on one attribute. The logo, favicons, OG card and web manifest are all rasterised from four committed SVGs by a single script, and the sitemap is emitted at build time from the same typed content the pages read — a new project slug is listed the moment it exists.",
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
      "Framer Motion",
      "React Router",
    ],
    images: ["/work/sarv-1.webp", "/work/sarv-2.webp", "/work/sarv-3.webp", "/work/sarv-4.webp"],
    frame: "browser",
    href: "https://sarv-studio.vercel.app",
    live: true,
    metrics: [
      { value: "GSAP + Lenis", label: "Scroll system" },
      { value: "9 routes", label: "One typed content layer" },
      { value: "1 script", label: "Every brand asset derived" },
    ],
    featured: true,
  },

  {
    key: "novark",
    rank: 3,
    name: "NOVARK",
    tagline: "A convoy leaving a dying sun, with every planet and skyline drawn in code",
    category: "web",
    kind: "Marketing Site Template",
    year: "2026",
    role: "Design & build · Sole developer",
    detail:
      "A cinematic template for a narrative sci-fi universe — the last convoy leaving a collapsing solar home — built under one constraint: nothing in the repository is an asset. There is no photography, no 3D render, no video file and no WebGL. The planets are layered CSS gradients under an SVG turbulence filter, the starfield and the orbital belt are canvas, the cryo-pod and the five division badges are SVG, and the ruined skyline is generated from a seed, so the same city redraws identically on every load. That buys three things at once: nothing to license, a bundle carrying no media, and a template that recolours from a single stylesheet — every token in tokens.css is declared twice, once as a hex value and once as space-separated RGB channels, so Tailwind opacity modifiers read the same source as plain CSS. GSAP ScrollTrigger and Lenis drive everything scroll-linked. The identity is derived rather than duplicated: siteConfig.ts is the only place the name, nav, contacts and route list exist, one script rasterises the favicon set, apple-touch icon and OG card from four committed SVGs, and the sitemap is emitted from that same route list at build time.",
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "GSAP ScrollTrigger",
      "Lenis",
      "React Router",
      "Canvas + SVG",
    ],
    images: [
      "/work/novark-1.webp",
      "/work/novark-2.webp",
      "/work/novark-3.webp",
      "/work/novark-4.webp",
    ],
    frame: "browser",
    href: "https://novark-eosin.vercel.app",
    live: true,
    metrics: [
      { value: "0 assets", label: "Every visual drawn in code" },
      { value: "1 stylesheet", label: "Recolours the whole site" },
      { value: "6 routes", label: "Sitemap emitted at build" },
    ],
    featured: true,
  },

  // ── In production — client work and shipped products ───────────────────────
  {
    key: "nplus1",
    rank: 6,
    name: "N+1 Query Detector",
    tagline: "Finds N+1 queries at runtime, in any language, without leaving the editor",
    category: "extension",
    kind: "VS Code Extension",
    year: "2026",
    role: "Creator · Sole developer",
    detail:
      "Published as Universal N+1 Query Detector. Every other N+1 tool is tied to one framework and lives outside your editor. This one is neither. Probes hook your ORM and append one JSON object per query to an open, versioned log format; the extension groups those queries by call site and draws the warning on the loop that caused them — with the eager-loading fix for your ORM in the hover. Detection never parses source and never knows what framework produced the log, which is what makes “any language” a fact rather than a roadmap: five probes ship (Eloquent, Django ORM, SQLAlchemy, Prisma, Knex/Sequelize/TypeORM) and 28 ORMs already have a tailored fix hint. Published on both the VS Code Marketplace and Open VSX.",
    tech: ["TypeScript", "VS Code API", "PHP", "Python", "Node.js", "esbuild"],
    images: ["/work/nplus1-1.webp", "/work/nplus1-2.webp", "/work/nplus1-3.webp"],
    frame: "browser",
    href: "https://marketplace.visualstudio.com/items?itemName=mosawerghousi.n-plus-one-detector",
    live: true,
    metrics: [
      { value: "28", label: "ORMs with a fix hint" },
      { value: "5", label: "Probes shipping" },
      { value: "MIT", label: "Open source" },
    ],
    featured: true,
  },
  {
    key: "banoolearn",
    rank: 7,
    name: "BanooLearn",
    tagline: "The Afghan national curriculum, grades 6–12, on a phone that never sees the internet",
    category: "mobile",
    kind: "Offline-First Android App",
    year: "2026",
    role: "Sole developer",
    detail:
      "Built for girls barred from secondary school in Afghanistan since 2021, on cheap Android hardware with expensive, unreliable data. The rule that overrides everything: the app is fully functional with the network permanently disabled — not degrading gracefully, fully functional. The release build declares no INTERNET permission at all, so Android enforces that guarantee rather than our discipline. Textbooks, voice lessons through a real foreground service, chapter practice, on-device exam scoring and progress all work offline, and libraries travel phone-to-phone over Nearby Connections with signature verification. Trilingual: Dari, Pashto and English, RTL-first.",
    tech: ["Flutter", "Dart", "Riverpod", "drift", "Nearby Connections", "Ed25519"],
    images: ["/mobile/banoolearn-1.webp", "/mobile/banoolearn-2.webp", "/mobile/banoolearn-3.webp"],
    frame: "phone",
    href: "https://banoolearn.vercel.app",
    live: true,
    metrics: [
      { value: "0", label: "Network permissions" },
      { value: "3", label: "Languages, RTL-first" },
      { value: "138", label: "Tests passing" },
    ],
    featured: true,
  },
  {
    key: "tribe",
    rank: 8,
    name: "Tribe",
    tagline: "A photo and video social app — Flutter client over a Laravel API",
    category: "mobile",
    kind: "Social App · Flutter + Laravel",
    year: "2026",
    role: "Sole developer — client and API",
    detail:
      "Both halves built end-to-end. The Flutter client is clean architecture one vertical slice per feature, with an enforced dependency rule — a test fails the build if anything under domain/ imports Flutter, or if a data-layer model reaches a widget signature. The Laravel 11 API is layered the same way, ships a seeded demo graph including a private account for testing the privacy rules, and boots on SQLite with no Redis, Docker or database server. A contract check parses real server responses with the real client models, so a field renamed on the API fails there rather than at runtime on a device.",
    tech: ["Flutter", "Dart", "Riverpod", "Laravel 11", "PHP 8.3", "Sanctum", "drift"],
    images: ["/mobile/tribe-1.webp", "/mobile/tribe-2.webp", "/mobile/tribe-3.webp"],
    frame: "phone",
    metrics: [
      { value: "Clean", label: "Architecture, test-enforced" },
      { value: "2", label: "Codebases — client + API" },
    ],
  },
  {
    key: "zoroo",
    rank: 5,
    name: "Zoroo",
    tagline: "Multi-tenant business SaaS for companies across Afghanistan",
    category: "erp",
    kind: "ERP / SaaS Platform",
    year: "2024 — now",
    role: "Lead contributor · Full-stack & DevOps",
    detail:
      "Accounting, sales, inventory, POS and HR in one multi-tenant platform. I own the POS and real-time notification systems end-to-end — from the Django REST APIs through the React/Redux Toolkit front end — and built the Dari/Pashto localization with RTL-correct currency formatting, including accounting-convention negative numbers for formal financial statements. Designed the GAAP/IFRS-compliant advance-payment model that applies prepayments across invoices, and built the staging CI/CD pipeline that keeps untested code out of production.",
    tech: ["Django", "React", "TypeScript", "Redux Toolkit", "PostgreSQL", "Docker", "Traefik"],
    images: ["/work/zoroo.webp"],
    frame: "browser",
    href: "https://zoroo.net",
    live: true,
    metrics: [
      { value: "Multi-tenant", label: "Architecture" },
      { value: "3", label: "Languages, RTL-first" },
      { value: "POS", label: "Owned end-to-end" },
    ],
    featured: true,
  },
  {
    key: "tezload",
    rank: 11,
    name: "TezLoad",
    tagline: "Fast media downloads — pick a quality, get a signed link",
    category: "web",
    kind: "Media Platform",
    year: "2026",
    role: "Sole developer",
    detail:
      "Choose a title, pick audio or video, pick the quality, add subtitles in your language, and get a signed link straight to storage. Accounts use bcrypt at cost 12 with JWT sessions; every catalog and download route is behind auth. Search and category filters run client-side out of a Zustand store so typing never hits the network, and every link is scoped to the account that asked for it and expires after five minutes. \"Tez\" (تیز) means fast in Dari.",
    tech: ["Next.js 15", "TypeScript", "Drizzle ORM", "PostgreSQL", "Auth.js v5", "Cloudflare R2", "PWA"],
    images: ["/work/tezload-1.webp", "/work/tezload-2.webp", "/work/tezload-3.webp"],
    frame: "browser",
    metrics: [
      { value: "Signed URLs", label: "Direct from storage" },
      { value: "5 min", label: "Link expiry" },
      { value: "PWA", label: "Installable" },
    ],
    featured: true,
  },
  {
    key: "kctp",
    rank: 16,
    name: "KCTP",
    tagline: "Complete printing-press ERP — built and run solo",
    category: "erp",
    kind: "ERP · Client Work",
    year: "2023 — now",
    role: "Sole developer · Database to deploy",
    detail:
      "Accounting, inventory, sales, purchasing, expenses, CRM and reporting for a printing-press business. Every sale or purchase atomically updates stock, line items, multi-currency payment balances and auto-generated journal entries — real transactional double-entry bookkeeping. I own the database design, the REST routes and Zod-validated Server Actions, NextAuth role-based access control, print-ready reporting, and the production Docker/cPanel deployment with automated deploy and backup scripts.",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "MySQL", "NextAuth", "Docker"],
    images: ["/work/kctp-1.webp", "/work/kctp-2.webp"],
    frame: "browser",
    href: "https://www.kctp.af",
    live: true,
    metrics: [
      { value: "Double-entry", label: "Bookkeeping engine" },
      { value: "7", label: "Modules" },
      { value: "Solo", label: "Design → production" },
    ],
    featured: true,
  },
  {
    key: "lajward",
    rank: 19,
    name: "Lajward",
    tagline: "Multi-branch clinic ERP for Afghan healthcare",
    category: "erp",
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
    rank: 25,
    name: "Nairika",
    tagline: "Server-rendered storefront for the Nairika Manteau apparel line",
    category: "web",
    kind: "E-commerce",
    year: "2024",
    role: "Lead web developer",
    detail:
      "Product catalog, search and cart flows built as a responsive, server-rendered Next.js storefront with an SEO-optimized page structure. Maintained in production — performance, security patches and ongoing support in direct collaboration with the client.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO"],
    images: ["/work/nairika.webp"],
    frame: "browser",
    href: "https://nairika.org",
    live: true,
  },
  {
    key: "safeed",
    rank: 30,
    name: "Safeed",
    tagline: "Printing-press management system, Dari-first",
    category: "erp",
    kind: "ERP · Demo",
    year: "2025",
    role: "Sole developer",
    detail:
      "A printing-press management system (سیستم مدیریت چاپخانه) built Dari-first with role-separated admin and employee access. Orders, production tracking and accounting for a print shop, in the language the shop floor actually speaks.",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "i18n · RTL"],
    images: ["/work/safeed-1.webp"],
    frame: "browser",
    href: "https://safeed-demo.vercel.app",
    live: true,
    metrics: [{ value: "Dari-first", label: "RTL throughout" }],
  },
  {
    key: "mizan",
    rank: 31,
    name: "Mizan Sarafi",
    tagline: "Multi-tenant hawala & currency-exchange back office",
    category: "erp",
    kind: "Fintech",
    year: "2024",
    role: "Sole developer",
    detail:
      "Cashboxes, exchange rates, ledgers and journal-based accounting for hawala operators — designed and built solo, with a marketing site alongside it. This is where the ACCA training earns its keep: deciding where a currency-exchange gain belongs is an accounting question long before it's a code question.",
    tech: ["Django", "React", "TypeScript", "Redux Toolkit", "PostgreSQL"],
    images: ["/work/mizan-1.webp", "/work/mizan-2.webp", "/work/mizan-3.webp"],
    frame: "browser",
    href: "https://mizan-frontend-omega.vercel.app",
    live: true,
    metrics: [
      { value: "Journal-based", label: "Accounting core" },
      { value: "Multi-tenant", label: "Architecture" },
    ],
  },
  {
    key: "meridian",
    rank: 32,
    name: "Meridian",
    tagline: "Project & team management with role-based admin",
    category: "erp",
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
    key: "sauda",
    rank: 41,
    name: "Sauda",
    tagline: "Trilingual two-sided marketplace built for low-bandwidth Afghanistan",
    category: "mobile",
    kind: "Marketplace · Flutter + Django",
    year: "2025",
    role: "Sole developer",
    detail:
      "Shopkeepers list products; customers browse, search and contact sellers. Freemium, trilingual (Dari/Pashto/English), privacy-first, and deliberately tuned for low bandwidth, low-end Android hardware and lower literacy — which drives everything from image budgets to how much text a screen is allowed to carry.",
    tech: ["Flutter", "Dart", "Django REST Framework", "PostgreSQL", "Docker"],
    images: ["/mobile/sauda-1.webp", "/mobile/sauda-2.webp", "/mobile/sauda-3.webp"],
    frame: "phone",
    metrics: [
      { value: "3", label: "Languages" },
      { value: "Low-bandwidth", label: "Design constraint" },
    ],
  },
  {
    key: "correspondence",
    rank: 42,
    name: "Correspondence MS",
    tagline: "Document and correspondence tracking for organisations",
    category: "erp",
    kind: "Internal System",
    year: "2025",
    role: "Full-stack",
    detail:
      "Incoming and outgoing correspondence, routing, attachments and an audit trail — a Next.js front end over a containerised API, internationalised for Dari and Pashto offices.",
    tech: ["Next.js", "TypeScript", "Docker", "i18n · RTL"],
    images: ["/work/corresp-1.webp", "/work/corresp-2.webp"],
    frame: "browser",
  },

  // ── ERP & dashboards ───────────────────────────────────────────────────────
  {
    key: "cadre",
    rank: 10,
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
    live: true,
    metrics: [{ value: "19", label: "Pages" }],
    featured: true,
  },
  {
    key: "mediso",
    rank: 13,
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
    live: true,
    metrics: [{ value: "26", label: "Pages" }],
    featured: true,
  },
  {
    key: "kabulre",
    rank: 17,
    name: "Kabul Real Estate SaaS",
    tagline: "Property management for Kabul Province — listings, agents, analytics",
    category: "erp",
    kind: "Property SaaS",
    year: "2025",
    role: "Design & build",
    detail:
      "An advanced property-management platform aimed squarely at Kabul Province — active listings by district, verified agents, revenue and conversion tracking, and a market overview that ranks neighbourhoods by average price. Bilingual, with the whole dashboard readable at a glance.",
    tech: ["Next.js", "React", "TypeScript", "Redux Toolkit", "i18n"],
    images: ["/work/kabulre-1.webp"],
    frame: "browser",
    metrics: [
      { value: "By district", label: "Market analytics" },
      { value: "Bilingual", label: "EN + Dari" },
    ],
  },
  {
    key: "taskms",
    rank: 18,
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
    href: "https://taskms-ui-kit.vercel.app",
    live: true,
    metrics: [
      { value: "13", label: "Page groups" },
      { value: "Strict", label: "TypeScript" },
    ],
  },
  {
    key: "restpro",
    rank: 21,
    name: "RealEstate Pro",
    tagline: "Premium real-estate SaaS — listings, agents, deal pipeline",
    category: "erp",
    kind: "Real-estate SaaS",
    year: "2025",
    role: "Design & build",
    detail:
      "A scalable real-estate management platform on Next.js 15 and Mantine, layered with Clean Architecture — public marketing site, authentication, property search with filters, and an agent-facing back office behind it.",
    tech: ["Next.js 15", "TypeScript", "Mantine UI", "Redux Toolkit", "Clean Architecture"],
    images: ["/work/restpro-1.webp", "/work/restpro-2.webp", "/work/restpro-3.webp"],
    frame: "browser",
  },
  {
    key: "crypto",
    rank: 22,
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
    key: "tradeup",
    rank: 24,
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
    key: "lahomes",
    rank: 26,
    name: "LaHomes",
    tagline: "Real-estate analytics — properties, agents, revenue at a glance",
    category: "erp",
    kind: "Analytics Dashboard Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A dark analytics dashboard for a property business — portfolio size, agent headcount, customer growth and revenue, each with its own week-over-week trend, plus sales analytics, balance tracking and traffic attribution.",
    tech: ["Next.js", "React", "TypeScript", "Chart libraries"],
    images: ["/work/lahomes-1.webp"],
    frame: "browser",
  },
  {
    key: "learnpeak",
    rank: 35,
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
    live: true,
  },
  {
    key: "travelcrm",
    rank: 37,
    name: "TravelCRM",
    tagline: "Travel agency management — customers, cases, payments",
    category: "erp",
    kind: "CRM Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Customer records, case tracking, dashboards and payment reconciliation for travel agencies, built on Next.js with a full authentication flow.",
    tech: ["Next.js", "React", "TypeScript", "Prisma"],
    images: ["/work/travelcrm-1.webp", "/work/travelcrm-2.webp", "/work/travelcrm-3.webp"],
    frame: "browser",
    href: "https://travel-phi-olive.vercel.app/login",
    live: true,
  },
  {
    key: "pharmacy",
    rank: 38,
    name: "Pharmacy PMS",
    tagline: "Pharmacy management — stock, dispensing, prescriptions",
    category: "erp",
    kind: "Pharmacy Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Inventory, dispensing and prescription workflows in a clean light theme built on Mantine, shipped alongside a companion API and a public-facing marketing site in the same repo.",
    tech: ["React", "Vite", "Mantine UI", "Next.js", "TypeScript"],
    images: ["/work/pharmacy-1.webp", "/work/pharmweb-1.webp"],
    frame: "browser",
    href: "https://pharmacy-frontend-weld.vercel.app/",
    live: true,
  },
  {
    key: "travelx",
    rank: 45,
    name: "TravelX",
    tagline: "Travel agency ERP — tickets, visas, trips, suppliers",
    category: "erp",
    kind: "Travel ERP",
    year: "2026",
    role: "Design & build",
    detail:
      "A full travel-agency back office: ticket sales, visa applications, trip packages, destinations, supplier accounts, customer records and purchase tracking, organised feature-by-feature behind an authenticated session. Runs against a live database, so there's no public demo to point at.",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    images: [],
    frame: "browser",
    confidential: true,
    metrics: [{ value: "8", label: "Feature modules" }],
  },

  // ── Web ────────────────────────────────────────────────────────────────────
  {
    key: "aurum",
    rank: 4,
    name: "AURUM",
    tagline: "Cinematic luxury watch storefront, bilingual with true RTL",
    category: "web",
    kind: "Luxury E-commerce Kit",
    year: "2026",
    role: "Design & build",
    detail:
      "A dark, editorial storefront for a fictional Swiss watch house — six routes, a filterable collection, product detail with gallery and specs, and a wishlist. Fully bilingual in English and Dari with real right-to-left mirroring, not just translated strings. Clean Architecture with the dependency rule enforced by ESLint rather than by convention, TypeScript strict mode, and zero `any` in the codebase.",
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Clean Architecture"],
    images: ["/work/aurum-1.webp", "/work/aurum-2.webp", "/work/aurum-4.webp", "/work/aurum-3.webp"],
    frame: "browser",
    href: "https://aurum-watch-store.vercel.app",
    live: true,
    metrics: [
      { value: "EN + دری", label: "Full RTL mirror" },
      { value: "Zero", label: "`any` in the codebase" },
      { value: "6", label: "Routes" },
    ],
    featured: true,
  },
  {
    key: "roamly",
    rank: 14,
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
    live: true,
    metrics: [{ value: "11", label: "Pages" }],
    featured: true,
  },
  {
    key: "honey",
    rank: 23,
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
    live: true,
  },
  {
    key: "tbazaar",
    rank: 34,
    name: "TasksBazaar",
    tagline: "Marketplace for hiring local, verified professionals",
    category: "web",
    kind: "Marketplace Site",
    year: "2025",
    role: "Front-end",
    detail:
      "The public face of a services marketplace connecting people with vetted local professionals — home repairs, cleaning, moving, handyman work. Post a task, receive competitive bids, choose the professional, track it to completion.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    images: ["/work/tbazaar-1.webp"],
    frame: "browser",
    href: "https://tasksbazaarweb.vercel.app",
    live: true,
  },
  {
    key: "msoftware",
    rank: 39,
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
    href: "https://msoftware-1.vercel.app",
    live: true,
  },
  {
    key: "nairika-corp",
    rank: 40,
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
    live: true,
  },

  // ── Mobile ─────────────────────────────────────────────────────────────────
  {
    key: "luxe",
    rank: 9,
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
    live: true,
    metrics: [{ value: "15", label: "Screens" }],
    featured: true,
  },
  {
    key: "yum",
    rank: 12,
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
    live: true,
    metrics: [{ value: "18", label: "Screens" }],
    featured: true,
  },
  {
    key: "jewels",
    rank: 15,
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
    live: true,
    metrics: [{ value: "18", label: "Screens" }],
  },
  {
    key: "zestora",
    rank: 20,
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
    href: "https://zestora-xi.vercel.app",
    live: true,
  },
  {
    key: "tokotok",
    rank: 27,
    name: "TokoTok",
    tagline: "Electronics storefront — deals, categories, cart",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A consumer-electronics shop with category filtering, discount badging, ratings and a cart flow — the busy, deal-driven layout that marketplace shopping actually looks like.",
    tech: ["Flutter", "Dart", "Riverpod"],
    images: ["/mobile/tokotok-1.webp", "/mobile/tokotok-2.webp"],
    frame: "phone",
    href: "https://tokotok-shop.vercel.app",
    live: true,
  },
  {
    key: "verdant",
    rank: 28,
    name: "Verdant Market",
    tagline: "Plant shop — browse by light and care level",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "A botanical storefront that filters the way plant buyers actually think — by light requirement and difficulty, not just by price. Botanical names, care levels and a saved-plants shelf.",
    tech: ["Flutter", "Dart", "Riverpod"],
    images: ["/mobile/verdant-1.webp", "/mobile/verdant-2.webp"],
    frame: "phone",
    href: "https://verdant-market.vercel.app",
    live: true,
  },
  {
    key: "salesdash",
    rank: 29,
    name: "Sales Dashboard",
    tagline: "Revenue analytics in your pocket — trends by region",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Ninety-day revenue, order volume, average order value and growth, with a daily trend chart and regional attribution — analytics designed to stay readable at phone width, which is where most charts fall apart.",
    tech: ["Flutter", "Dart", "Charts"],
    images: ["/mobile/salesdash-1.webp"],
    frame: "phone",
    href: "https://sales-dashboard-chi-drab.vercel.app",
    live: true,
  },
  {
    key: "modanisa",
    rank: 33,
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
    live: true,
  },
  {
    key: "solevibe",
    rank: 36,
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
    href: "https://web-mu-pied-24.vercel.app/",
    live: true,
  },
  {
    key: "fitquest",
    rank: 43,
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
    live: true,
  },
  {
    key: "nimbus",
    rank: 44,
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
    href: "https://nimbus-bank-nu.vercel.app",
    live: true,
  },
  {
    key: "iqraa",
    rank: 46,
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
    live: true,
  },
  {
    key: "parking",
    rank: 47,
    name: "Smart Parking",
    tagline: "Real-time parking finder — map, reserve, EV charging",
    category: "mobile",
    kind: "Flutter UI Kit",
    year: "2025",
    role: "Design & build",
    detail:
      "Find spots on a map, view details, reserve cashless, manage EV charging and track bookings — one codebase running on Android, iOS and Linux desktop at 60fps.",
    tech: ["Flutter", "Dart", "Riverpod"],
    images: ["/mobile/parking-1.webp", "/mobile/parking-2.webp", "/mobile/parking-3.webp"],
    frame: "phone",
  },
  {
    key: "whatsapp",
    rank: 48,
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
    key: "kaara",
    rank: 49,
    name: "Kaara",
    tagline: "Simple sales & bookkeeping for shopkeepers, in Dari",
    category: "mobile",
    kind: "Flutter + API",
    year: "2025",
    role: "Sole developer",
    detail:
      "فروش و حساب‌داری ساده برای دکان‌ها — sales and simple bookkeeping aimed at shopkeepers who have never used accounting software, written Dari-first. Flutter client against a containerised API behind nginx.",
    tech: ["Flutter", "Dart", "REST API", "Docker", "nginx"],
    images: ["/mobile/kaara-1.webp", "/mobile/kaara-2.webp"],
    frame: "phone",
  },
  {
    key: "removemark",
    rank: 50,
    name: "Watermark Remover",
    tagline: "Strip watermarks from images and video on-device",
    category: "mobile",
    kind: "Flutter Utility",
    year: "2025",
    role: "Sole developer",
    detail:
      "Pick an image or a video, mark the watermark, and let the image-processing pipeline reconstruct what was underneath — all on-device, across JPG, PNG, MP4, AVI and MOV.",
    tech: ["Flutter", "Dart", "Image processing"],
    images: ["/mobile/removemark-1.webp", "/mobile/removemark-2.webp"],
    frame: "phone",
  },
  {
    key: "restflutter",
    rank: 51,
    name: "Real Estate App",
    tagline: "Offline-first property management on Flutter",
    category: "mobile",
    kind: "Flutter · Clean Architecture",
    year: "2025",
    role: "Sole developer",
    detail:
      "An offline-first property browser built on strict clean architecture — domain, data and presentation layers with a local store that keeps listings readable with no connection at all. It boots against its own backend, so there's no standalone demo build.",
    tech: ["Flutter", "Dart", "Clean Architecture", "Local storage"],
    images: [],
    frame: "phone",
    confidential: true,
  },
];

/**
 * Everything renders from this, never from `projects` directly. Sorting once here
 * means the grid, the filters, the rail and the command palette all agree on order
 * — and the best-looking piece leads whichever category you pick.
 */
export const rankedProjects: Project[] = [...projects].sort((a, b) => a.rank - b.rank);

export const featured = rankedProjects.filter((p) => p.featured);

/** Deployed and reachable — the ones a visitor can go and click around in. */
export const liveProjects = rankedProjects.filter((p) => p.live);

/** What the "New" tab shows: this year's builds, still ranked best-first. */
export const newProjects = rankedProjects.filter((p) => matchesFilter(p, "new"));

/** Phone gallery — the Flutter kits that have real screenshots to show. */
export const phoneGallery = rankedProjects.filter(
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
