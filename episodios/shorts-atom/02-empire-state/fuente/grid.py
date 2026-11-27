"""grid.py out.jpg cols img... → a labelled contact sheet (each 270×480)."""
import sys
from PIL import Image, ImageDraw
out, cols, ims = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
w, h = 270, 480; rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (cols * w, rows * (h + 18)), 'white'); d = ImageDraw.Draw(S)
for i, f in enumerate(ims):
    im = Image.open(f).resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 18)
    S.paste(im, (x, y + 18)); d.text((x + 4, y + 3), f.split('_')[-1].replace('.jpg', ''), fill='black')
S.save(out, quality=85)
