# Workflow: Replicar una sección web a partir de una referencia real

> Este documento describe el proceso que usamos para tomar una página web real (por ejemplo, la landing de Affinity) y replicarla fielmente en el proyecto Astro de Dra. Estefanía.
>
> Guarda el procedimiento, las herramientas, las rutas de los datos y los criterios de calidad, para que cualquier agente futuro pueda repetirlo sin depender del contexto de la conversación.

## Cuándo usar este workflow

- El usuario pide "hazlo igual a X página".
- El usuario dice "tómate inspiración de Y sección" y luego rechaza por fuentes, colores o dimensiones.
- Necesitamos crear un nuevo bloque cuyo diseño ya existe en una referencia externa.

## Paso 1 — Guardar la referencia localmente

Antes de escribir código, capturar la página real en un lugar accesible fuera del proyecto principal (para no ensuciar el repo con archivos de investigación).

Ubicación recomendada:

```text
/Users/dr.coro/affinity-inspiration/
```

(o similar; crear un directorio con el nombre del sitio de referencia).

### Qué capturar

1. **Screenshots completos** de la sección a replicar, en desktop y móvil.
2. **HTML parcial** del componente objetivo.
3. **Estilos computados** de los elementos clave.
4. **Animaciones** si las hay (keyframes, transformaciones en scroll).

### Herramientas

- **Playwright** con Python en un entorno virtual aislado.
- Scripts reutilizables ubicados en `/tmp/venv-affinity/` (o similar).

Ejemplo de comandos base:

```bash
# Crear entorno aislado
python3 -m venv /tmp/venv-affinity
source /tmp/venv-affinity/bin/activate
pip install playwright beautifulsoup4
playwright install chromium

# Ejecutar script de extracción
/tmp/venv-affinity/bin/python extract_carousel_exact.py
```

## Paso 2 — Extraer estilos exactos con Playwright

No adivinar. Medir. Los valores que hay que capturar son:

- `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
- `color`, `background-color`
- `border-radius`, `padding`, `margin`, `gap`
- `width`, `height`, `max-width`
- `display`, `flex-direction`, `justify-content`, `align-items`
- `transform`, `opacity` (para animaciones)
- Bounding box (`getBoundingClientRect`) para dimensiones y posiciones

### Script modelo

```python
from playwright.sync_api import sync_playwright

URL = "https://www.ejemplo.com/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
    page.goto(URL, wait_until="networkidle", timeout=120000)

    # Aceptar cookies si es necesario
    try:
        page.locator("#onetrust-accept-btn-handler").click(timeout=5000)
        page.wait_for_timeout(500)
    except Exception:
        pass

    # Localizar elemento objetivo
    el = page.locator("h2", has_text="Título de referencia").first
    el.scroll_into_view_if_needed()
    page.wait_for_timeout(1500)

    props = [
        "font-family", "font-size", "font-weight", "line-height", "letter-spacing",
        "color", "background-color", "border-radius", "padding", "margin",
        "width", "height", "gap", "text-align", "display",
        "flex-direction", "justify-content", "align-items",
    ]

    styles = el.evaluate(
        """(el, props) => {
            const cs = window.getComputedStyle(el);
            const out = {};
            for (const p of props) out[p] = cs.getPropertyValue(p);
            return out;
        }""",
        props,
    )

    rect = el.bounding_box()
    print(styles, rect)
    browser.close()
```

Guardar el resultado en un JSON dentro de `affinity-inspiration/`.

## Paso 3 — Analizar la estructura DOM

Usar el HTML guardado para entender:

- Qué contenedores anidan los elementos.
- Dónde se aplican los gaps y paddings (padre vs hijo).
- Si hay grids, flex rows, slides, marquees, etc.
- Clases CSS y variables inline que definen colores dinámicos.

### Truco útil

Si la página usa CSS-in-JS (como Canva/Affinity), buscar variables inline en `style`, por ejemplo:

```html
<div style="--NlZPbQ:#83D9E1; --4FjUhQ:20px">
```

- `--NlZPbQ` = color de fondo de tarjeta.
- `--4FjUhQ` = border-radius.

Extraer con BeautifulSoup si es necesario:

```python
from bs4 import BeautifulSoup
import re

html = open("reference.html").read()
soup = BeautifulSoup(html, "html.parser")
cards = soup.find_all(attrs={"style": re.compile("--NlZPbQ")})
```

## Paso 4 — Replicar en el componente Astro

### Reglas de oro

1. **No improvisar valores.** Usar exactamente los que se midieron. Si el texto del cliente es más largo, avisar o adaptar proporcionalmente, pero manteniendo la escala tipográfica real.
2. **No mezclar estilos de referencia con estilos del sitio** a menos que sea necesario por accesibilidad. Ejemplo: se conservó el fondo `#211D1D` de Affinity en lugar de forzar el `#0a0a0a` anterior.
3. **Respetar la estructura real:** si en Affinity los botones están debajo del título a la izquierda, no ponerlos a la derecha.
4. **Fuentes:** si la fuente original es propietaria, usar la alternativa libre más cercana ya cargada en el proyecto. Documentar el reemplazo.

### Checklist antes de entregar

- [ ] Dimensiones de tarjetas/botones/títulos coinciden con la referencia.
- [ ] Colores de fondo y texto coinciden (usar color picker si es necesario).
- [ ] Tipografía: familia, tamaño, peso e interlineado correctos.
- [ ] Espaciado: paddings, margins, gaps medidos.
- [ ] Íconos y flechas replicados (usar el mismo path SVG si es posible).
- [ ] Responsive: versión móvil usable.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Build limpio.

## Paso 5 — Verificación visual

1. Levantar el servidor local:

```bash
npm run dev -- --port 4321
```

2. Capturar screenshots de la sección con Playwright en el mismo viewport de la referencia (normalmente 1440 × 900).
3. Comparar lado a lado con la captura original.
4. Revisar móvil (375 × 812).

### Script modelo de screenshot

```python
from playwright.sync_api import sync_playwright

URL = "http://localhost:4321/#seccion"
OUT = "screenshot.png"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
    page.goto(URL, wait_until="networkidle", timeout=120000)
    page.wait_for_timeout(1500)
    page.screenshot(path=OUT, full_page=False)
    browser.close()
```

## Paso 6 — Documentar para siempre

Crear o actualizar:

1. **`DESIGN.md`** — resumen de alto nivel de la sección.
2. **Archivo de referencia específico** si la sección es compleja (ej. `SERVICES_CAROUSEL.md`).
3. **`AGENTS.md`** — nota para futuros agentes apuntando al archivo de referencia.
4. Carpeta `reference/<nombre-referencia>/` con:
   - JSON de estilos extraídos.
   - Capturas originales y actuales.
   - Notas de implementación.

## Ejemplo concreto aplicado

Sección replicada: **Services carousel** de Affinity.

- Referencia: `https://www.affinity.studio/`
- Extracción: `affinity-carousel-exact.json`, `affinity-all-cards.json`
- Implementación: `src/components/ServicesSection.astro`
- Documentación: `SERVICES_CAROUSEL.md`
- Capturas: `reference/affinity-carousel/`

Valores clave medidos y aplicados:

| Elemento | Valor real Affinity | Valor implementado |
|---|---|---|
| Fondo sección | `#211D1D` | `#211D1D` |
| Título | Affinity Serif Variable, 80px, 700, 78.4px | Playfair Display, 80px, 700, 78.4px |
| Lead | Canva Sans, 24px, 400, 33.6px | Inter, 24px, 400, 33.6px |
| Botones | 56×56px, redondo, sin borde | 56×56px, redondo, sin borde |
| Tarjetas | 630×748px, radio 20px, padding 40px | 630×748px, radio 20px, padding 40px |
| Colores tarjetas | `#83D9E1`, `#A7F175`, `#363636` | `#83D9E1`, `#A7F175`, `#363636` |

## Notas importantes

- **No confiar en la memoria.** Siempre extraer de la página real.
- **Si la referencia cambia**, volver a capturar; no usar datos viejos.
- **Si el usuario rechaza una copia**, el problema suele ser que faltó medir exactamente: fuente, color o dimensión. Volver al Paso 2.
- **Mantener el entorno de extracción aislado** para no instalar dependencias globales.
