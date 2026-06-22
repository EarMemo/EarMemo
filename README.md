# EarMemo

Marketing site for **EarMemo** — a private, offline-first iOS player for podcasts and audio notes.

Live at:
- **Canonical:** <https://earmemo.app/> — Cloudflare Pages (apex domain)
- **Mirror:** <https://earmemo.github.io/EarMemo/> — GitHub Pages (kept alive; every page's canonical points at earmemo.app, so search/AI consolidate on the apex)

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
- **GitHub Pages → https://earmemo.github.io/EarMemo/** — a live mirror at the project subpath. There is **no `CNAME` file** on purpose: a CNAME file would make GitHub Pages seize earmemo.app and redirect the github.io URL, which we don't want.

Why one codebase works at both a subpath and the root:
- All asset/navigation links are **relative** (`./icon.png`, `../privacy.html`, `./zh/`), so they resolve at both `/` and `/EarMemo/`.
- Every page's `canonical`, Open Graph, and JSON-LD URLs are absolute and point at **earmemo.app**, so the github.io mirror declares itself a duplicate of the apex — search and AI consolidate on earmemo.app, and the mirror is not a duplicate-content problem.

Deploy (publishes to both at once): `tools/sync-marketing-site.sh "<msg>"` pushes `site/` to the `EarMemo/EarMemo` repo; GitHub Pages rebuilds and Cloudflare Pages auto-deploys from the same push.

## Contact

- Email: <earmemo@outlook.com>
