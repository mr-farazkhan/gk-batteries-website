"""One-off: swap lucide <i data-lucide> tags for the SVG sprite.
Run: python tools/migrate-icons.py
"""
import io
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATIC = re.compile(r'<i data-lucide="([a-z0-9-]+)"></i>')


def sprite(name):
    return ('<svg class="ico" aria-hidden="true" focusable="false">'
            '<use href="/images/icons.svg#i-%s"></use></svg>' % name)


def convert(path, rel_prefix=""):
    p = os.path.join(ROOT, path)
    s = io.open(p, encoding="utf-8").read()
    before = s
    s = STATIC.sub(lambda m: sprite(m.group(1)), s)
    if s != before:
        io.open(p, "w", encoding="utf-8", newline="").write(s)
        print("updated", path)
    else:
        print("no change", path)


for f in ["index.html", "404.html", "privacy.html", "analytics.js", "tools/build.js"]:
    convert(f)
