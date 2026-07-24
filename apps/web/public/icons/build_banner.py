import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def build_feature_graphic():
    width, height = 1024, 500
    canvas = Image.new("RGBA", (width, height), (255, 77, 103, 255))
    draw = ImageDraw.Draw(canvas)

    # 1. Load actual screenshot
    screenshot_path = "/Users/stoni/.gemini/antigravity-ide/brain/aa7622f5-3bca-46c8-8b70-9a8aad702223/koreanlife_load_verification_1784691276381.png"
    src_img = Image.open(screenshot_path).convert("RGBA")

    # Crop central mobile UI area
    src_w, src_h = src_img.size
    crop_left = int(src_w * 0.36)
    crop_right = int(src_w * 0.64)
    crop_top = int(src_h * 0.02)
    crop_bottom = int(src_h * 0.98)
    
    mobile_ui = src_img.crop((crop_left, crop_top, crop_right, crop_bottom))
    
    # Target height = 440px, aspect ratio strictly preserved!
    target_h = 440
    aspect = mobile_ui.width / mobile_ui.height
    target_w = int(target_h * aspect)
    mobile_ui = mobile_ui.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Rounded corners mask
    mask = Image.new("L", (target_w, target_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, target_w, target_h], radius=24, fill=255)

    pos_x = 100
    pos_y = (height - target_h) // 2
    
    # Soft Drop Shadow
    shadow = Image.new("RGBA", (target_w + 40, target_h + 40), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([15, 15, target_w + 15, target_h + 15], radius=24, fill=(0, 0, 0, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    
    canvas.alpha_composite(shadow, (pos_x - 10, pos_y - 10))
    canvas.paste(mobile_ui, (pos_x, pos_y), mask)

    # 2. Paste minimal App Icon on right side
    icon_path = "/Users/stoni/Projects/KoreanLife/public/icons/icon-512.png"
    app_icon = Image.open(icon_path).convert("RGBA").resize((130, 130), Image.Resampling.LANCZOS)
    icon_mask = Image.new("L", (130, 130), 0)
    ImageDraw.Draw(icon_mask).rounded_rectangle([0, 0, 130, 130], radius=30, fill=255)
    
    icon_x = 520
    icon_y = (height - 130) // 2
    
    icon_shadow = Image.new("RGBA", (160, 160), (0, 0, 0, 0))
    ImageDraw.Draw(icon_shadow).rounded_rectangle([10, 10, 140, 140], radius=30, fill=(0, 0, 0, 60))
    icon_shadow = icon_shadow.filter(ImageFilter.GaussianBlur(12))
    
    canvas.alpha_composite(icon_shadow, (icon_x - 10, icon_y - 10))
    canvas.paste(app_icon, (icon_x, icon_y), icon_mask)

    # Export PNG
    output_path = "/Users/stoni/Projects/KoreanLife/public/icons/feature-graphic.png"
    canvas.convert("RGB").save(output_path, "PNG")
    print("Exported clean non-distorted feature graphic at:", output_path)

if __name__ == "__main__":
    build_feature_graphic()
