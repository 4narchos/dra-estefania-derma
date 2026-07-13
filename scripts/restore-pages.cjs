#!/usr/bin/env node
/**
 * RESTORE PAGES (reversión del web-in-bio)
 * ========================================
 *
 * Si por alguna razón ejecutaste prepare-web-in-bio.js en tu
 * máquina local, este script revierte los cambios y restaura
 * el sitio completo.
 *
 * USO:
 *   node scripts/restore-pages.js
 */

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "..", "src", "pages");
const DRAFT_DIR = path.join(PAGES_DIR, "_draft");

const PAGES_TO_RESTORE = ["index.astro", "acerca.astro", "servicios.astro"];

function restoreFromDraft(filename) {
  const src = path.join(DRAFT_DIR, filename);
  const dest = path.join(PAGES_DIR, filename);

  if (!fs.existsSync(src)) {
    console.log(`⚠️  No encontrado en _draft: ${filename}`);
    return;
  }

  fs.renameSync(src, dest);
  console.log(`📦 Restaurado: _draft/${filename} → ${filename}`);
}

function removeGeneratedIndex() {
  const generated = path.join(PAGES_DIR, "index.astro");
  const originalContacto = path.join(PAGES_DIR, "contacto.astro");

  // Solo eliminamos index.astro si es una copia idéntica de contacto.astro
  if (fs.existsSync(generated) && fs.existsSync(originalContacto)) {
    const genContent = fs.readFileSync(generated, "utf8");
    const contactContent = fs.readFileSync(originalContacto, "utf8");

    if (genContent === contactContent) {
      fs.unlinkSync(generated);
      console.log(`🗑️  Eliminado: index.astro (copia de contacto.astro)`);
      return;
    }
  }

  console.log(`⚠️  index.astro no fue eliminado (puede ser la página original)`);
}

// ─── MAIN ───
console.log("🔧 Restaurando sitio completo...\n");

for (const page of PAGES_TO_RESTORE) {
  restoreFromDraft(page);
}

removeGeneratedIndex();

console.log("\n✅ Sitio completo restaurado. Corre 'npm run dev' para ver todo.\n");
