"""Remove the plain white studio background from product photos so every
product card sits on the same dark glass tile.

Run: python tools/remove-bg.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD = os.path.join(ROOT, "images", "products")

TARGETS = [
    "bike.webp", "automotive.webp", "tubular.webp", "tubular-2.webp",
    "tubular-3.webp", "heavyduty.webp",
]

LO = 224      # start fading here
HI = 246      # fully transparent here
SAT_MAX = 16  # max saturation for a pixel to count as "white"


def strip_white(im):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    floor = int(h * 0.82)   # bottom strip = glossy floor reflection
    for y in range(h):
        floor_row = y >= floor
        lo, hi, sat = (198, 236, 44) if floor_row else (LO, HI, SAT_MAX)
        for x in range(w):
            r, g, b, a = px[x, y]
            mx, mn = max(r, g, b), min(r, g, b)
            if mx < lo:
                continue
            if (mx - mn) > sat:
                continue
            if mx >= hi:
                px[x, y] = (r, g, b, 0)
            else:
                alpha = int(255 * (hi - mx) / (hi - lo))
                px[x, y] = (r, g, b, min(a, alpha))
    return im


for name in TARGETS:
    p = os.path.join(PROD, name)
    if not os.path.exists(p):
        continue
    before = os.path.getsize(p)
    im = strip_white(Image.open(p))
    im.save(p, "WEBP", quality=88, method=6, lossless=False)
    after = os.path.getsize(p)
    print(f"  {name:22} {before//1024:>4}KB -> {after//1024:>4}KB  alpha stripped")
