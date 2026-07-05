# MK Advisory — Premium Financial Advisory Landing Page

> **Smart Advice. Stronger Future.**
> A world-class, fintech-style static website for **MK Advisory**, built to convert visitors into WhatsApp enquiries and phone calls.

Live-ready, dependency-free (except a few CDN libraries), and directly deployable to **GitHub Pages** with zero build steps.

---

## ✨ Highlights

- **Modern fintech aesthetic** — glassmorphism, soft gradients, bento service grid, animated hero, dark mode.
- **Conversion-focused** — sticky mobile CTA (Call / WhatsApp / Book), WhatsApp-powered enquiry form, prominent CTAs everywhere.
- **Fast & accessible** — semantic HTML5, WCAG-minded, lazy assets, `prefers-reduced-motion` support, Lighthouse-friendly.
- **SEO-ready** — meta + Open Graph + Twitter tags, `LocalBusiness` & `FAQ` JSON-LD, `sitemap.xml`, `robots.txt`, canonical URL.
- **Pure front-end** — HTML + CSS + vanilla ES6. No Node, no bundlers, no frameworks.

---

## 📁 Project Structure

```
mk-advisory/
├── index.html            # Single-page site (all sections)
├── style.css             # Theming, layout, components, dark mode, print
├── script.js             # Theme toggle, counters, accordion, WhatsApp form, menu
├── site.webmanifest      # PWA metadata
├── robots.txt            # Crawler directives
├── sitemap.xml           # XML sitemap
├── README.md             # This file
└── assets/
    ├── logo.svg          # Trust-crest logo + wordmark lockup (standalone)
    ├── favicon.svg       # Trust-crest mark — favicon, app icon, header & footer
    ├── hero-dashboard.svg# Hero illustration
    └── og-image.svg      # Social share image (1200×630)
```

---

## 🚀 Deploy to GitHub Pages

1. **Create a repository** (e.g. `mkadvisory` or `mkadvisory.github.io`).
2. Push all files from this folder to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Launch MK Advisory site"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. In GitHub → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: `main` / `/root` → **Save**.
4. Your site goes live at `https://<user>.github.io/<repo>/` within a minute.

### Custom domain (`mkadvisory.in`)
- Add a file named `CNAME` containing `mkadvisory.in`.
- Point your domain's DNS (A / CNAME records) to GitHub Pages per [GitHub's guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
- The site already uses `https://mkadvisory.in/` as the canonical URL, sitemap host, and OG URL.

> **Local preview:** just open `index.html` in a browser, or run `python3 -m http.server 8080` in this folder and visit `http://localhost:8080`.

---

## 🎨 Customization

### Brand colours & theming
All colours, radii, shadows, and gradients are CSS variables in `:root` (and `[data-theme="dark"]`) at the top of **`style.css`**:

```css
--green-800: #1B5E20;  /* primary   */
--green-700: #2E7D32;  /* secondary */
--emerald:   #10B981;  /* accent    */
--gold:      #C9A227;  /* premium accent */
```

### Contact details (update in one pass)
- **Phone / WhatsApp:** number lives in `script.js` → `WA_NUMBER = "919821299970"` and in the `tel:` links inside `index.html`.
- **Email:** `meghana.khetmal@mkadvisory.in` (search & replace in `index.html`).
- **Default WhatsApp message:** `script.js` → `DEFAULT_MSG`.

### Services, testimonials, FAQ
Plain HTML blocks in `index.html` — duplicate a card and edit the text/icon. Icons use [Material Symbols](https://fonts.google.com/icons) (`<span class="material-symbols-rounded">icon_name</span>`).

### Social share image (recommended)
`assets/og-image.svg` is provided as a crisp placeholder. Some platforms prefer PNG for previews — export a `1200×630` PNG (e.g. via [CloudConvert](https://cloudconvert.com/svg-to-png)) as `assets/og-image.png` and update the two `og:image` / `twitter:image` tags in `index.html`.

### Google Maps (optional)
The contact section uses a lightweight styled map placeholder (keeps the site fast). To embed a real map, replace the `.map-placeholder` block with a Google Maps `<iframe>` (add `loading="lazy"`).

---

## 🧩 Tech & Libraries (all via CDN)

| Purpose | Library |
|---|---|
| Typography | [Inter](https://fonts.google.com/specimen/Inter) |
| Icons | [Material Symbols Rounded](https://fonts.google.com/icons) |
| Scroll animations | [AOS](https://michalsnik.github.io/aos/) |
| Everything else | Vanilla CSS + ES6 |

No other runtime dependencies. Counters, accordion, theme toggle, ripple, and the WhatsApp form are hand-written for performance.

---

## ♿ Accessibility & Performance Notes

- Single `<h1>`, logical heading order, landmark elements, skip-link, visible focus states.
- Colour contrast tuned for both light and dark themes; icons have accessible labels.
- Animations respect `prefers-reduced-motion`; images use explicit dimensions to avoid layout shift.
- Print stylesheet hides chrome and lays out content cleanly.

**Lighthouse tip:** serve over HTTPS (GitHub Pages does this automatically) and keep the CDN links intact for best caching.

---

## 📞 Contact

**MK Advisory** — Meghana Khetmal & team
📱 +91 98212 99970 · ✉️ meghana.khetmal@mkadvisory.in · 🌐 [mkadvisory.in](https://mkadvisory.in)

---

© 2026 MK Advisory. All rights reserved.
