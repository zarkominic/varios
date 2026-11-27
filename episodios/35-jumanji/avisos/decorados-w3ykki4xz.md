B
Código en atomo/plato/escenas/_tmp_B/jm-comun.js (node --check bien). Solo los tres fallos; tallerDelante sin tocar.

FALLO 1 · editorial 'premios'/'medalla' (b_medalla; nuevas b_cintaMedalla y b_bajaMedalla):
- La medalla baja colgada de su cinta azul, que entra por el borde de arriba; da un bote de 5 px al tocar la tapa; la cinta se suelta y queda en un lazo corto pegado a la pieza (tope y ≈ 70, bajo las estrellas).
- Igual para la segunda medalla (o.segunda), que tenía el mismo defecto.
- Todo va dentro de o.medalla: baja hasta 0,4, bote hasta 0,85, cinta suelta 0,75–1.
- OJO, escena: el tramo de jm-medalla p2 dura ≈ 0,37 s (t 5,68–6,05) y el bote se ve solo 4–5 fotogramas. Para que se lea hay que alargar ese tramo a ≈ 1 s en la escena.
- La cinta cruza la barra del año (x ≈ 107–117) unos 0,3 s, sin tapar las cifras.

FALLO 2 · editorial 'carta' general (b_cartaDelante, b_carta):
- Tablero 3 px más bajo (y 143): a la señora en (134,146) se le ven cabeza, hombros, torso y brazos sin tocar la escena.
- Esterilla de paja nueva (x 146–192, y 141–142) para que la carta y el libro de la escena (base y 140) sigan apoyados; también con o.carta por omisión (comprobado).
- Silla, taza, vapor y frutero bajan con el tablero.
- En t ≈ 21,5 el libro que lleva en la mano la tapa: es de la escena.

FALLO 3 · taller 'mapa' general (nueva b_calmaMapa): esquina x 262–313, y 5–56 en papel y mar lisos (sin grano, arbolitos ni olas); quedan la costa y el borde del papel. Bordes en la zona de Atom, medidos por mí sobre una captura con Atom: 91 → 31 (lo que queda es el marco). No ejecuté comprobar-decorados.mjs (escribe fuera de mi carpeta). 'mapa/costa' sin tocar.

Comprobado: hojas finales de jm-medalla y jm-escultor sin errores; --fundidos bien (5 y 8 cortes); --comprobar sin sospechas; hojas --ligera de jm-gancho, jm-historia, jm-open, jm-pregunta y jm-perro sin errores (en …/det_B/despues/ligera). jm-miniatura solo importa selva: no le afecta.
editorial 'carta' general:
- mesa pasa de [84,140,196,172] a [84,143,196,172], en editorial() y en editorialDelante().
- Nuevo en editorialDelante(): esterilla [146,141,192,142].
- Sin cambios: sueloDetras 146, suelo 160, carta [158,139] / [160,139], libreDetras, y la línea de apoyo de lo que se pone en la mesa (y 140; jm-medalla p4 no hay que tocarla).

editorial 'premios'/'medalla':
- Sin cambios: libro, tapa, medalla [112,142], libro2, medalla2 [270,138], calendario; estrellas de la escena libres.
- La medalla está posada desde o.medalla ≥ 0,85 (antes, en 1); en 1 queda exactamente en [112,142].

taller 'mapa': ninguna (P, michigan, rhode y punta iguales).

F
Copia de trabajo: /home/user/varios/atomo/plato/escenas/_tmp_F/jm-comun.js (sintaxis comprobada). Solo cambia f_caida (selva 'caida' general) y la cabecera de selva(); selvaDelante, sin cambios.

- FALLO 1: cae ya no es null. Sin o.cae o con 0 devuelve el punto de arriba, f_caePos(0) = [196, -8]. La estela y la figura se siguen pintando solo con o.cae > 0. No hay hoja que pruebe cae = 0: comprobado leyendo el código.
- FALLO 2: la bruma (ahora y 90–111, todo el ancho) son jirones mezclados con el fondo en tres pasos (R.pget + f_mez), como en 'claro'; sin damero.
- FUERA DEL ENCARGO, para revertir si no se quiere: las tres sombras de nube sobre las copas también eran damero duro (una en y 94–106, junto a la ruina, se leía como el mismo fallo). Ahora oscurecen en tres pasos, con la misma posición, tamaño y velocidad. Es la línea «el río brilla; la sombra de las nubes…» de f_caida.

Comprobado: jm-nuevo (hoja completa y p7) sin errores y 7 cortes bien en --fundidos; en p7 la ruina, los corazones y el actor se leen limpios. jm-espacio, jm-open y jm-taquilla: hojas ligeras sin errores, no las he mirado (no usan 'caida'). jm-miniatura no importa jm-comun.js: no le afecta. Las «antes» están en det_F/antes/r2; lo que hay suelto en det_F/despues es de una pasada anterior.
Posiciones: ninguna cambia (río, ruina [248, 100], horizonte 78, vidas, trayectoria de f_caePos).

Contrato de selva({ encuadre: 'caida' }).cae: antes null con o.cae ausente o 0; ahora siempre [x, y], y en ese caso [196, -8]. Una escena que use g.cae como «está cayendo» debe mirar o.cae > 0. En jm-nuevo p7, «if (g.cae)» es ahora siempre cierto y el «?? [196, -40]» queda muerto; no cambia nada a la vista porque cae > 0 durante todo el plano (el actor entra con los pies en y ≈ 4, x ≈ 180–196, fuera de la barra del año).