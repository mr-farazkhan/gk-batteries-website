"""Generate OG/social images for GK Batteries (light theme).
Run: python tools/make-images.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")

BG = (247, 249, 253)
INK = (15, 23, 42)
INK2 = (71, 85, 105)
AMBER = (180, 83, 9)
AMBER_BRIGHT = (245, 158, 11)
BLUE = (37, 99, 235)

FONTS = r"C:\Windows\Fonts"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def light_bg(w, h):
    """Soft daylight gradient with a warm glow — matches the site's light theme."""
    img = Image.new("RGB", (w, h), BG)
    glow = Image.new("RGB", (w, h), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-w * 0.20, -h * 0.70, w * 0.70, h * 0.70], fill=(255, 243, 214))
    gd.ellipse([w * 0.55, h * 0.05, w * 1.25, h * 1.45], fill=(219, 234, 254))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.blend(img, glow, 0.9)
    d = ImageDraw.Draw(img)
    for x in range(0, w, 60):
        d.line([(x, 0), (x, h)], fill=(226, 232, 241), width=1)
    for y in range(0, h, 60):
        d.line([(0, y), (w, y)], fill=(226, 232, 241), width=1)
    return img


def make_og():
    w, h = 1200, 630
    img = light_bg(w, h)
    d = ImageDraw.Draw(img)

    # logo mark
    logo_path = os.path.join(IMG, "logo.png")
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((132, 132), Image.LANCZOS)
        plate = Image.new("RGBA", (logo.width + 22, logo.height + 22), (255, 255, 255, 240))
        plate = plate.filter(ImageFilter.GaussianBlur(0.5))
        plate.alpha_composite(logo, (11, 11))
        img.paste(plate, (70, 62), plate)
        lx = 70 + plate.width + 24
    else:
        lx = 70

    d.text((lx, 72), "GK BATTERIES", font=font("arialbd.ttf", 44), fill=INK)
    d.text((lx, 124), "Alnavar  ·  Dharwad District  ·  Karnataka", font=font("arial.ttf", 21), fill=INK2)

    d.text((70, 244), "Car  ·  Inverter  ·  Tractor Batteries", font=font("arialbd.ttf", 44), fill=AMBER)
    d.text((70, 304), "Authorized Dealer — Exide  ·  Amaron  ·  SF  ·  Yokohama  ·  Dynex",
           font=font("arial.ttf", 23), fill=INK)

    d.rectangle([70, 348, 300, 352], fill=AMBER_BRIGHT)

    d.text((70, 380), "50+ years of battery craft  |  2 branches  |  Jump start on NH-67",
           font=font("arial.ttf", 23), fill=INK2)
    d.text((70, 418), "Old battery exchange  ·  Free delivery in 20 km  ·  Home installation",
           font=font("arial.ttf", 23), fill=INK2)

    # CTA pill
    d.rounded_rectangle([70, 476, 520, 542], radius=12, fill=AMBER_BRIGHT)
    d.text((100, 492), "Call 94486 67528", font=font("arialbd.ttf", 30), fill=(59, 29, 2))

    d.text((70, 566), "gkbatteries.in", font=font("arial.ttf", 21), fill=BLUE)

    out = os.path.join(IMG, "og-cover.jpg")
    img.convert("RGB").save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


def make_touch_icon():
    logo_path = os.path.join(IMG, "logo.png")
    if not os.path.exists(logo_path):
        return
    size = 180
    img = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    logo = Image.open(logo_path).convert("RGBA")
    logo.thumbnail((size - 20, size - 20), Image.LANCZOS)
    img.paste(logo, ((size - logo.width) // 2, (size - logo.height) // 2), logo)
    out = os.path.join(IMG, "apple-touch-icon.png")
    img.save(out, "PNG", optimize=True)
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    make_og()
    make_touch_icon()
