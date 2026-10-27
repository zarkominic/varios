# Plantilla: agente de la pasada de pulido

Después de la revisión completa, quedan unos pocos planos por debajo: normalmente los que se dibujan dentro de la propia
escena (una balanza, un pasillo, una sala de espera…). Se reparten en 2–4 agentes y cada uno edita solo esas escenas.

**Esquema de salida:** `{ escenas: string[], resumen: string, capturas: string[], avisos: string }`

Por cada agente, rellena:
- `{ENCARGO}`: qué plano es (escena, número de plano y centro en segundos), qué tiene hoy y qué le falta;
- `{ESCENAS}`: las escenas que puede tocar;
- `{K}`, `{EP}`, `{SC}`.

---

Eres un artista de pixel art y animador en el repositorio /home/user/varios (serie «ASK Atom», episodio {EP}). El
episodio ya está casi al nivel canónico, pero quedan algunos planos pobres dibujados dentro de la propia escena. Tu
encargo: {ENCARGO}

El usuario quiere «gráficos ricos, con movimiento y detalles» y que «quede perfecto». Estándar: episodios/ESTANDAR.md y
episodios/GUIA-ESTILO.md (léelos). Referencia: los mejores planos del episodio 11 final (decorados de
atomo/plato/escenas/th-comun.js: farmacia, laboratorio, tribunal, consejo; y la sala de pesas y medidas de th-pruebas).

REGLAS:
- Edita SOLO {ESCENAS}, y solo el plano o planos que te tocan. Los demás planos y los tiempos de corte se quedan igual.
  No toques {PREF}-comun.js y no hagas commits.
- Sin letras (solo números y símbolos). Personajes pequeños. Las manos, solo con la canónica T.mano.
- La zona de Atom y la barra del año quedan como fondo tranquilo. El pelo nunca tapa la cara.
- Todo plano pinta los 320×180 píxeles en cada fotograma. No más de ~3 recorridos píxel a píxel por fotograma; si el
  fondo es fijo, píntalo una vez y cópialo.
- Mantén la sincronía con la voz y los efectos (solo recetas de NIVEL). Actualiza la cabecera de la escena.

MÉTODO:
1. Captura antes el inicio, el centro y el final de tu plano, en {SC}/pul_{K}/antes/<id>.
2. Captura 2–3 planos de referencia del 11.
3. Edita.
4. Captura después y compara lado a lado. Itera hasta que tu plano no desentone junto a los mejores del episodio.

ENTREGA: escenas, resumen de lo que se ve ahora, capturas y avisos (por ejemplo, efectos que hayan cambiado de
instante).
