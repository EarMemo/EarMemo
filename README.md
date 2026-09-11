# EarMemo

Marketing site for **EarMemo** — a private, offline-first iOS player for podcasts and audio notes.

Live at:
- **Canonical:** <https://earmemo.app/> — Cloudflare Pages (apex domain)
- **Redirect shell:** <https://earmemo.github.io/EarMemo/> — GitHub Pages serves only redirects to earmemo.app (see Hosting)

## Contents

| File | Purpose |
|---|---|
| `index.html` | English landing page with SoftwareApplication + FAQPage JSON-LD |
| `zh/index.html` | Simplified-Chinese landing page (mirror of `index.html`, identical layout/CSS) |
| `privacy.html`, `zh/privacy.html` | Privacy policy (EN / 简体中文) |
| `img/en/*.webp`, `img/zh/*.webp` | Clean device screenshots per locale (`player`, `notes`, `stats`, `wifi`, `privacy`) |
| `icon.png` | App icon (favicon + apple-touch-icon) |
| `og.png` | 1200×630 Open Graph / Twitter social card |
| `llms.txt` | Plain-text summary for LLMs / AI agents ([llmstxt.org](https://llmstxt.org)) |
| `pricing.md` | Machine-readable pricing for AI agents |
| `robots.txt` | Allows all search + AI crawlers; points to the sitemap |
| `sitemap.xml` | Sitemap with `en` / `zh-Hans` hreflang |

## Images

Marketing copy is **never baked into images** — every headline is real HTML text (selectable, translatable, crawlable). Device shots are the clean app UI only, framed in a CSS iPhone bezel.

- `tools/build-site-images.sh [UDID]` — captures the five showcase scenes from a booted simulator (EN + ZH) via `tools/capture_showcases.sh`, then encodes web-weight WebP (900px wide, q82) into `img/<lang>/`. Requires `cwebp` (`brew install webp`).
- `tools/render-og.py` — renders `og.png` (wordmark + tagline + framed `player` shot) with Pillow.

## Hosting

The same files are served from two places, out of one repo (`EarMemo/EarMemo`):

- **Cloudflare Pages → https://earmemo.app/** — the canonical site (apex domain). DNS for earmemo.app is on Cloudflare; the custom domain is set in the Cloudflare Pages dashboard (not via a repo file).
- **GitHub Pages → https://earmemo.github.io/EarMemo/** — a **redirect shell**, not a mirror. The github.io URL ranked first for the brand term before earmemo.app existed (bought 2026-06-17); serving redirects moves that weight to the apex instead of splitting it. `.github/workflows/pages.yml` runs `.github/build-redirects.py`, which turns every `*.html` into a 0-second `<meta refresh>` + canonical stub pointing at the **clean** apex URL (Cloudflare strips `.html`), writes one-line pointers for `llms.txt` / `pricing.md`, a minimal `robots.txt` with no sitemap, and a `404.html` that JS-redirects any other path. Images and `sitemap.xml` are not published there. Requires repo Settings → Pages → Source = **GitHub Actions**. There is **no `CNAME` file** on purpose: a CNAME file would make GitHub Pages seize earmemo.app.

All asset/navigation links are **relative** (`./icon.png`, `../privacy.html`, `./zh/`), and every page's `canonical`, Open Graph, and JSON-LD URLs are absolute and point at **earmemo.app**.

Deploy: `tools/sync-marketing-site.sh "<msg>"` pushes `site/` (including `.github/`) to the `EarMemo/EarMemo` repo; Cloudflare Pages deploys the real site from that push and the workflow rebuilds the redirect shell on GitHub Pages.

## Contact

- Email: <earmemo@outlook.com>
