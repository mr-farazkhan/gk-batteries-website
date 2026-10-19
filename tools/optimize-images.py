"""Optimise site images: resize oversized PNGs and emit WebP.
Run: python tools/optimize-images.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")

# display size in CSS -> keep 2x for retina, cap at 1024
MAX_PRODUCT = 520
MAX_LOGO = 192
MAX_FAVICON = 64


def save_webp(im, out, quality=82):
    im = im.convert("RGB") if im.mode not in ("RGBA", "LA", "P") else im
    if im.mode == "P":
        im = im.convert("RGBA")
    im.save(out, "WEBP", quality=quality, method=6)
    return os.path.getsize(out)


def products():
    src_dir = os.path.join(IMG, "products")
    total_before = total_after = 0
    for f in sorted(os.listdir(src_dir)):
        if not f.lower().endswith(".png"):
            continue
        p = os.path.join(src_dir, f)
        before = os.path.getsize(p)
        im = Image.open(p)
        if max(im.size) > MAX_PRODUCT:
            im.thumbnail((MAX_PRODUCT, MAX_PRODUCT), Image.LANCZOS)
        out = os.path.join(src_dir, f.replace(".png", ".webp"))
        after = save_webp(im, out, 84)
        total_before += before
        total_after += after
        print(f"  {f:26} {before//1024:>4}KB -> {after//1024:>4}KB  {im.size}")
    print(f"  products total: {total_before//1024}KB -> {total_after//1024}KB")


def logo():
    p = os.path.join(IMG, "logo.png")
    if not os.path.exists(p):
        return
    before = os.path.getsize(p)
    im = Image.open(p).convert("RGBA")
    im.thumbnail((MAX_LOGO, MAX_LOGO), Image.LANCZOS)
    out = os.path.join(IMG, "logo.webp")
    after = save_webp(im, out, 90)
    print(f"  logo.png -> logo.webp  {before//1024}KB -> {after//1024}KB  {im.size}")


def favicon():
    p = os.path.join(IMG, "favicon.png")
    if not os.path.exists(p):
        return
    before = os.path.getsize(p)
    im = Image.open(p).convert("RGBA")
    im.thumbnail((MAX_FAVICON, MAX_FAVICON), Image.LANCZOS)
    out = os.path.join(IMG, "favicon.png")
    after = save_webp(im, out, 90)
    print(f"  favicon.png  {before//1024}KB -> {after//1024}KB  {im.size}")


if __name__ == "__main__":
    print("products:")
    products()
    print("brand:")
    logo()
    favicon()
