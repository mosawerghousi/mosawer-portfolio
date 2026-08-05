# Mosawer Ghousi — Portfolio

Personal portfolio for **Mosawer Ghousi**, full-stack developer & DevOps engineer based in Kabul, Afghanistan.

A single long-form page covering the full body of work — shipped products, ERP systems,
storefronts, web templates and Flutter UI kits — with a filterable catalogue, per-project
detail overlays and a ⌘K palette for jumping straight to any of them.

Visual language inspired by [Purrweb's "Landing | Designer portfolio"](https://dribbble.com/shots/19871911-Landing-Designer-portfolio)
Dribbble shot — dark grainy gradients, a cursor-following glass lens with chromatic aberration.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation
- [Lenis](https://lenis.darkroom.engineering) smooth scrolling

## Sections

| # | Section | What's in it |
|---|---------|--------------|
| — | Hero | Headline with the cursor-following glass lens |
| 01 | Studio | Portrait, positioning copy, animated stat counters |
| 02 | Work | The full catalogue, filterable by category, with detail overlays |
| 03 | Mobile | Drag-scrollable rail of every Flutter screen in device frames |
| 04 | Track record | Expandable experience timeline with a scroll-linked spine |
| 05 | Toolkit | Stack, education, certifications |
| 06 | Contact | CTA, socials, footer |

## Highlights

- **Glass lens cursor effect** — a spring-following circle that magnifies the headline through
  an SVG RGB-split filter (chromatic aberration) and backdrop blur. The magnified copy is the
  same component as the real one, so the two can't drift apart.
- **Command palette (⌘K)** — searches every project, section and contact link; selecting a
  project scrolls to the grid and opens its card.
- **Custom cursor** — a dot plus a lagging ring that expands into a labelled disc. Elements opt
  in with `data-cursor="View"`.
- **Filterable work grid** — layout-animated category filtering, 3D tilt cards with a
  pointer-tracked glare, and a detail overlay per project.
- **Device framing** — screenshots render inside browser or phone chrome so they read as
  products. Client work without publishable screens falls back to a typographic spec plate.
- **Animated mesh gradients** — radial-gradient blobs animated with Motion (no CSS `blur()`
  filters, so it stays fast), plus an SVG-turbulence film grain overlay.
- **Preloader** — counts to 100 once per tab, tracked with a `sessionStorage` flag.
- Generated Open Graph image, JSON-LD `Person` schema, and a full `prefers-reduced-motion` path.

## Content

Everything renders from [`lib/data.ts`](lib/data.ts) — profile, stats, the project catalogue,
experience, skills and certifications. Add a project by appending to `projects[]`; the grid,
the filter counts, the mobile rail and the command palette all pick it up automatically.

Screenshots live in `public/work` (browser-framed, 16:10) and `public/mobile`
(phone-framed, 430×868). Both are pre-sized webp.

Facts here mirror `content/profile.ts` in the `mosawer-cv` workspace — edit both if one changes.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Contact

- GitHub: [@mosawerghousi](https://github.com/mosawerghousi)
- LinkedIn: [in/mosawerghousi](https://www.linkedin.com/in/mosawerghousi/)
- Email: a.mosawer.ghousi@gmail.com
