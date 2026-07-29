export const profile = {
  name: "Mosawer Ghousi",
  shortName: "MOSAWER GHOUSI",
  email: "a.mosawer.ghousi@gmail.com",
  phone: "+93 780 345 384",
  phoneHref: "tel:+93780345384",
  github: "https://github.com/mosawerghousi",
  linkedin: "https://www.linkedin.com/in/mosawerghousi/",
  portfolio: "https://mosawerghousi.vercel.app",
};

export const navLinks = [
  { label: "PLAYBOOK", href: "#playbook" },
  { label: "SOCIALS", href: "#socials" },
  { label: "CONTACTS", href: "#contacts" },
];

export type PlayCard = {
  key: string;
  title: string;
  sub: string;
  href: string;
  kind: "laptop" | "phones";
  images: string[];
};

export const playCards: PlayCard[] = [
  {
    key: "saas",
    title: "SAAS & ERP",
    sub: "ZOROO — BUSINESS PLATFORM",
    href: "https://zoroo.net",
    kind: "laptop",
    images: ["/projects/zoroo.png"],
  },
  {
    key: "web",
    title: "WEB & E-COM",
    sub: "NAIRIKA — STOREFRONT",
    href: "https://nairika.org",
    kind: "laptop",
    images: ["/projects/nairika.png"],
  },
  {
    key: "mobile",
    title: "MOBILE APPS",
    sub: "FLUTTER — 7 PRODUCTION KITS",
    href: "https://mosawerghousi.vercel.app",
    kind: "phones",
    images: [
      "/projects/luxe-home.png",
      "/projects/yum-home.png",
      "/projects/jewels-home.png",
    ],
  },
  {
    key: "uikits",
    title: "UI KITS",
    sub: "REACT & NEXT.JS — 7 TEMPLATES",
    href: "https://mosawerghousi.vercel.app",
    kind: "laptop",
    images: ["/projects/cadre-1.png"],
  },
];

export const socials = [
  { label: "GITHUB", href: "https://github.com/mosawerghousi", meta: "@mosawerghousi" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/mosawerghousi/", meta: "in/mosawerghousi" },
  { label: "EMAIL", href: "mailto:a.mosawer.ghousi@gmail.com", meta: "a.mosawer.ghousi@gmail.com" },
  { label: "WHATSAPP", href: "tel:+93780345384", meta: "+93 780 345 384" },
];
