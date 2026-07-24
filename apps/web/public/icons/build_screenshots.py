import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def process_screenshots():
    raw_images = [
        ("/Users/stoni/.gemini/antigravity-ide/brain/aa7622f5-3bca-46c8-8b70-9a8aad702223/homepage_screenshot_1784691552932.png", "Settlement Guides & Checklist", "All essential steps to settle in South Korea without guesswork"),
        ("/Users/stoni/.gemini/antigravity-ide/brain/aa7622f5-3bca-46c8-8b70-9a8aad702223/phrases_screenshot_1784691562072.png", "Useful Korean Phrases", "Crucial daily phrases with audio & pronunciation guides"),
        ("/Users/stoni/.gemini/antigravity-ide/brain/aa7622f5-3bca-46c8-8b70-9a8aad702223/apps_screenshot_1784691571820.png", "Curated Essential Apps", "Must-have mobile apps for navigation, banking & food delivery"),
        ("/Users/stoni/.gemini/antigravity-ide/brain/aa7622f5-3bca-46c8-8b70-9a8aad702223/reality_screenshot_1784691581013.png", "Deposit Scam Check & Reality", "Protect yourself from rental scams & get realistic survival tips")
    ]

    target_w, target_h = 1080, 1920

    for idx, (path, title, subtitle) in enumerate(raw_images, 1):
        canvas = Image.new("RGBA", (target_w, target_h), (247, 246, 251, 255))
        draw = ImageDraw.Draw(canvas)

        header_h = 360
        draw.rectangle([0, 0, target_w, header_h], fill=(255, 77, 103, 255))

        # Crop mobile UI
        src_img = Image.open(path).convert("RGBA")
        sw, sh = src_img.size

        c_left = int(sw * 0.35)
        c_right = int(sw * 0.65)
        c_top = int(sh * 0.01)
        c_bottom = int(sh * 0.99)

        mobile_crop = src_img.crop((c_left, c_top, c_right, c_bottom))

        ui_h = 1520
        aspect = mobile_crop.width / mobile_crop.height
        ui_w = int(ui_h * aspect)
        mobile_crop = mobile_crop.resize((ui_w, ui_h), Image.Resampling.LANCZOS)

        mask = Image.new("L", (ui_w, ui_h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, ui_w, ui_h], radius=40, fill=255)

        pos_x = (target_w - ui_w) // 2
        pos_y = 300

        shadow = Image.new("RGBA", (ui_w + 60, ui_h + 60), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rounded_rectangle([20, 20, ui_w + 20, ui_h + 20], radius=40, fill=(0, 0, 0, 70))
        shadow = shadow.filter(ImageFilter.GaussianBlur(24))

        canvas.alpha_composite(shadow, (pos_x - 10, pos_y - 10))
        canvas.paste(mobile_crop, (pos_x, pos_y), mask)

        out_file = f"/Users/stoni/Projects/KoreanLife/public/icons/screenshot-{idx}.png"
        canvas.convert("RGB").save(out_file, "PNG")
        print(f"Generated clean screenshot {idx}: {out_file} (1080x1920 PNG)")

if __name__ == "__main__":
    process_screenshots()
