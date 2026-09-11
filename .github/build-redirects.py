#!/usr/bin/env python3
"""Build the GitHub Pages redirect shell for the earmemo.github.io/EarMemo/ mirror.

The canonical site is https://earmemo.app/ (Cloudflare Pages, served straight from
this repo's root). GitHub Pages used to serve the same files as a mirror; now it
serves only redirects so search engines and AI crawlers move the mirror's weight
onto the apex instead of splitting it.

GitHub Pages cannot emit server-side 301s for a project site, so every HTML path
becomes a 0-second <meta refresh> stub (Google treats that as a permanent
redirect) plus a <link rel="canonical"> and a plain link as fallback. Text files
that crawlers fetch by exact path (llms.txt, robots.txt, pricing.md) get a
one-line pointer to the apex. 404.html catches anything else via JS.

Usage: build-redirects.py <site-root> <out-dir>
"""
import sys
from pathlib import Path

APEX = "https://earmemo.app"
TEXT_STUBS = {"llms.txt", "pricing.md"}
SKIP = {"README.md", "launch-posts.md", "sitemap.xml"}


def html_stub(target: str) -> str:
    return f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>EarMemo has moved to earmemo.app</title>
<meta http-equiv="refresh" content="0; url={target}">
<link rel="canonical" href="{target}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<p>EarMemo has moved. Continue to <a href="{target}">{target}</a>.</p>
</html>
"""


def main(site: Path, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    written = []
    for src in sorted(site.rglob("*")):
        if not src.is_file():
            continue
        rel = src.relative_to(site)
        if rel.parts[0] == ".github" or rel.name in SKIP or rel.name.startswith("."):
            continue
        if src.suffix == ".html":
            # Cloudflare Pages serves clean URLs and 307s "x.html" -> "/x";
            # point straight at the final URL so this is a single hop.
            path = "/" + rel.as_posix()
            if rel.name == "index.html":
                path = path[: -len("index.html")]
            else:
                path = path[: -len(".html")]
            body = html_stub(APEX + path)
        elif rel.name in TEXT_STUBS:
            body = f"# Moved. The current version of this file lives at {APEX}/{rel.as_posix()}\n"
        else:
            continue  # images, CSS: nothing to redirect, let them 404
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(body, encoding="utf-8")
        written.append(rel.as_posix())

    # robots.txt: crawlable, but never advertise a sitemap on the mirror.
    (out / "robots.txt").write_text(
        "# GitHub Pages mirror of https://earmemo.app/ — every page redirects there.\n"
        "User-agent: *\nAllow: /\n",
        encoding="utf-8",
    )
    written.append("robots.txt")

    # 404.html: GitHub Pages serves this for unknown paths; strip the /EarMemo prefix
    # and hand the same path to the apex.
    (out / "404.html").write_text(
        f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>EarMemo has moved to earmemo.app</title>
<link rel="canonical" href="{APEX}/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
  var p = location.pathname.replace(/^\\/EarMemo/, "");
  location.replace("{APEX}" + p + location.search + location.hash);
</script>
<p>EarMemo has moved. Continue to <a href="{APEX}/">{APEX}/</a>.</p>
</html>
""",
        encoding="utf-8",
    )
    written.append("404.html")
    (out / ".nojekyll").write_text("", encoding="utf-8")

    for w in written:
        print(w)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(Path(sys.argv[1]), Path(sys.argv[2]))
