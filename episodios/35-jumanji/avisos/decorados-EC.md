E
Copia terminada: atomo/plato/escenas/_tmp_E/jm-comun.js (node --check bien). Las 8 escenas dan «sin errores en la página» y --fundidos «cortes bien».

FALLO 1 (derechos), en cine():
- Fuera la casa flotante y los planetas con anillos. e_planeta es ahora el planeta a rayas SIN anillos.
- Auxiliares nuevas: e_cohete, e_coheteMini, e_bandeja (tablero de hojalata), e_espacioCielo, e_cartelEspacio.
- sala 'espacio': tablero de hojalata con tapa y antena, cohetito que lo rodea, luna con cráteres, planeta a rayas, dados.
- Cartel de 2005 (fachada y taquilla; en taquilla animado, recortado a [24,66,70,128]), pictograma de entrada y marquesina: cohetito y planeta a rayas.
- Póster del salón: también cambiado.
- Las escenas ya pueden quitar los tres parches de jm-espacio (planos 5 y 6).
- f_casaFlota (grupo de selva) sigue definida y nadie la llama; no la toqué.

FALLO 2: o.pantalla 'hojas' (selva sin tablero ni dado: lianas, helechos, luciérnagas) y 'vacia' (gris encendida, con parpadeo y motas). 'selva' sale idéntica. jm-pelo p4 puede usar 'hojas'.

FALLO 3 (sala/publico):
- o.criticos: un bocadillo para los dos con un pulgar de 12 px cada uno (verde arriba, gris de lado, rojo abajo), a destiempo.
- o.gafas: montura blanca con cristal rojo y azul, pintada tras la penumbra; se lee en todas las filas.

Comprobado contra la base (misma página de prueba, diferencia por píxeles): los cambios quedan dentro de pantalla, cartel, pictogramas, póster, gafas y bocadillo.
No comparé antes/después las hojas de gancho, historia, nuevo y open: solo sé que no dan errores.

cineDelante: sin cambio visible (solo comparte e_tipoPant). Miniatura: no usa cine. Queda _tmp_E/jm-prueba-e.html (página de prueba).
GEO: Ninguna posición devuelta ha cambiado (suelos, pantalla [62,28,258,96], criticos [[192,104],[208,104]], nino, filas, cartel, taquilla: iguales).

Único cambio de ocupación: el bocadillo de los críticos en sala/publico ocupa ahora x 180–220, y 75–99 (antes x 182–218, y 78–97). No pisa el «$65» ni el bocadillo de estrellas de jm-estreno p2.

Lo nuevo de 2005 queda dentro de los rectángulos de los parches de jm-espacio: pantalla [64,29,256,95], cartel [24,66,70,128], pictograma [124,69,141,79].

Opciones nuevas (opcionales): o.pantalla 'hojas' y 'vacia'. Sin encuadres nuevos.

C
Código en atomo/plato/escenas/_tmp_C/jm-comun.js (node --check bien; 8 escenas «sin errores en la página», fundidos «cortes bien»). El decorado ya estaba al nivel: solo los cinco fallos. DOS FALLOS NECESITAN UN CAMBIO EN LA ESCENA (yo no puedo tocarlas).

F1 ventana/chicos: nueva c_chico (el mismo dibujo que el parche de jm-libro: en color, filo oscuro, 14→8 px, misma senda). Se pinta DESPUÉS de la lámina y de los reflejos (la vista devuelve «tras» y casaJuego lo llama; no sale en la geometría), recortado al hueco y al montante. Visto sin el parche: se leen. Se puede borrar la línea «for (const [k, ret, ropa, gorra]…figurita(…)» de p8 de jm-libro (y figurita/enSenda); dejarla no estorba, coinciden.

F2 barra del año: nueva c_sombraTecho (franja y 0–17 más oscura, deshecha en trama hasta y 30, en la capa fija). En salon, salon/piano, cocina, ventana/folleto, cocina50 y billete. FUERA DE LA LISTA, también en cocina/alacena y parque/arbol (aquí, degradado largo de cielo).

F3 salon o.rino 0–1: nueva c_rinoDibujo: contorno de izquierda a derecha con el papel en blanco dentro y, detrás, el sombreado a rayas; la sombra del suelo llega con el sombreado. true o 1: igual que antes. La alfa de c_cuerpo (león) no se toca.

F4 pasillo/baja: fuera c_panzaRino; patas, sombras y polvo recortados a y ≥ 46; el arranque de cada pata se deshace en trama bajo una polvareda. El «PARCHE DECORADO» de jm-porque p4 (e ≤ 0,30) ya no hace falta: probado con 0,14→0,78, nada tras Atom ni la barra.

F5 alacena: de o.monos 0,5 a 1 el segundo mono asoma por el canto de la puerta (dedos, cola y cuerpo, da la vuelta y queda colgado). PERO jm-porque p2 pasa «t < NEVER ? 0.4 : 1» (escalón) y sigue apareciendo de golpe: hay que darle rampa, p. ej. lerp(0.4, 1, tramo(t, NEVER − 0.1, NEVER + 0.9)); probado así. La hoja final no enseña este arreglo.

Cabeceras de casaJuego al día. Sin encuadres nuevos.
GEO: Ninguna posición cambia: salon (rinoceronte centro 110, suelo 160, morro ≈ (157,143)), tablero/gema (160,96), pasillo/baja (ratonera (128,46), suelo 172), alacena (mono2 (262,60) con o.monos 1), parque (caja (190,153)), ventana (senda (92,128)→(226,92)) siguen igual. Nuevo, para sincronizar: con o.rino 0–1 la punta del lápiz va en x ≈ 74 + 78·o.rino (como la mano de jm-libro p6); en pasillo/baja los rinocerontes solo ocupan y ≥ 46; el mono 2 de la alacena asoma por el canto x 276–290, y 60–110 mientras o.monos va de 0,5 a 1.