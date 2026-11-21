## Grupo A (taller, tallerDelante)

NOTAS:
Copia terminada: atomo/plato/escenas/_tmp_A/jm-comun.js (sintaxis comprobada, página «sin errores»). Prueba: _tmp_A/jm-prueba-a.html, 15 planos de 2 s (no de 5: jm-gancho solo da ~30 s).
- 10 vistas: taller, taller/banco, clase, clase/caballete, casa, casa/mesa, mapa, mapa/costa, palabras, palabras/papelera. La cabecera // está puesta al día.
- taller() ya pinta lo de delante; la escena llama igualmente a tallerDelante después de los actores.
- Opciones de la cabecera: frio (taller y banco, continuo), virutas, trazo, dibujo + tema ('salon', 'rino', 'tablero') + perro, ruta, boston, intentos, bola.
- Opciones nuevas, todas opcionales: gato (casa; false lo quita), destino (mapa: enciende ya la marca de Rhode Island), desde ([x, y] de donde sale la bola).
- Devuelven punta [x, y] (donde va el lápiz) caballete, mesa, mapa, costa y palabras; rinoDesde (mesa, tema 'rino') y jDesde (palabras) son la fracción en que empieza el rinoceronte o la J.
- Exportada nueva: T.a_vaho(R, x, yBoca, t, dir, f) para el vaho con frío. El resto de auxiliares a_ no se exporta; la paleta del grupo es a_P.
- mapa y costa usan el mapa() importado de fa-comun con lo nuestro encima. Sin imports nuevos.
- Tiempos: 2–37 ms por fotograma; el primer fotograma de cada vista hornea sus capas (130–210 ms, una vez).
- Sin comprobar: si mapa() vuelve a hornear cada vez que una escena alterna 'mapa' y 'costa' (solo medí un corte: 156 ms).
- Los actores no se enfrían con o.frio (solo el decorado).
- Flojo: en 'costa' la línea de costa de los datos es de tramos rectos (la tierra va rellena con bosques, colinas, granjas y río); en 'mapa' el año se lee justo sobre el papel claro, como en el mapa del 13.
- La única letra es la J de 'palabras'; lo demás son garabatos tachados y rayas onduladas.

GEOMETRÍA:
Todo en px de 320×180. Zona de Atom y barra del año tranquilas en las 10 vistas.

TALLER (general): suelo 152, libre x 36–262.
- Ventanal x 101–223, y 25–97; alféizar y 100 (gato en x 132); radiador x 122–205, y 105–120.
- Estantería x 4–50, y 37–113; tablones x 52–68; reloj (78, 44); bombilla (200, 18), encendida con frio > 0,3.
- Esculturas detrás de los actores: esfera en su taco x 27–52 (cima y 101, taburete hasta y 143); peana del cono x 63–85 (y 113–141, punta en (74, 72)); peana de la casa inclinada x 237–259 (cima (252, 82)).
- Boceto x 244–262, y 52–76; tablero de herramientas x 268–319, y 52–98; banco x 264–319, tablero a y 105.
- Delante: cajón x 0–33, y 140–179; caballete de serrar x 268–319, y 147–179.
- Luz del suelo x 70–268, y 124–172 (se va con frio).

BANCO: suelo 134, el actor va DETRÁS (asoman cabeza y hombros), libre x 56–196.
- Banco entero en tallerDelante: tablero y 127–147 (x 22–298 atrás, 6–314 delante), frente y 148–179.
- Encima: mazo x 52–92, y 131–141; rollo de gubias x 99–170, y 127–145; regla x 122–200, y 143–146; escultura x 207–247 (taco y 113–143, punta (227, 78)); punto de talla (215, 110); taza x 266–283, y 128–141.
- Virutas: caen de (214, 109) y se amontonan en x 184–258, y 140–143.
- Fondo: ventana x 0–46, y 23–99; tablero de herramientas x 64–206, y 28–104; baldas x 222–274, y 70 y 96; lámpara (214, 21).

CLASE: suelo 158, libre x 62–258.
- Ventanas x 16–54, 70–108, 124–162 (y 24–88); corcho x 176–268, y 36–78; puerta x 285–315, y 51–111; reloj (228, 24).
- Tarima x 121–205, y 128–135; bodegón encima: cubo (150, 88), esfera (170, 91), cono (182, 83); foco (212, 92).
- Alumnos de fondo en (46, 133), (96, 131), (234, 131), (280, 134) con sus caballetes.
- Delante: caballetes de espaldas x 6–46 y 274–314 (y 132–179); alumnos sentados en x 60 y 260 (cabeza y 146).

CABALLETE (inserto, T.mano): lámina x 118–250, y 22–128; el bodegón se dibuja en x 124–246, y 28–122; bandeja x 103–265, y 132–138; fondo desenfocado libre x 0–100.

CASA (noche): suelo 156, libre x 16–144; Lisa entra y sale por el borde izquierdo (no hay puerta).
- Ventana x 28–78, y 31–86 (cortinas x 14–92); estufa x 96–126, y 87–116 (tubo x 108–112); cesto de leña x 131–149; gato (60, 146) sobre la alfombra x 12–144, y 136–168.
- Dibujos de la pared [x, y, ancho, alto]: [136,30,26,19], [168,26,20,26], [194,31,26,19], [226,28,20,24], [142,56,22,17], [170,58,20,16], [196,57,24,18].
- Reloj de péndulo x 249–263, y 50–92; estantería x 271–319, y 59–117.
- Mesa (tallerDelante): tablero inclinado de (146, 147) a (222, 128), patas hasta y 162; flexo: pantalla (205, 100), mordaza (221, 127); bote de lápices (210, 124).
- Dibuja de pie en silla [136, 156] mirando a la derecha, mano en [158, 141]; detrás de la mesa [184, 152].

MESA (inserto, desde arriba): hoja x 92–228, y 40–140 (dibujo recortado a x 94–226, y 42–138).
- Flexo (54, 62) r 15, brazo desde x 0, y 88; taza (50, 140); virutas y cuchilla x 60–82, y 104–124; regla x 97–225, y 151–158.
- Derecha, libre para la mano x 234–318, y 44–176: barrita (248, 64), difumino x 276–296, y 62–72, platillo de polvo (262, 92) r 12, goma (248, 121), trapo x 268–308, y 112–148.
- Perro en x 204–214, y 126–134; rinoceronte en x 117–185, y 94–130.

MAPA: papel x 20–300, y 14–170. Michigan ≈ (48, 142), Rhode Island ≈ (293, 137) (usar g.michigan, g.rhode, g.P); la ruta hace un arco de 16 px hacia arriba. Compás: bisagra (286, 118), patas hasta y 155; taza (16, 158); lápiz x 44–100, y 171–176.

COSTA: Providence ≈ (120, 110), marca 5 px debajo; Boston ≈ (128, 60) (usar g.providence, g.boston); faro ≈ (197, 70); mar a la derecha de x ≈ 215; taza (16, 158); lápiz x 196–266, y 170–176.

PALABRAS (inserto): libreta x 69–219, y 21–179.
- Renglones de garabatos en y 50, 64, 78, 92, 106, 120 (x 88–190); J en x 93–118, y 131–161; rayas x 124–186, y 154; círculo centro (142, 146), radios 62 × 25; subrayado y 172–177.
- Hoja de selva x 235–309, y 55–153; bote (30, 70) r 13; goma x 20–38, y 108–117; lápiz (14, 140)–(52, 128); bola (34, 160); flexo en la esquina (4, 34).
- Libre para la mano x 224–318, y 60–176.

PAPELERA: suelo 152, libre x 96–180, tira desde [112, 152]; la bola sale de [122, 126] (o.desde).
- Papelera x 190–220, y 125–152; boca (205, 122); el montón rebosa hasta y 112.
- Ratonera (159, 114); enchufe x 126–134, y 84–94; gato (252, 152); estantería x 262–319, y 56–118; alfombra x 0–88, y 150–179.
- Delante: tablero de la mesa de (0, 58) a (88, 40) y patas en x 55–85 hasta y 166.

## Grupo B (editorial, editorialDelante)

NOTAS:
Los 12 encuadres (6 × 2 cámaras) están escritos en /home/user/varios/atomo/plato/escenas/_tmp_B/jm-comun.js, con sintaxis comprobada y capturas sin errores de página. Mira hoja-final.jpg (1920 px); las tiras de capturar.mjs pasan de 2000 px, no las abras.

Pruebas: jm-prueba-b.html (planos 1–6) y jm-prueba-b2.html (planos 7–12); 'jm-gancho' no dura para los doce en una sola página.

Qué hace cada vista y sus opciones: en la cabecera de editorial(). Opciones nuevas, todas opcionales: o.perroDir, o.perroSentado, o.abre en 'verja', o.asoma, o.radio, o.aplauso, o.libro, o.atrilX, o.suena, o.carta, o.pregunta, o.sonajero.

Sin comprobar o flojo:
- Movimiento: solo miré t y t+0,5 en pasillo, despacho, verja y carta. En las otras ocho vistas la vida está escrita pero no la comparé en dos instantes.
- Rendimiento: 17–66 ms por fotograma; el primero de cada vista, hasta ~160 ms (pinta la capa fija).
- 'puerta': el brazo se lee tras el arreglo (ampliación de un fotograma con o.abre ≈ 0,9), pero no lo capturé en o.abre = 1.
- 'premios': el escenario queda pequeño en cuadro; solo hay una araña (quité la segunda porque pisaba la barra del año) y dos jurados (el libro tapaba al tercero).
- 'medalla': la medalla tapa casi toda la tapa del libro fino.
- 'esquinas': la lupa agranda ×2 de verdad; la vi una vez sobre el primer perro.
- o.puertas se ve con un aspa roja y la luz apagada, no con la puerta abriéndose.
- Las cámaras desde arriba o de cerca (mesa, esquinas, esquina, medalla, sobre) no admiten un chibi de pie: la escala se comprobó con la mano canónica y las piezas.

La esquina de Atom se funde a un color liso en todas las vistas (b_calma). No añadí imports ni colores a C, ni toqué nada fuera del bloque A2. Auxiliares b_, sin exportar.

GEOMETRÍA:
R.actor: x es el borde IZQUIERDO del sprite de 15 px. Todas las vistas devuelven su geometría (los nombres entre paréntesis). Orden: editorial → actores → editorialDelante. o.perro lo pinta el decorado, bajo los actores.

PASILLO general. suelo 152 (moqueta y 137–171). Puertas (puertas) centradas en x 70, 154, 238; hoja x±17, y 44–127; cristal y 50–94. Ventana (ventana) 8,38–38,90. Banco (banco) x 96–128, y 108. Paragüero x 180–190. Perchero (perchero) x 300. Reloj 112,40. Apliques 46,52 y 196,46. Delante: helecho x ~270–319, y 135–180. Libre: toda la moqueta, x 0–265.

PASILLO puerta. suelo 168 (suelo desde y 158). Hueco de puerta (puerta) 122,26–222,157; hoja con gozne a la derecha: borde izquierdo = 122 + 40·o.abre (hueco). Mano (mano) ≈ x 128+g → 120, y 96; manuscrito (manuscrito) a su izquierda, x ~99–119, y 81–108. Placa (placa) 101,46; timbre 101,60. Cuadros 26–64 × 52–98 y 244–276 × 54–96. Paragüero x 14–30. Planta x 294. Delante: helecho x 0–50, y 130–180. Quien recibe: actor x 60–80.

DESPACHO general. suelo 158 (visitas, x 60–140); sueloDetras 144. Mesa (mesa) x 148–268, tablero y 138, frente hasta 170. libreDetras x 196–234 (un chibi; el sillón (sillon) está en x 196–222). Lámpara sobre la mesa x 153–171, y 123–138; máquina x 238–262, y 116–138. Ventana (ventana) 122,36–198,98. Estantería (estanteria) 4,24–100,127; escalera (escalera) x 86–105. Archivador (archivador) 220,96–314,127. Láminas y 52–86, x 222–310. Papelera 288–302, y 138–156. Alfombra 44–276, y 142–178.

DESPACHO mesa (desde arriba). Vade (vade) 41,31–255,163. Dibujos (dibujos; 62×46, centros) ≈ (84,61), (150,49), (216,63), (116,119), (190,121); salen de la carpeta (carpeta) 20,104. Pluma (pluma): punta en o.pluma, por omisión 262,150; el cuerpo sube 25 px a la derecha. Café (cafe) 290,70. Gafas (gafas) 286,108. Tintero (tintero) 291,139. Lámpara 4–34, y 22–46. Reloj 20,160.

LIBRO1979 general. suelo 140; sendero (sendero) y 131–151. Lámina (lamina) 8,23–311,172; pliegue (pliegue) x 160. Casa (casa) x 105–145, y 24–76. Verja (verja) 206,104. Pato (pato) 42,124. Elefante (elefante) 262,126. Conos x 14, 92, 154, 300. Bancos x 116 y 226, y 122. Delante: seto de boj y 159–172, con hueco en x 141–179.

LIBRO1979 verja. suelo 158. Pilares (pilares) x 96–112 y 208–224, y 44–152, bolas en y 30. Hojas de la verja x 113–207, y 50–150; hueco (hueco) desde 113 + 47·(1 − 0,75·abre) hasta 160. Cartel (cartel) 42–82 × 100–122, poste x 61. Setos x 8–96 y 224–311, y 48–150. Sendero (sendero) x 112–208 en y 150, se ensancha hacia abajo.

ESQUINAS general (desde arriba). Libros (libros) 118×66 en (24,28), (156,28), (24,106), (156,106). Láminas (laminas) 51×55. Perros (perros) ≈ (73,83), (223,83), (130,161), (166,162). Té (te) 298,66. Lupa en reposo 296,128. Lápices x 286–304, y 96–140.

ESQUINAS esquina. Dibujo 0,0–250,150; su esquina (esquina) 250,150. Seto (seto) x 150–249, y 46–149. Perro (perro): pies en y 146, centro x de 196 (oculto) a 150 (asoma); mira a la izquierda. Pato de seto x 76–134, y 70–118. Número de página (pagina) 284,148. Mesa y 170–179.

PREMIOS general. suelo 121 sobre el escenario; libre (escenario) x 56–165. Embocadura x 27–273, y 23–122. Atril (Delante, atril) centrado en o.atrilX = 100: x 91–109, y 95–122; el orador va detrás, actor x ≈ 93. Mesa del jurado (mesa) 170,104–244,122; libro (libro) 210,101. Pancarta (pancarta) 84,50–216,66. Frente del escenario y 130–143. Público (publico): filas con base en y 160, 171, 182; cabezas desde y ~140. Araña x 228, y 8–20. Puerta x 298–316.

PREMIOS medalla. Libro (libro): centro x 112, base y 150; tapa (tapa) 54,74–170,150. Medalla (medalla): base y 142, x 112. Libro 2 (libro2): centro 236, base 150; medalla 2 (medalla2) ≈ 270,138. Calendario 6–50 × 98–152; cifra (calendario) centrada en 28,134. Borde de la mesa y 124.

CARTA general. suelo 160 (libre x 200–300 y x 0–70); sueloDetras 146. Mesa (Delante, mesa) x 84–196, tablero y 140, patas hasta 172. libreDetras x 128–146 (un chibi). Silla de espaldas x 106–122. Carta (carta) ≈ 160,139; sobre x 172–184. Ventana (ventana) 128,42–192,94. Teléfono (telefono) 219,70; auricular (auricular) 208,70; el cable cuelga hasta y 119. Reloj (reloj) 226,34. Nevera (nevera) 240,58–298,134. Encimera (encimera) 0,99–114,133; hervidor 74–88, y 89–98.

CARTA sobre (desde arriba). Carta (carta) 96,28–216,162. «?» (pregunta) centro 156,98; ocupa ≈ x 139–176, y 72–119. Sobre (sobre) 8,100–88,154. Sonajero (sonajero) por omisión 252,108, radio ~34. Taza (taza) 292,64. Gafas (gafas) 43,58. Plato (plato) 285,149.

Ninguna pieza exportada: lo que va delante sale solo por editorialDelante, y solo existe en pasillo, puerta, despacho, libro1979 general, premios general y carta general.

## Grupo C (casaJuego, casaJuegoDelante)

NOTAS:
Código en /home/user/varios/atomo/plato/escenas/_tmp_C/jm-comun.js (node --check correcto; página sin errores; menos de 65 ms por fotograma salvo el primero de cada vista, ~250 ms). Prueba: _tmp_C/jm-prueba-c.html, con planos de 1 s (no de 5): 25 planos no caben en la duración de jm-gancho.

Sin revisar a fondo: las hojas 2, 3 y 5 finales no las volví a mirar tras los últimos arreglos (sí cada vista en una ronda anterior). Los chicos de 'ventana' son muy pequeños (8–14 px).

LÁMINA: todo se pinta en color y casaJuego lo pasa al final a 8 grises con trama diagonal y grano; o.color 0–1 devuelve el color. 'cocina50' va siempre en color. Los actores quedan en color sobre la lámina. Delante ya sale en gris según o.color.

14 vistas (encuadre / cámara) y opciones:
- parque / arbol: o.caja.
- salon / piano: o.leon, o.rino (true o 0–1), o.rinoDir, o.plantas, o.lluvia; en piano, o.nota y o.leon (por omisión 1).
- cocina / alacena: o.monos (12 monos, de uno en uno; en alacena por omisión 1).
- pasillo / baja: o.estampida, o.rinosDetras.
- tablero / gema: o.avance, o.dados, o.tira (por omisión 1), o.dentro.
- ventana / folleto: o.chicos (0–1 o true = bucle), o.pasos (sin darlo, bucle).
- cocina50 / billete: o.tedio, o.mueve, o.valor, o.mano.

Opciones nuevas, todas opcionales: rinoDir, rinosDetras, pasos, mueve, valor, mano.

Cambios sobre el encargo: en 'pasillo' los rinocerontes van en Delante por omisión; en 'folleto' las zapatillas llevan solo un tramo corto de pernera; el tablero grande es dibujo propio con el diseño de PIEZAS_JM.tablero (69 casillas).

Cabecera puesta al día. Auxiliares c_ sin exportar, entre casaJuegoDelante y la sección C; ningún import nuevo.

GEOMETRÍA:
Todas las vistas devuelven { suelo, libre, encuadre, camara } y los puntos de abajo. No hay piezas c_ exportadas: lo de delante es casaJuegoDelante(R, t, mismas opciones), después de los actores.

PARQUE general. suelo 152; horizonte y 100. Árbol: tronco x 211–225, copa x 170–262, y 28–84. Caja (o.caja) centro 190, base 153. Banco x 52–102, asiento y 138. Farola x 128, luz y 78. Cancela (151, 104). Papelera x 24–32. Seto x 268–319, y 118–130. La senda cruza el suelo en x≈92. Libres: x 20–170 y 240–310. Delante: hierba y hojas, y 172–179.
PARQUE 'arbol'. suelo 164. Tronco x 150–236. Caja grande x 139–225, y 112–165; nota (158, 126). Ardilla (276, 160). Libre x 16–126.

SALON general. suelo 152; pared hasta y 126. Ventana x 14–58, y 38–98. Sillón x 8–46. Lámpara x 57, pantalla y 70–86. Chimenea x 76–138, repisa y 88, fuego (107, 120). Piano x 156–226, tapa y 98, teclas y 114–117; taburete x 180–202, y 130. Reloj de pie x 238–254, y 58–128. Sofá x 264–319, asiento y 126. Alfombra x 56–264, y 140–174. León sobre el piano: apoyo (192, 95), cabeza ≈ (208, 77). Rino: centro 110, pies y 160, ocupa x 70–156, y 118–160; va DETRÁS de los actores: fuera de x 70–156 salvo suelo ≥ 161. Libres: x 60–150 y 150–260. Delante: lluvia, salpicaduras, agua desde y 180 hasta 156 con lluvia = 1, hojas en las esquinas de abajo.
SALON 'piano'. suelo 174; personaje en x 10–54. Piano x 62–298, tapa y 86, teclas y 122–138. León: apoyo (192, 86), x 128–252, cabeza ≈ (230, 43). Tecla (238, 130). Metrónomo (79, 72). Partitura x 117–179, y 94–113. La nota sube desde ≈ (251, 114).

COCINA general. suelo 154; pared y 124. Nevera x 18–54, y 58–128. Fogones x 64–106, placa y 94. Ventana x 130–176, y 38–84. Encimera y 96, x 110–276; fregadero x 140–166. Alacenas x 202–274, y 44–78. Puerta x 284–316, y 60–124. Lámpara (192, 24–34). Mesa en Delante: x 118–206, tablero y 146–151, patas hasta 173; sillas en x 104 y 220. Detrás de la mesa: (162, 154), asoma la cabeza. Libres: x 62–112 y 212–280. Monos de Delante: (158, 145) y (198, 145).
COCINA 'alacena'. Mueble x 72–240, y 30–142; baldas y 64, 100, 136. Mono 1 (144, 100); mono 2 colgado en (262, 60). Encimera y 152. Sin sitio para personajes.

PASILLO general. suelo 150, pegados a la pared; pared y 128. Puertas de 40 px: x 24–50, 136–162, 256–282, y 86–128. Perchero x 100. Consola x 190–226, y 108; jarrón (208, 93); espejo (208, 66). Apliques x 78 y 214, y 50–60. Alfombra y 140–168. Estampida en Delante: 4 rinos con pies en y 157–166, cuerpo y ≈ 118–166, de x −70 a 420. Libres: x 52–92, 118–134, 166–188, 230–254.
PASILLO 'baja'. suelo 172; rodapié hasta y 52. Puerta x 182–268. Ratonera (128, 46). Botas x 52–83. Alfombra y 86–162. Con estampida: panzas en y 0–76, patas cercanas hasta y 158, lejanas hasta 141; van en el fondo, detrás de los actores.

TABLERO general, desde arriba, sin personajes. Centro (160, 96); caja del tablero x 86–234, y 37–155. Devuelve casillas (69 puntos, de la salida abajo-izquierda a la gema), gema (≈158, 94) y radioGema 11. Dados parados en (48, 84) y (62, 100). Ficha azul en casillas[2]; roja según o.avance (devuelve ficha). Caja del juego x 250–310, y 101–138. Folleto (272, 154). Zapatilla (34, 126). Cojín arriba a la izquierda. Borde de la alfombra y 154–167; tarima y 168–179.
TABLERO 'gema'. Gema centro (160, 96), radio 52; aro hasta radio 66.

VENTANA general. suelo 174; asiento del banco y 135: los actores ahí, en x 90–112 o 200–215. Hueco x 76–244, y 28–132. Fuera: horizonte y 88, árbol x 196, folleto (108, 126), senda de los chicos de (92, 128) a (226, 92). Cortinas x 48–80 y 240–272. Librería x 4–40. Mesita y lámpara x 282–316, pantalla y 104–120. Gato (222, 135). Delante: sillón x 0–46, y 142–179; helecho x 275–319, y 140–179.
VENTANA 'folleto'. Folleto x 98–222, y 94–148; dados dibujados en (176, 110) y (196, 114). Zapatillas: pie y 76, de izquierda a derecha. Sin personajes.

COCINA50 general. suelo 148 = detrás de la mesa, en x 205; al lado: x 264, suelo 162. Pared y 126. Reloj (190, 50), radio 11. Ventana x 98–150, y 38–88. Fogones x 14–58. Nevera x 254–290. Calendario x 216–238. Mesa en Delante: x 92–228, tablero y 142–151; juego x 124–180; ficha roja (138, 149) + o.mueve × 12; ficha azul x 166; billetes x 100–123; vaso x 215–225, y 131–146; galletas x 178–196; sillas en x 80 y 240.
COCINA50 'billete'. Billete centro (150, 112), 92 × 48. Mano en (190, 132); el brazo entra desde (262, 179). Con o.mano false la pone la escena.

## Grupo D (keene, keeneDelante)

NOTAS:
Código en /home/user/varios/atomo/plato/escenas/_tmp_D/jm-comun.js (base intacta en jm-comun.base.js); node --check pasa y las cinco páginas de prueba (jm-prueba-d.html y -d2 a -d5, 6 planos de 5 s cada una porque la escena de prueba dura 30 s) dan «sin errores en la página». Cabecera puesta al día. Solo cambian keene y keeneDelante; auxiliares d_ debajo, sin imports nuevos ni tocar C.

LO INCÓMODO
- El león sin melena se lee como felino sentado (hocico chato, oreja redonda, borla), pero puede confundirse con un oso; con o.pelo > 0,3 se lee león sin duda. Mirad el plano pelado en la pasada.
- El primer fotograma de cada encuadre tarda 120–200 ms (se pinta la capa fija, una vez); después, 2–80 ms.
- keeneDelante no tiene reserva de cámara: con una cámara desconocida no pinta nada (keene cae en 'general').
- En 'calle' con rodaje el camión tapa a quien esté en x 14–112.
- o.lavado y o.andamio no existen en la 'esquina' (allí o.pintores).

QUÉ HAY
- calle: general (o.rodaje, o.epoca 1994|2014|2025, o.trafico false) y 'esquina' (o.letrero, o.lavable, o.buena, o.pintores, o.rodaje, o.epoca).
- pared: general (o.letrero, o.lavable, o.lavado, o.buena, o.andamio true|y|[y]|[x,y]) y 'pie' (o.velas 0–12, o.flores 0–1, o.dia).
- plato: general y 'camara' (inserto: o.clac 0–1, o.escena, o.plano, o.toma).
- guionistas: general (o.fichas 0–1, 18 fichas; o.epoca 1994|2016) y 'relojes' (o.diez, o.cien 0–1).
- efectos: general (o.pelo, o.punta en la pantalla grande) y 'pantalla' (inserto: o.pelo, o.punta, o.monos 0–1).
- Opciones nuevas, todas opcionales: trafico, pintores, buena en esquina, clac/escena/plano/toma, diez/cien.
- Vida: nubes a tres velocidades, pájaros, humo, hojas, toldos, poste de barbero, palomas, gato, gota de la bajante, llamas y luz de velas, polillas, grúa, fuego de atrezo, pilotos, cintas, ventilador, lámpara de lava, palmeras, avión, surtidor, agujas, película.
- Los insertos devuelven suelo: null e inserto: true.

GEOMETRÍA:
Todo en px de 320×180. keeneDelante(R, t, mismas opciones) SIEMPRE después de los actores. Usad lo que devuelve keene (g.suelo, g.puestos, g.andamio…).

CALLE general. Suelo 134 (acera y 123–137). Bordillo 138–140, calzada 141–179, doble raya y 161/164. Casas: x 0–58 (café, tejado y 38), 59–118 (libros, y 30), 119–176 (zapatos, y 36), 263–319 (barbero, y 50); base y 122. g.puertas [[x,121]…] ≈ x 50, 110, 168, 311. Plaza x 177–262: iglesia (aguja 222,27; cuerpo 206–238, y 92–121), quiosco (192,116), bandera x 244. Farolas x 118 y 238, arces x 60/178/290, banco 134–147, buzón 200–207, cabina 244–255 (1994) o aparcabicis. Aparcados: ruedas y 152, x 14/76/196/258 (no tapan los pies). Con rodaje: camión x 10–108, y 119–153 (delante, tapa), focos (164,160) y (262,162), vallas x 126 y 274; libre x 116–310. Sin rodaje libre x 10–310. Coche que pasa: y 175, cada 9 s (17 s con rodaje).

CALLE 'esquina'. Suelo 156. Arista x 204 (y 34–148). Pared lateral x 0–204 (arriba 62→34, abajo 132→148); letrero ≈ x 62–152, y 62–124 (g.letrero). g.pintores [x,y] si o.pintores. Fachada x 205–319: escaparate (212,132)–(280,142), puerta ≈ (298,142), coche cortado x 284+. Delante: farola x 16–28 (y 64–179), buzón x 287–305 (y 160–179); con rodaje foco (252,168) y valla x 262–282. Libre x 40–270 (40–236 con rodaje).

PARED general. Suelo 160 (acera y 150–165; bordillo 166; calzada 169+). Muro x 0–270, y 0–149; zócalo y 140–149. Letrero [70,30,236,126]; zapato centro (153,84), x 92–214, y 56–111. Frentes: g.xPinta, g.xLava, g.xBuena. Escalera de incendios x 5–55 (rellanos y 56 y 116), bajante x 60–62 (charco 68,153), apliques x 112 y 196 (y 21–30), ventana cegada x 237–261, y 54–98. Bocacalle x 271–319, boca de riego x 289–298. Andamio: tablón y 112 por omisión, centro g.andamio.x (el frente, entre 96 y 214), el pintor pisa en g.andamio.y entre x0 y x1 (±31); barandilla de delante y−10, cuerdas en x±36 desde y 21. Libre x 70–268.

PARED 'pie'. Suelo 152 (acera y 118–160; bordillo 160–164). Muro y 0–103, zócalo y 104–117. Letrero: borde de abajo y 64–76; suela y 40–52, tacón x 16–66 hasta y 62. Velas en g.velas: [150,124] [172,126] [128,127] [196,124] [110,124] [214,128] [160,132] [184,133] [138,133] [232,125] [92,128] [205,134]. Ofrendas x 78–244: notas y dibujos y 76–100, ramos al pie y 121–126. Farola x 298 (farol y 46–67, base y 140). Bajante x 6–12. Libre x 30–280, y 136–158; a los lados (x 40–80 y 250–280) no tapan las velas.

PLATO general. Suelo 150 (alfombra: centro 152,144; x 84–220). Tarima x 50–256, y 128–158. Decorado x 56–250, y 44–128: puerta x 64–90 (pie 77,127), chimenea x 126–180 (hogar 138–168, y 99–127), cuadro x 136–170, ventana [196,62,230,110], contrachapado x 233–250. Grúa: base x 6–42, y 142–160; cámara ≈ (86–92, 75–90) en g.grua.camara. Escalera x 256–270, comida x 284–318 (mesa y 112). Cercha y 23–28, focos x 50/104/152/204/246. Delante: silla x 216–242, y 148–179; monitores x 258–316, y 145–170; cajón x 60–86, y 160–179. Libre x 70–212.

PLATO 'camara' (inserto). Cuerpo x 70–172, y 60–117; tambores (101,42) y (143,42) r 20; visor x 40–70, y 61–79; objetivo x 173–246, boca (246,90); contador (94,85); trípode y 118–179. Claqueta [250,112,297,151], bisagra (250,112), agarre (294,156), pie x 301–303.

GUIONISTAS general. Suelo 145 DETRÁS de la mesa (asoman cabeza y hombros); sueloDelante 176 (x 276–310). Mesa (delante) x 44–268, tablero y 139, patas hasta 176. Puestos [x, 145, dir]: (96, 1), (222, −1) y (168, −1) en 1994 o (158, −1) en 2016. Sobre la mesa: flexo x 52–69; 1994 máquina x 121–151 (hoja hasta y 115), guiones 186–207, teléfono 231–249, tazas x 110 y 208; 2016 portátiles x 119–141 y 175–197. Tablero interior [66,26,234,94]; fichas 6×3: x = 70 + col·28, y = 29 + fila·22 (23×16); g.ficha = la última. Ventana [9,27,51,93], reloj (262,62), balda y 88 (x 244–284), surtidor x 290–305 (y 66–124), papelera x 262–274 (y 136–152).

GUIONISTAS 'relojes'. Suelo 162 (tarima y 150–179; friso y 126–149). Relojes (94,60) y (226,62), r 30; cifras centradas en x 94 y 226, base y 114 (placas y 96–116); baldas y 140; libro (96,140); rollo (226,129), la película cae por x ≈ 238 y recorre el suelo y 157–169 hacia la izquierda hasta x ≈ 8. Flecha x 146–180, y 105. Libre x 130–190.

EFECTOS general. Suelo 145 DETRÁS de la mesa; sueloDelante 178. Mesa (delante) x 28–292, tablero y 139. Puestos (112,145,−1) y (208,145,1); libres x 88–142 y 204–230 (la torre x 149–169 y la pizza x 176–200 tapan). Monitores de mesa x 44–86 y 234–276 (y 108–139), teclados x 91–110 y 210–229 (y 135–138). Pantalla grande [128,44,192,90]; cristalera [15,35,91,85]; carteles x 97–117, 204–232, 240–262; torre de discos x 270–296; lámpara de lava x 305–311.

EFECTOS 'pantalla' (inserto). Cristal [14,20,305,153]. León: caja ≈ (60,38)–(186,141), sentado en y 141, mira a la derecha; nuca (132,70), coronilla (151,46), mechón tieso hasta y ≈ 27 (g.punta). Monos en x 226/253/280, suelo 141, números en y 111. Barra [36,144,164,149]; cifras a su derecha (x 172–270, base y 150). Paleta x 17–27, y 32–126.

## Grupo E (cine, cineDelante)

NOTAS:
Código: /home/user/varios/atomo/plato/escenas/_tmp_E/jm-comun.js (node --check correcto; fuera del bloque D es idéntico a jm-comun.base.js). Pruebas: jm-prueba-e1…e6.html, 6 planos de 5 s cada una, «sin errores en la página». Fotogramas de 1–21 ms tras pintar las capas fijas (el primero de cada vista, hasta ~150 ms).

Estructura: e_VISTAS con 16 vistas ('encuadre' o 'encuadre/camara'); lo desconocido cae en fachada. cine() pinta fondo + delante y devuelve la geometría; cineDelante() repite solo lo de delante. Cabecera puesta al día. Todo lo auxiliar lleva prefijo e_ y no se exporta.

Opciones (nuevas con *):
- fachada: epoca 1995|2005|2017|2019|2026, cola 0–1, rival. /taquilla: epoca, entradas 0–1.
- sala: lleno, pantalla selva|espacio|blanco. /publico: lleno, pantalla, susto, criticos, gafas*.
- contador: cifra (admite decimales), gira 0–1, signo, lluvia*. /suma: cifras, total 0–1, totalCifra*, ver*.
- tele (sin opciones). /tienda: carrito* (0–1 o false).
- prensa: flash (0–1 o true). /periodico: isla 0–1.
- salon: epoca 2017, polvo*, chaval* (0–1 o false). /estante: cambio 0–1, polvo*.
- anuncio: enfado 0–1. /vela: sin opciones.
- calendario: de, a, u, navidad, polvo*. /caja: polvo.

Avisos:
- 260 + 960 + 800 = 2020: para marcar 2027 en la suma hay que pasar totalCifra: 2027.
- La gente de las colas, el carrito y el chaval mide 12–13 px (e_figura con mini). El público sentado, la taquillera y los periodistas de espaldas miden unos 19 px y van recortados por butacas o cristal.
- Las cajas grandes van a escala 2–3 de PIEZAS_JM (cajaJuego, tablero, cartucho).
- En anuncio la imagen lleva una flecha circular con «?», no un número.
- Poco visto: gafas apenas se nota a 640 px; el pulgar de los críticos es pequeño.

GEOMETRÍA:
Todas las cotas en px del lienzo 320×180. cine() devuelve además estos datos en su geometría (suelo, libre, etc.).

FACHADA (suelo 150; pies libres x 4–316, acera y 133–157)
- Puertas de cristal x 76–144, y 74–132 (dos hojas dobles: 76–108 y 112–144).
- Cartel grande x 36–64, y 76–120; cartel pequeño x 150–170, y 78–120.
- Taquilla x 178–226, y 80–132; cristal x 179–225, y 81–110; ranura (202, 110); precio en placa x 183–199, y 117–127.
- Marquesina x 20–240, y 38–60 (pictograma en x 104–156); letrero vertical x 195–211, y 7–39; pretil y 22–36.
- Cola: persona i en x = 170 − 8·i, suelo 143–144, hasta 22 (se sale por la izquierda).
- Vecino izquierdo x 0–26; vecino derecho o cine rival x 238–319 (marquesina de estrellas y 52–70; su cola x 242–320, suelos 140 y 145).
- Bordillo y 157–159; calzada y 160–179.
- cineDelante: farolas en x 12 y 252 (poste hasta y 158, farol en y 74–82); buzón x 264–278, y 136–157 (solo sin rival); coches en carriles y 170 y 179; copos gordos.
- Luna (232, 13). 2026: abeto x 6–26, y 100–143.

FACHADA/TAQUILLA (suelo 164; libre x 4–100 y x 220–316)
- Taquilla x 102–218, y 42–161; cristal x 109–211, y 98–141; taquillera en x 148–160, y 124–141.
- Mostrador de latón y 142–146, con repisa saliente a la izquierda x 95–110.
- Ranura (116, 141): la tira de entradas sale hacia la izquierda y cae pasado x 96. Cliente en x ≈ 82, dir 1.
- Panel de entradas y precio y 58–94 (precio x 167–209).
- Cartel x 22–72, y 64–130; apliques en x 88 y 232, y 72–84.
- Postes del cordón x 226 y 240; puerta x 246–306, y 60–146.
- cineDelante: solo copos.

SALA (suelo 152 = pasillo de cruce y 147–158, x 10–310; escenario suelo 104, x 70–250)
- Pantalla x 62–258, y 28–96; embocadura x 44–276, y 20–104.
- Filas de espaldas: filos en y 109, 117, 126, 136; pasillo central x ≈ 146–174.
- Salida x 6–26, y 92–142. Apliques: izquierda x 20 y 8; derecha x 312, y 76.
- cineDelante: butacas de primer término con filo en y 165–166 (centros 160 ± 25·i ± 6), con cabezas de espaldas en y 157–164.

SALA/PUBLICO (suelo 172; libre x 10–310, y 172–177)
- Filos de las filas en y 62, 76, 90, 104, 118; paso 16 px; pasillo x 151–169.
- Cabina del proyector x 140–180, y 20–38.
- Niño del susto: butaca (104, 118). Críticos: (192, 104) y (208, 104), con bocadillo encima.
- Moqueta y 140–173; borde del escenario y 174–179.

CONTADOR (inserto)
- Carcasa x 44–272, y 44–130; ventanillas en x 78, 122, 166, 210 (40 de ancho), y 60–114.
- Signo o roseta (60, 87); placa «× 1 000 000» x 112–214, y 118–127; manivela x 272–290, y 68–108.
- Calculadora x 8–52, y 126–160 (tira hasta y ≈ 80); rollo de entradas (292, 114).
- Libre para mano o pieza: y 136–179 (hay monedas y billetes fijos).

CONTADOR/SUMA (inserto)
- Contadores pequeños x 124–194, en y 22, 50 y 78 (33 de alto); entradas x 92–116; signos «+» (210, 48) y (210, 76).
- Raya y 107–110, x 86–234; total x 96–222, y 116–161.
- Calculadora (14, 112). Libre: x 0–80 y x 240–319, y 60–179.

TELE (suelo 160; libre x 96–150 y x 232–300)
- Pantalla x 162–218, y 80–118; tele x 154–234, y 73–124; mueble x 148–232, y 122–150.
- Ventana x 22–86, y 40–104. Lámpara de pie x 288 (pantalla y 58–76). Puf (252, 142). Alfombra oval centro (262, 172).
- cineDelante: sofá x 40–208 con filo en y 152 (quien va detrás, con suelo 160, asoma cabeza y hombros); gato en x ≈ 60–84, y 142–152; palomitas x 196–208.

TELE/TIENDA (suelo 170; libre x 10–310)
- Estantería x 6–269; baldas en y 58, 112, 148.
- Expositor x 108–192, y 62–111, con la caja centrada en (150, 104) a escala 2; etiqueta «$19» x 132–168, y 112–122.
- Pilar x 272–319: cartel x 278–314, y 54–86; extintor x 290–302, y 108–140.
- Carrito por suelo 166.

PRENSA (suelo 142, detrás de la mesa; sitios x 128 y 192)
- Telón x 58–262, y 26–118. Focos x 28 y 292, y 46–60. Tarima y 132–152.
- cineDelante: mesa x 84–236, tablero en y 133; micros x 150–170, y 120–133; letreros x 118–136 y 184–202; jarra x 222–232.
- cineDelante: periodistas (cabezas y 150–179, cámaras hasta y ≈ 145); pértiga de (40, 168) a (112, 108); cámara de tele x 264–294, y 124–179.

PRENSA/PERIODICO (inserto, desde arriba)
- Periódico x 62–246, y 24–172; foto de la máscara x 74–150, y 56–116; recuadro «?» x 160–234, y 56–96.
- Folleto: se posa con la esquina en (150, 84), 78×62. Café centro (286, 126), r 18. Plato (22, 44). Cuenta x 266–304, y 62–100.
- Libre para mano: x 0–58, y 100–179.

SALON (suelo 162; libre x 110–215)
- Tele x 32–100, y 72–118 (2017: plana x 26–104, y 70–116); mueble x 22–108, y 118–143; consola (64, 140).
- Estante x 109–193, y 67; tablero cerrado con ancla (150, 66), visible en x ≈ 150–172, y 30–66.
- Pósteres x 110–142, y 84–126 y x 152–188, y 82–128. Ventana x 204–264, y 38–102; luna (244, 56).
- Puf (170, 146). Lámpara de lava base (294, 120). Chaval de 2017: cruza por suelo 156.
- cineDelante: mesa baja x 222–302, y 164–179 (objetos encima hasta y 148).

SALON/ESTANTE (inserto)
- Estante x 14–306, y 125–134.
- Tablero cerrado x 138–182, y 53–125; el cartucho queda centrado en (160, 125), 51×57; destello en (160, 96).
- Libros x 24–70; cintas x 74–108; mando x 224–250; copa x 258–272; cubo x 288–301. Telaraña x 262–306, y 60–104.
- Libre: x 20–190, y 142–176 (póster abajo en x 196–250).

ANUNCIO (inserto)
- Imagen x 14–192, y 50–112; titular y 42–45; texto y 118–172.
- Comentarios x 206–306, y 50–176 (6 burbujas de 21 px de paso); contador de pulgares en (212, 34) con su cifra en x 224–250.
- Libre: x 14–192, y 150–172 (sobre las rayas de texto).

ANUNCIO/VELA (inserto)
- Foto x 20–204, y 40–152; llamas en (60, 126), (84, 132), (112, 124), (140, 131), (166, 127); lazo en (262, 80–106).
- Libre: x 214–306, y 110–172.

CALENDARIO (suelo 164; libre x 20–300)
- Taco x 110–210, y 28–131; año con base en y 68, centrado en x 160; día rodeado (184, 111) con navidad.
- Repisa x 18–96, y 98, con la caja en (62, 98). Reloj (64, 50). Ventana x 234–302, y 52–112.
- Radiador x 238–298, y 124–150. Planta x 206–222. Friso y 132–151.
- Montón de hojas x 116–220, y 158–175. cineDelante: hojas que caen desde (160, 80).

CALENDARIO/CAJA (inserto)
- Repisa x 22–298, y 121–129; caja a escala 3 centrada en (160, 121), 99×69.
- Libros x 34–78; bola (92, 110); marco x 232–262; trofeo x 271–291. Araña en x 226, y 34–76.
- Perchero x 52–132, y 146–178. Libre para mano: x 140–300, y 136–176.

EN TODAS: la esquina de Atom (x 278–318, y 4–44) y la franja del año (x 20–170, y 0–20) quedan en fondo tranquilo.

## Grupo F (selva, selvaDelante)

NOTAS:
Copia terminada: /home/user/varios/atomo/plato/escenas/_tmp_F/jm-comun.js (node --check bien; capturas «sin errores en la página»; 1–47 ms por fotograma, ~140 ms solo el primero de cada vista). Prueba: _tmp_F/jm-prueba-f.html, con planos de 2,4 s (no 5: jm-gancho dura ~30 s y hay 12).
selva(R,t,o) despacha por o.encuadre + o.camara a auxiliares f_*; devuelve f_GEO[vista] más lo dinámico. Cabecera de la sección E puesta al día. Paleta propia f_C (no toca C).
- claro: cascada viva, arcoíris, poza, ruina con espiral y glifos de dado, sendero de losas, tucanes, mariposas, niebla. o.vidas 0–3: corazones, en selvaDelante (solo si se pasa). Cámara ruina: puerta, dintel, dos antorchas, mono de piedra con dado.
- caida: cielo, dosel desde arriba, río. o.cae 0–1 (devuelve cae:[x,y]); o.figura false = solo la estela. Cámara dosel: o.aparta 0–1 (por omisión 1) mueve las hojas enormes de selvaDelante.
- cabana: cabaña de tarde; barandilla en selvaDelante. Cámara tabla: o.graba 0–1 (por omisión 1) abre 18 rayas; devuelve punta.
- espacio: casa flotante; o.gira true o rad/s; devuelve pie, angulo, punto(u,v). Cámara ventana: o.pasa 0–1, o.dados [a,b].
- calle: o.lianas 0–1, o.huellas 0–1; coches en selvaDelante (o.coches false). Cámara ventana: o.lianas.
Avisos: calle:ventana, caida y tabla son insertos sin chibi de pie. T.mano pide la manga como '#rrggbb' y su manga recta cruza la repisa de la tabla: usar T.brazo o sinManga. El piloto de la consola es el rojo del kit; el verde lo pone el decorado. Con o.gira, actores solo vía punto() o ninguno. Sin revisar a 1920: caida, dosel, ruina, las dos ventanas.

GEOMETRÍA:
Todo en px de 320×180; es lo que devuelve selva() (f_GEO). Arriba siempre tranquilo (hojas oscuras, cielo o piedra).

CALLE (general): suelo 139 (acera y 126–141); libre x 8–232. Ventana de las lianas [98,58,126,86] (primer piso de la fachada de piedra, x 62–189); las lianas bajan por x 84–152 hasta y ~146. Escaparate de juegos [68,103,142,122], puerta [150,100,168,126]. Farola x 60 (luz y 68). Plaza del fondo x 190–246, y 106–126; abeto (213,120), punta y 71. Semáforo x 240 (caja y 66–84), tucán en (241,63). Fachada azul x 246–319 (tejado y 52). Calzada y 144–179; coches (selvaDelante) con base en y 160 (va a la derecha) y 177 (a la izquierda), 46×17 px: no tapan a quien está en la acera. Huellas: de (118,131) a (294,171). Luna (222,16).

CALLE:ventana (inserto): hueco [86,34,234,138]; repisa nevada [68,136,252,147]; consola con base en (160,138), 66×28 (s:2); brote de las lianas (160,110); tele [126,50,194,103], pantalla [132,56,178,96]; letrero del dado [272,96,294,120]; friso de la tienda y 164–179. Hojas gigantes de selvaDelante en las esquinas de abajo (x < 90 y x > 270).

CLARO: suelo 150; libre x 48–252. Troncos gigantes x 0–30 y 290–319. Cascada [131,33,149,108], poza [84,106,208,122]. Ruina [204,70,262,134], arco [222,104,242,134], espiral (232,94). Columna rota [62,95,76,136], tambor caído x 82–100, y 138–147. Sendero: (168,178) → (176,160) → (196,146) → (226,136). Tucán (62,67) en su rama (y ~66–70, x 24–78). Corazones (44, 58, 72; base y 174). Helechos de delante: x < 40 y x > 262, por debajo de y 150.

CLARO:ruina: suelo 156; libre x 28–236 (escalones y 146–157 entre x 90–230). Puerta oscura [130,62,190,146]; pilares x 104–130 y 190–216; dintel [96,38,224,62], espiral (160,50). Antorchas (117,82) y (203,82). Mono: peana [246,119,290,157], cuerpo y 78–119 centrado en x 270, dado [247,87,257,97]. Tambores x 18–52, y 139–162; vasija x 64–76.

CAIDA (inserto): horizonte y 78; el río va de (153,80) abajo a la izquierda, x ≈ 130 en y 179 (lista exacta en G.rio); ruina (248,100). La figura cae de (196,−8) a (152,120): G.cae.

CAIDA:dosel: suelo 124 (rama gorda y ~120–133 de lado a lado); libre x 60–240; nido (140,119); tucán (252,121). Con o.aparta 0 las hojas de delante tapan casi todo el centro.

CABANA: suelo 118 (plataforma [56,118,264,124]); libre x 62–258; suelo de la selva 164 (libre x 20–300; tronco x 138–186 con raíces hasta x ~118–206). Pared x 112–214, y 70–118; puerta [150,84,172,118]; TABLA [180,86,206,104]; ventana [123,85,137,97]; hamaca x 67–112, y 90–106; poste x 64; caja x 74–88; lata x 94–100; barril [226,103,238,118] con el catalejo; farol (224,80); escala [240,118,252,166]; techo y 46–72. Barandilla de delante: postes x 58, 126, 196, 260 (y 105–118), cuerda y 111–116.

CABANA:tabla (inserto): TABLA [70,44,250,132]; rayas en [88,62,232,116] (dos filas, y 64–86 y 94–115); navaja con la punta en (262,90); repisa [56,152,266,156]; hueco de la puerta x 0–36. Una mano que grabe: G.punta.

ESPACIO: jardín y 124 (x 110–210), pero se mueve ±3 px: usar G.pie (centro del jardín) para los pies; libre a los lados de la puerta (x 134–150 y 170–186). Casa [132,60,188,124], puerta [155,108,165,124]; gira alrededor de (160,106). Planeta (262,142) r 30; luna (40,58) r 9; cometa abajo a la izquierda.

ESPACIO:ventana: suelo 158; libre x 76–248. Hueco [96,30,224,122]; repisa [83,125,237,130]; tablero redondo centrado en (160,125); dados sobre (196,106); estantería [12,44,72,148]; sillón [252,108,304,150]; lámpara x 244 (pantalla y 68–84). Planeta: G.planeta.

Por delante de los personajes (selvaDelante): helechos y corazones (claro), helechos (ruina), jirones de nube (caida), hojas enormes (dosel), barandilla (cabana), meteoritos (espacio), coches y copos (calle), hojas gigantes y copos (calle:ventana).

## Grupo G (hoy, hoyDelante)

NOTAS:
Copia terminada en /home/user/varios/atomo/plato/escenas/_tmp_G/jm-comun.js (node --check pasa; página «sin errores»; nada tocado fuera del bloque F). Prueba: _tmp_G/jm-prueba-g.html (11 planos de 2,8 s: jm-gancho dura 31,5 s) y _tmp_G/jm-vida-g.html (opciones quietas).
SIN COMPROBAR / A MEDIAS: (1) 'ojos' es el encuadre con menos vida propia con o.mira fija (65 px cambian en 0,5 s; el resto 250–1.900): conviene animar o.mira desde la escena. (2) hoyTaller: la mano de vanallsburgMayor (pie 101) no se volvió a recortar tras acercarlo 3 px; antes quedaba ~4 px corta de la lámina. (3) Mesa de hoyTaller no cotejada con la de 1979 del grupo A. (4) Liana de 'mesa' movida a x 266 para alcanzar el lápiz: no mirada en captura. (5) Rendimiento: 3–50 ms; ~150 ms el primer fotograma de cada encuadre (crea capas).
DESVÍOS: cartulina de reglas desde y 26 (no 24); 'reglas' es inserto sin suelo, como las 5 segundas cámaras (probados con T.mano; usar { sinManga: true } o T.brazo); 'juntos' es composición NUESTRA (rinoceronte quieto junto a la lámpara): revisar derechos; ojos sin párpados ni arcos (con arco parecían cara).
OPCIONES: estudio: lluvia, enVentana, gato, lianas 0–1, rollo 0–1, tablero, dados [a,b]|false, lapiz. mesa: dados, tira 0–1, lapiz, fichas, liana 0–1 (en Delante). linea/bucle: traza 0–1 (omisión 1), gato. reglas: tacha 0–3, avance 0–1, ficha, atrezo. meta: avance, ficha. ojos: mira −1..1, juntos 0–1, gato. juntos: rino. hoyTaller: enVentana, mesa. esquina: perro 0–1, lapiz.
EXPORTADAS nuevas: g_lapizMesa(R, x, y, { vertical }) y g_lapizGrande(R, x0, y0, x1, y1, { negro }) para que la escena mueva el lápiz con la liana.

GEOMETRÍA:
Cada hoy() devuelve su constante (G_EST, G_MES, G_LIN, G_BUC, G_REG, G_MET, G_OJO, G_JUN, G_TAL, G_ESQ). hoyDelante va DESPUÉS de los actores. Atom (x 278–318, y 4–44) y año libres en todos.

ESTUDIO general: suelo 162 (158–174). Libres: x≈70–78 y x≈230 (pies 162–164). Escritorio (Delante) x 92–208, tablero y 131, frente y 135–166: tapa a quien pase detrás. Sobre él: libros x 96–121, dados [125,130], tablero en perspectiva centro [158,130] (gema [158,125]), lápiz [187,128], flexo rojo base x 197–208, pantalla x 190–204 y 94–106. Liana de la escena: ancla [187,5] (PIEZAS_JM.liana, largo ≈120 hasta el lápiz). Ventana 178–250 × 32–98. Librería 6–60 × 34–152 (juegos x 19–39, y 80–102). Mapa 70–124 × 40–84, reloj (146,50), lámpara x 270, cuadro 280–314 × 60–90, sillón y gato [291,136]. o.lianas: primera en x 236; cuelgan en x 5, 12, 196, 208, 222, 236, 254 (desde y 5) y 64, 100, 132, 160 (desde y 23); vides en y 27 y y 114; delante, hojas grandes en las esquinas de abajo y sobre la mesa. o.rollo: frente de la mesa x 141–151, y 135–166; luego suelo hacia la izquierda hasta x≈10, y 166–178, por delante de los actores.

MESA (inserto): tablero 95–224 × 36–139; casillas[] (57 centros, salida abajo-izquierda ≈[109,127]) y gema ≈[164,87] en el retorno. Dados parados [64,100] y [47,124]; entran desde [340,70]; dadosAhora. Lápiz goma [270,62] → punta [250,124]. Liana (Delante) ancla [266,−3], largo 68; devuelve liana (punta). Taza [50,58], folleto 22–64 × 136–168, hoja de palotes 246–304 × 142–176. Mano: entra por [319,150] o [0,160]; libre x 232–318, y 40–140.

LINEA general: suelo 172 (162–176). Pliego 12–268 × 26–112. Nudos [36,76] mesa+flexo, [96,76] 1981, [160,76] 2017, [222,76] 2026; piezas encima, años debajo; vuelta por y≈102; flecha [36,84]. Devuelve punta y ruta. Tarjetas 274–300 × 58–82 y 288–314 × 88–110. Banco x 18–96, y 138–152; ficus [252,152]; gato [214,164]. Personajes: x 278–300; señalar hacia [268,80]. Delante: esquina de mesa x 0–74, y 146–179.
BUCLE (inserto): nudo [102,108], flecha [102,119], dibujo mesa+flexo x≈66–140, y 24–96; salida a la derecha por y≈108→90; vuelta por y≈152; consola [262,146] ×2, «2026» en base y 174. Devuelve punta. Libre x 150–318, y 40–96.

REGLAS (inserto): cartulina 70–250 × 26–150 sobre caja 57–263 × 22–151. Círculos r 19 en [108,60], [160,60], [212,60]. Casillas [89+14k, 117±2] (k 0–9), gema [234,117]; devuelve ficha. Mesa desde y 122. Libres para manos: x 4–52 y x 268–316, y 60–148. Delante: hoja y dados x 10–66, fichas x 272–310, y 150–178.
META (inserto): casillas [30,112], [78,104], [126,112], [174,104] (lado 35), gema [246,106] r 22; borde de mesa y 162; devuelve ficha. Libre x 20–200, y 30–70.

OJOS general: suelo 172. Lámina 14–270 × 27–140. Ojos [120,54] y [164,54], r 14. Recuadros 76 × 58: izq. desde [22,76], der. desde [186,76], juntos en [104,76]; devuelve izqAhora/derAhora. Gato [66,166]. Personajes: x 278–302; señalar [270,90]. Delante: taburete x 8–38, y 141–178.
JUNTOS (inserto): hoja 24–272 × 24–170, dibujo 36–260 × 36–158; sillón [86,142], lámpara [133,142], rinoceronte [216,143] (mira a la izquierda). Lápices y goma x 276–318, y 60–160.

HOYTALLER general: suelo 162 (158–174). Ilustrador: R.actor(…, 101, 162, t, { dir: 1, sostiene: [125,147] }) (pie y hoja). Mesa (Delante) x 116–182: canto de cerca y 154, de lejos y 134, patas hasta y 172; lámina [124,151]–[164,151]–[170,137]–[132,137]; flexo pantalla x 154–171, y 97–110. Ventana 18–94 × 36–102 (horizonte y≈65). Radiador 26–86 × 116–148. Medallas 110–132 y 138–160 × 38–72. Láminas x 170–205, y 39–88. Repisa 108–196, y 92–95; perro [152,90]. Reloj (226,32). Estantería 216–272 × 48–152. Mesita [196,140]. Rollos x 284–300. Libres: x≈40, 200, 250, 296.
ESQUINA (inserto): papel 0–252 × 0–152, filete x 238/y 138; perro base [204,128] (≈ x 168–240, y 82–128), hoja centro [128,84]. Devuelve punta, cola (= punta + [78,−64]) y mano. Goma (Delante) 270–296 × 160–173.