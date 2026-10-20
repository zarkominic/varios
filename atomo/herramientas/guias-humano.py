"""Dibuja las líneas de atomo/plato/HUMANO.md sobre una persona para comprobar sus proporciones.

Uso: python3 atomo/herramientas/guias-humano.py <imagen> <x_centro> <y_coronilla> <y_suela> [--salida <png>]
Escribe <imagen>-guias.png (o --salida) con las líneas, las anchuras de hombros y caderas, y el largo
de cada tramo del brazo dibujado como regla vertical junto a la persona.
"""
import sys
from PIL import Image, ImageDraw, ImageFont

LINEAS = [('coronilla', 0.0), ('barbilla', 0.17), ('hombros', 0.21), ('codos · cintura', 0.40),
          ('muñecas · entrepierna', 0.53), ('dedos', 0.63), ('rodillas', 0.73), ('suelo', 1.0)]
ANCHOS = [('hombros', 0.21, 0.25), ('caderas', 0.53, 0.19)]
TRAMOS = [('brazo', 0.18), ('antebrazo', 0.14), ('mano', 0.10)]

args = sys.argv[1:]
salida = args.pop(args.index('--salida') + 1) if '--salida' in args else None
if '--salida' in args:
    args.remove('--salida')
imagen, xc, y0, y1 = args[0], *map(float, args[1:4])
salida = salida or imagen.rsplit('.', 1)[0] + '-guias.png'
H = y1 - y0

img = Image.open(imagen).convert('RGB')
d = ImageDraw.Draw(img, 'RGBA')
try:
    fuente = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', max(12, int(H / 40)))
except OSError:
    fuente = ImageFont.load_default()
media = 0.3 * H
for nombre, f in LINEAS:
    y = y0 + f * H
    d.line([(xc - media, y), (xc + media, y)], fill=(255, 40, 200, 220), width=2)
    d.text((xc + media + 6, y - H / 80), nombre, fill=(255, 40, 200, 255), font=fuente)
for nombre, f, ancho in ANCHOS:
    y = y0 + f * H + 4
    d.line([(xc - ancho * H / 2, y), (xc + ancho * H / 2, y)], fill=(40, 220, 255, 230), width=4)
x = xc - media - 14
y = y0 + 0.21 * H
for k, (nombre, f) in enumerate(TRAMOS):
    color = [(255, 220, 0, 230), (0, 230, 120, 230), (255, 120, 0, 230)][k]
    d.line([(x, y), (x, y + f * H)], fill=color, width=6)
    d.text((x - 8 - d.textlength(nombre, font=fuente), y + f * H / 2 - H / 80), nombre, fill=color, font=fuente)
    y += f * H
img.save(salida)
print(salida)
