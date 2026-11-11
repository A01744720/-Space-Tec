# SPACE TEC — Landing page

Landing page estática, responsive y lista para publicar en **GitHub Pages**.

## Contenido
- `index.html`: estructura y contenido.
- `styles.css`: identidad visual, responsive y animaciones.
- `script.js`: cuenta regresiva, estrellas y audio sintetizado.
- `assets/`: logotipos y guía de identidad visual.

## Personalizar la fecha
En `script.js`, cambia `targetDate` si la fecha/hora del lanzamiento cambia. Actualmente está configurada para el **30 de noviembre de 2026 a las 23:59:59, hora de Sonora (UTC−7)**.

## Publicar en GitHub Pages
1. Descomprime el ZIP.
2. Crea un repositorio en GitHub (por ejemplo, `space-tec`).
3. Sube `index.html`, `styles.css`, `script.js` y la carpeta `assets` a la raíz del repositorio.
4. En GitHub abre **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
7. Espera a que GitHub Pages genere el enlace público.

## Audio
Los navegadores bloquean el audio automático. Por eso el botón **ACTIVAR SONIDO** habilita los tonos. La secuencia se escucha durante los últimos 10 segundos; no se reproduce sonido sin interacción previa del visitante.

## Notas
- No requiere instalación, frameworks ni compilación.
- Usa Google Fonts; si no hay conexión, se muestran fuentes alternativas.
- El sitio respeta la paleta SPACE TEC: azul espacial `#14243B`, dorado `#D7B568` y naranja `#F16B2F`.


## IMPORTANTE: imágenes en GitHub Pages
Esta versión coloca también los tres PNG en la raíz del repositorio y el HTML los llama
con rutas `./nombre-del-archivo.png`. Al subir el sitio, selecciona **todos** los archivos
del ZIP y súbelos a la raíz del repositorio (no subas solamente el HTML).
No cambies los nombres de los PNG; GitHub distingue mayúsculas y minúsculas.
