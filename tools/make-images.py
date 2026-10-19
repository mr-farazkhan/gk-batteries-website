"""Generate OG/social images for GK Batteries.
Run: python tools/make-images.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")

BG = (10, 14, 26)
AMBER = (245, 158, 11)
BLUE = (59, 130, 246)
TEXT = (241, 245, 249)
TEXT2 = (148, 163, 184)

FONTS = r"C:\Windows\Fonts"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def draw_bg(d, w, h):
    """Radial glows + subtle grid, matching the site theme."""
    img = Image.new("RGB", (w, h), BG)
    glow = Image.new("RGB", (w, h), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-w * 0.25, -h * 0.55, w * 0.62, h * 0.72], fill=(38, 20, 4))
    gd.ellipse([w * 0.55, h * 0.15, w * 1.2, h * 1.35], fill=(6, 16, 42))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.blend(img, glow, 0.85)
    d = ImageDraw.Draw(img)
    for x in range(0, w, 60):
        d.line([(x, 0), (x, h)], fill=(16, 24, 42), width=1)
    for y in range(0, h, 60):
        d.line([(0, y), (w, y)], fill=(16, 24, 42), width=1)
    return img


def make_og():
    w, h = 1200, 630
    img = draw_bg(None, w, h)
    d = ImageDraw.Draw(img)

    # logo mark
    logo_path = os.path.join(IMG, "logo.png")
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((150, 150), Image.LANCZOS)
        # paste on a rounded dark plate so the transparent logo reads clearly
        plate = Image.new("RGBA", (logo.width + 28, logo.height + 28), (16, 22, 38, 235))
        plate = plate.filter(ImageFilter.GaussianBlur(0.5))
        plate.alpha_composite(logo, (14, 14))
        img.paste(plate, (70, 66), plate)
        lx = 70 + plate.width + 26
    else:
        lx = 70

    # brand line
    d.text((lx, 78), "GK BATTERIES", font=font("arialbd.ttf", 46), fill=TEXT)
    d.text((lx, 132), "Alnavar  ·  Dharwad District  ·  Karnataka", font=font("arial.ttf", 22), fill=TEXT2)

    # headline
    d.text((70, 250), "Car  ·  Inverter  ·  Tractor Batteries", font=font("arialbd.ttf", 46), fill=AMBER)
    d.text((70, 312), "Authorized Dealer — Exide  ·  Amaron  ·  SF  ·  Yokohama  ·  Dynex",
           font=font("arial.ttf", 24), fill=TEXT)

    # accent underline
    d.rectangle([70, 358, 300, 362], fill=AMBER)

    d.text((70, 392), "50+ years of battery craft  |  2 branches  |  Jump start on NH-67",
           font=font("arial.ttf", 24), fill=TEXT2)
    d.text((70, 432), "Old battery exchange  ·  Free delivery in 20 km  ·  Home installation",
           font=font("arial.ttf", 24), fill=TEXT2)

    # CTA pill
    d.rounded_rectangle([70, 492, 520, 556], radius=12, fill=AMBER)
    d.text((100, 508), "Call 94486 67528", font=font("arialbd.ttf", 30), fill=(0, 0, 0))

    d.text((70, 566), "gkbatteries.in", font=font("arial.ttf", 20), fill=BLUE)

    out = os.path.join(IMG, "og-cover.jpg")
    img.convert("RGB").save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


def make_touch_icon():
    logo_path = os.path.join(IMG, "logo.png")
    if not os.path.exists(logo_path):
        return
    size = 180
    img = Image.new("RGBA", (size, size), (10, 14, 26, 255))
    logo = Image.open(logo_path).convert("RGBA")
    logo.thumbnail((size - 24, size - 24), Image.LANCZOS)
    img.paste(logo, ((size - logo.width) // 2, (size - logo.height) // 2), logo)
    out = os.path.join(IMG, "apple-touch-icon.png")
    img.save(out, "PNG", optimize=True)
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    make_og()
    make_touch_icon()
