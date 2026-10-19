"""Prepare the real GK Batteries photos for the site.

Creates:
  images/products/*.webp   — product card images (light + dark tone)
  images/brands-lineup.webp
  images/scene-tractor-install.webp
  images/scene-inverter-setup.webp
  images/storefront-azad.webp

Run: python tools/prepare-product-images.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
PROD = os.path.join(IMG, "products")

PRODUCT_MAX = 560      # card image box is 280x200 -> 2x is plenty
SCENE_MAX = 900
BRAND_MAX = 760


def webp(im, out, max_side, quality=86):
    im = im.convert("RGB")
    if max(im.size) > max_side:
        im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(out, "WEBP", quality=quality, method=6)
    return im.size, os.path.getsize(out) // 1024


def crop_and_save(src, box, out, max_side, quality=86):
    im = Image.open(src).convert("RGB").crop(box)
    return webp(im, out, max_side, quality)


def main():
    os.makedirs(PROD, exist_ok=True)

    # ── 1. brand-accurate crops out of the real 4-brand line-up photo ──
    lineup = os.path.join(IMG, "battery-products.png")
    if os.path.exists(lineup):
        crops = {
            # name: (box, max_side)
            "brand-exide.webp":     ((20, 330, 285, 710), PRODUCT_MAX),    # red EXIDE automotive
            "brand-exide-2.webp":   ((35, 350, 265, 650), PRODUCT_MAX),    # tighter on the EXIDE label
            "brand-exide-3.webp":   ((10, 320, 295, 700), PRODUCT_MAX),    # wider EXIDE
            "brand-amaron.webp":    ((290, 330, 515, 710), PRODUCT_MAX),   # black AMARON
            "brand-amaron-2.webp":  ((300, 340, 505, 660), PRODUCT_MAX),   # tighter AMARON
            "brand-amaron-3.webp":  ((285, 320, 525, 705), PRODUCT_MAX),   # wider AMARON
            "brand-luminous.webp":  ((525, 240, 710, 710), PRODUCT_MAX),   # white LUMINOUS tall tubular
            "brand-tractor.webp":   ((710, 250, 1015, 700), PRODUCT_MAX),  # green TRACTOR / PowerMax
            "brand-tractor-2.webp": ((720, 265, 1005, 660), PRODUCT_MAX),  # tighter tractor
        }
        for name, (box, mx) in crops.items():
            size, kb = crop_and_save(lineup, box, os.path.join(PROD, name), mx)
            print(f"  {name:26} {size}  {kb}KB")
        size, kb = webp(Image.open(lineup), os.path.join(IMG, "brands-lineup.webp"), BRAND_MAX)
        print(f"  brands-lineup.webp     {size}  {kb}KB")

    # ── 2. type-accurate product photos (with crop variants) ──
    types = {
        "bike.webp":        ("bike-battery.png", PRODUCT_MAX, None),
        "automotive.webp":  ("car-battery.png", PRODUCT_MAX, (0, 0, 1024, 950)),
        "tubular.webp":     ("inverter-battery.png", PRODUCT_MAX, None),
        "tubular-2.webp":   ("inverter-battery.png", PRODUCT_MAX, (140, 120, 880, 900)),
        "tubular-3.webp":   ("inverter-battery.png", PRODUCT_MAX, (60, 60, 960, 980)),
        "heavyduty.webp":   ("tractor-battery-prod.png", PRODUCT_MAX, (0, 0, 1024, 975)),
    }
    for name, (src, mx, box) in types.items():
        s = os.path.join(IMG, src)
        if not os.path.exists(s):
            continue
        im = Image.open(s).convert("RGB")
        if box:
            im = im.crop(box)
        size, kb = webp(im, os.path.join(PROD, name), mx)
        print(f"  {name:26} {size}  {kb}KB")

    # ── 3. scene photography (proof of real work) ──
    scenes = {
        "scene-tractor-install.webp": ("tractor-battery.png", SCENE_MAX),
        "scene-inverter-setup.webp": ("inverter-setup.png", SCENE_MAX),
        "storefront-azad.webp":       ("storefront-azad.png", SCENE_MAX),
    }
    for name, (src, mx) in scenes.items():
        s = os.path.join(IMG, src)
        if not os.path.exists(s):
            continue
        size, kb = webp(Image.open(s), os.path.join(IMG, name), mx, 84)
        print(f"  {name:26} {size}  {kb}KB")


if __name__ == "__main__":
    main()
