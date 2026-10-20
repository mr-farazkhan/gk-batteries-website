"""Subset the self-hosted fonts to the characters the site actually uses.

Cuts Inter from 48 KB to a few KB, so the webfont arrives before first paint
and the LCP is not delayed by a font swap.

Run: python tools/subset-fonts.py
"""
import os
import re
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "fonts")

# every character that can appear on the site
def collect_charset():
    chars = set()

    def add(text):
        for ch in text:
            if ord(ch) > 31:
                chars.add(ch)

    # data.js holds all the copy
    for f in ["data.js", "index.html", "script.js", "privacy.html", "404.html",
              "gk-batteries.md", "llms.txt", "ANALYTICS.md", "README.md"]:
        p = os.path.join(ROOT, f)
        if os.path.exists(p):
            add(open(p, encoding="utf-8").read())

    # always include the full printable ASCII range + typographic extras
    for i in range(0x20, 0x7F):
        chars.add(chr(i))
    chars.update("₹·—–…“”‘’°×→✓✔●■★☆©®™±≥≤≠")
    return "".join(sorted(chars))


def main():
    from fontTools import subset
    from fontTools.ttLib import TTFont

    charset = collect_charset()
    print(f"[subset] {len(charset)} characters in the site charset")

    before = after = 0
    for path in sorted(glob.glob(os.path.join(FONTS, "*.woff2"))):
        before += os.path.getsize(path)
        font = TTFont(path)
        options = subset.Options()
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.recommended_glyphs = True
        options.drop_tables += ["DSIG"]
        options.flavor = "woff2"
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(text=charset)
        subsetter.subset(font)
        font.flavor = "woff2"
        font.save(path)
        after += os.path.getsize(path)
        print(f"  {os.path.basename(path):34} {os.path.getsize(path)//1024:>4}KB")

    print(f"[subset] {before//1024} KB -> {after//1024} KB")


if __name__ == "__main__":
    main()
