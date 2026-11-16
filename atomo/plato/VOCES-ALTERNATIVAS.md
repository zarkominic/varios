# Voces con más emoción que Kokoro: investigación del 16/11/2026

Pedida por el usuario: «voces que podamos usar que tengan más emoción y suenen menos robóticas». Dos agentes revisaron
web, GitHub y Hugging Face con estas condiciones: gratis, pesos con licencia de uso comercial (canal monetizado),
español (México) e inglés, y CPU sola (esta máquina: 4 núcleos, 15 GB, sin GPU).

## Lo que cambia la decisión
- [Supuesto] No hay ninguna comparación independiente que muestre a un modelo abierto por encima de Kokoro en español;
  solo lo dicen los fabricantes. Hace falta una escucha a ciegas.
- [Seguro] Chatterbox (el que se dejó en el 9 por el ruido en las pausas) está retirado desde agosto de 2026 y el ruido
  sigue sin corregir (issue #536: suelo de unos −53 dBFS y un tono de unos 4,9 kHz en los silencios, del vocoder S3Gen,
  que Turbo y Nano comparten).
- [Seguro] Muchos «abiertos» tienen pesos NO comerciales: F5-TTS, XTTS-v2, MaskGCT, Spark-TTS, Llasa, OuteTTS 1B,
  Fish/OpenAudio, Voxtral TTS, Breeze TTS 2, Higgs 3, OmniVoice, Phonon 40M. Descartados.
- Ninguno trae una voz mexicana de serie con emoción. La vía limpia es diseñar una voz sintética (Qwen3 VoiceDesign)
  y fijarla. Clonar a una persona real queda fuera.

## Candidatos que pasan las condiciones (sin probar aún)
| Modelo | Idiomas | Licencia | CPU (min de cálculo por episodio de 9 min) | Emoción | Riesgo principal |
|---|---|---|---|---|---|
| Qwen3-TTS 1.7B CustomVoice / VoiceDesign | es, en y 8 más | Apache-2.0 | ~30–45 (int8, motor en C) [Supuesto] | instrucción en lenguaje natural | eco de ~40 ms en CPU fp32 (issue #386); 4,5 GB |
| Qwen3-TTS 0.6B (motor en C de gabriele-mastrapasqua) | es, en | Apache-2.0 / MIT | ~18–28 [Probable] | 6 emociones y etiquetas, en beta (la oficial no tiene) | emoción de un motor de terceros |
| ZONOS3-Mini (Zyphra, 09/11/2026) | 43, voces es Rodrigo y Ximena | Apache-2.0 | desconocido | valence/arousal, moods, énfasis por palabra | una semana de vida; compilación Rust + C++23 |
| Chatterbox Multilingual V3 es-mx-latam | es-MX | MIT | ~55–90 [Supuesto] | exaggeration, cfg | retirado; ruido en pausas; marca de agua PerTh; 3,2 GB |
| Supertonic 3 | 31, 10 voces fijas | OpenRAIL-M (obliga a declarar contenido sintético) | ~3 | solo <laugh> <breath> <sigh> | archivado; quizá no mejora a Kokoro |
| Orpheus 3B GGUF | en | licencia Llama 3.2 | ~36–72 [Supuesto] | <laugh> <sigh> <gasp> | se salta palabras (#173, #160), sin mantenimiento |

Rápidos pero de mejora dudosa: Phonon 31M (en, Apache), Pocket TTS (CC-BY, voces con licencias mixtas),
Kitten TTS 2 Mini (Apache, 16 idiomas, 83 MB). Piper y MeloTTS: tan planos como Kokoro.

## Siguiente paso propuesto
Escucha a ciegas con los mismos párrafos del ep36: Kokoro (control) frente a Qwen3-TTS (1.7B y 0.6B), ZONOS3-Mini y,
en inglés, Supertonic 3. Medir el ruido en las pausas (dBFS), pasar Whisper (palabras saltadas o repetidas) y repetir la
misma voz en ~30 clips. Necesita ~8–10 GB de disco.

Fuentes: los README, LICENSE y tarjetas de cada modelo en GitHub y Hugging Face; artificialanalysis.ai/text-to-speech/leaderboard;
ocdevel.com/blog/20260711-quantized-cpu-tts; github.com/resemble-ai/chatterbox/issues/536; github.com/QwenLM/Qwen3-TTS/issues/386.

## Prueba a ciegas (16/11/2026) — resultado medido; falta el oído del usuario

Párrafos del ep36 «vela» y «cierre», normalizados a −16 LUFS. Velocidad sin GPU, cada modelo solo en la máquina:

| Modelo | Velocidad (s de cálculo por s de audio) | Min por episodio de 9 min | Ruido en pausas (dBFS) | Whisper |
|---|---|---|---|---|
| Kokoro (actual) | ~0,3 | ~3 | −63 a −180 (silencio puesto) | bien |
| Supertonic 3 (M1, M3) | ~0,5 | ~5 | −63 a −68 | bien |
| ZONOS3-Mini (Rodrigo, Wyatt) | ~0,5 | ~5 | −64 a −86 (las pausas más limpias) | bien; «vio» → «dio» una vez con emoción; picos a 0 dBFS (hay que bajar la ganancia) |
| Qwen3-TTS 1.7B CustomVoice (Ryan), PyTorch fp32 | ~5,2 | ~47 | −55 a −66 (el más ruidoso) | **falla**: en la «vela» en español alucinó «oooohhhm… ah, ah» y duró 44 s en vez de ~17 |

OJO: dos modelos a la vez en los 4 núcleos se estorban y van ~25 veces más lentos; siempre de uno en uno.

Clave de las muestras (no decírsela al usuario antes de que vote): ES-1 Supertonic M1, ES-2 Kokoro em_santa,
ES-3 ZONOS3 Rodrigo neutro, ES-4 Supertonic M3, ES-5 Qwen3 Ryan, ES-6 ZONOS3 Rodrigo emoción; EN-1 Supertonic M3,
EN-2 Qwen3 Ryan, EN-3 Kokoro am_puck, EN-4 Supertonic M1, EN-5 ZONOS3 Wyatt emoción, EN-6 ZONOS3 Wyatt neutro.
Las muestras y el análisis están en el scratchpad de la sesión (voces/ciegas, voces/analisis.json); el código de la
prueba, en voces/*.py y zonos_run.sh. ZONOS3 se compila en servers/ggml (CMake + Rust) y se descarga en ~1,3 GB.
