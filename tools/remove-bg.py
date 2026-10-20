"""Remove the dark studio background from the brand line-up photo so every
product image is a transparent cut-out (works on light and dark tiles).

Run: python tools/remove-bg.py
"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD = os.path.join(ROOT, "images", "products")
SRC = os.path.join(ROOT, "images", "battery-products.png")

# white studio background -> transparent
LIGHT_TARGETS = [
    "bike.webp", "automotive.webp", "tubular.webp", "tubular-2.webp",
    "tubular-3.webp", "heavyduty.webp",
]

LO = 224      # start fading here
HI = 246      # fully transparent here
SAT_MAX = 16  # max saturation for a pixel to count as "white"

# dark studio background -> transparent (flood fill from the corners)
DARK_CROPS = [
    "brand-exide.webp", "brand-exide-2.webp", "brand-exide-3.webp",
    "brand-amaron.webp", "brand-amaron-2.webp", "brand-amaron-3.webp",
    "brand-luminous.webp", "brand-tractor.webp", "brand-tractor-2.webp",
]


def strip_white(im):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    floor = int(h * 0.82)
    for y in range(h):
        floor_row = y >= floor
        lo, hi, sat = (198, 236, 44) if floor_row else (LO, HI, SAT_MAX)
        for x in range(w):
            r, g, b, a = px[x, y]
            mx, mn = max(r, g, b), min(r, g, b)
            if mx < lo or (mx - mn) > sat:
                continue
            px[x, y] = (r, g, b, 0) if mx >= hi else (r, g, b, min(a, int(255 * (hi - mx) / (hi - lo))))
    return im


def feather_edges(im, ratio=0.16):
    """Fade the outer edge of a photo so it blends into the studio panel
    instead of showing a hard rectangle."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    fx = max(2, int(w * ratio))
    fy = max(2, int(h * ratio))
    for y in range(h):
        for x in range(w):
            dx = min(x, w - 1 - x)
            dy = min(y, h - 1 - y)
            d = min(dx / fx, dy / fy)
            if d >= 1:
                continue
            a = px[x, y][3]
            px[x, y] = px[x, y][:3] + (int(a * d * d),)
    return im


def main():
    for name in LIGHT_TARGETS:
        p = os.path.join(PROD, name)
        if not os.path.exists(p):
            continue
        im = strip_white(Image.open(p))
        im.save(p, "WEBP", quality=88, method=6)
        print(f"  {name:22} white background -> transparent")

    # re-cut the brand crops from the source and flood their background out
    if os.path.exists(SRC):
        src = Image.open(SRC).convert("RGB")
        boxes = {
            "brand-exide.webp":     (20, 330, 285, 710),
            "brand-exide-2.webp":   (35, 350, 265, 650),
            "brand-exide-3.webp":   (10, 320, 295, 700),
            "brand-amaron.webp":    (290, 330, 515, 710),
            "brand-amaron-2.webp":  (300, 340, 505, 660),
            "brand-amaron-3.webp":  (285, 320, 525, 705),
            "brand-luminous.webp":  (525, 240, 710, 710),
            "brand-tractor.webp":   (710, 250, 1015, 700),
            "brand-tractor-2.webp": (720, 265, 1005, 660),
        }
        for name, box in boxes.items():
            im = feather_edges(src.crop(box))
            im.save(os.path.join(PROD, name), "WEBP", quality=90, method=6)
            print(f"  {name:22} edges feathered for the studio panel")


if __name__ == "__main__":
    main()
