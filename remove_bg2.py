from PIL import Image, ImageChops, ImageDraw

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Create a background of pure white
    bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
    
    # Get difference
    diff = ImageChops.difference(img, bg)
    
    # Bounding box of the non-white area (the circle)
    bbox = diff.getbbox()
    
    if bbox:
        # Create a mask
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        
        # Draw a filled ellipse in the bounding box
        # We might need a small padding if the circle has antialiasing
        # We'll draw the ellipse slightly larger to not cut off shadows
        draw.ellipse(bbox, fill=255)
        
        # Apply the mask to the image
        img.putalpha(mask)
        
        # Crop the image to the bounding box
        img = img.crop(bbox)
        
        img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_bg('assets/logo.jpg', 'assets/logo.png')
