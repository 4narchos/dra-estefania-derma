# Modo Web-in-Bio / Linktree

## ¿Qué es esto?

Desde junio de 2026, el dominio `estefaniaderma.mx` está configurado para mostrar **únicamente la página de contacto** como una tarjeta de presentación estilo "web in bio" (similar a Linktree).

El sitio web completo (inicio, acerca, servicios) sigue existiendo en el repositorio y se puede ver en local, pero **no se despliega en producción** hasta que se desactive este modo.

---

## ¿Por qué?

La estrategia es:
1. **Ahora**: Publicar solo la página de contacto como tarjeta de presentación mientras se trabaja en el resto del sitio.
2. **Después**: Cuando el sitio completo esté listo, desactivar este modo y publicar todas las páginas.

---

## ¿Cómo funciona?

### En GitHub Actions (producción)

El workflow `.github/workflows/deploy.yml` ejecuta un script antes del build:

```
node scripts/prepare-web-in-bio.js
```

Este script hace dos cosas:
1. **Mueve** las páginas no deseadas a `src/pages/_draft/`:
   - `index.astro` (página de inicio)
   - `acerca.astro`
   - `servicios.astro`
2. **Copia** `contacto.astro` → `index.astro`

Astro ignora automáticamente cualquier archivo dentro de carpetas que empiecen con `_` (guión bajo), por lo que esas páginas no se compilan.

El resultado es que el build solo genera `index.html` (la página de contacto) y se despliega en la raíz del dominio.

### En tu computadora (local)

**No hay cambios.** Todo el sitio sigue estando en `src/pages/` como siempre.

Corre normalmente:

```bash
npm run dev     # ves todo el sitio completo
npm run build   # compila todo el sitio completo
```

Los scripts de `scripts/` no se ejecutan automáticamente en local. Solo corren en CI.

---

## Archivos involucrados

| Archivo | Propósito |
|---------|-----------|
| `scripts/prepare-web-in-bio.js` | Script que se ejecuta en CI para ocultar páginas y poner contacto como index |
| `scripts/restore-pages.js` | Script de emergencia para revertir los cambios en local (si ejecutaste el anterior por accidente) |
| `.github/workflows/deploy.yml` | Workflow modificado para ejecutar `prepare-web-in-bio.js` antes del build |
| `src/pages/contacto.astro` | Página principal que se muestra en producción (copiada como `index.astro` en CI) |
| `src/pages/index.astro` | Página de inicio completa (oculta en producción, visible en local) |
| `src/pages/acerca.astro` | Página acerca (oculta en producción, visible en local) |
| `src/pages/servicios.astro` | Página servicios (oculta en producción, visible en local) |

---

## ¿Cómo publicar el sitio completo? (revertir web-in-bio)

Cuando quieras que el dominio muestre todo el sitio web con todas sus páginas, haz lo siguiente:

### Opción A: Desactivar el script en el workflow (recomendada)

1. Edita `.github/workflows/deploy.yml`
2. **Elimina o comenta** este paso:

   ```yaml
   # - name: Prepare web-in-bio deploy
   #   run: node scripts/prepare-web-in-bio.js
   ```

3. Haz commit y push a `main`:

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "chore: desactivar modo web-in-bio, publicar sitio completo"
   git push origin main
   ```

4. El siguiente deploy generará todas las páginas.

### Opción B: Eliminar los scripts (más limpio)

Si ya no vas a usar el modo web-in-bio nunca más:

```bash
rm scripts/prepare-web-in-bio.js
rm scripts/restore-pages.js
rm WEB-IN-BIO.md
# Edita .github/workflows/deploy.yml para quitar el paso
```

Luego commit y push.

---

## ¿Qué pasa si ejecuté prepare-web-in-bio.js en local por accidente?

No pasa nada. Corre el script de restauración:

```bash
node scripts/restore-pages.js
```

Esto devuelve `index.astro`, `acerca.astro` y `servicios.astro` a `src/pages/` y elimina la copia de `index.astro`.

---

## Notas técnicas

- Astro ignora carpetas/ archivos que empiecen con `_` dentro de `src/pages/`. Por eso `_draft/` funciona como "cajón de sastre" sin afectar el build.
- El script `prepare-web-in-bio.js` usa `fs.copyFileSync` para crear `index.astro`, por lo que `contacto.astro` sigue existiendo (no se mueve, se copia).
- El runner de GitHub Actions es efímero: cada vez que corre, empieza desde cero. No hay necesidad de "revertir" nada en CI.
