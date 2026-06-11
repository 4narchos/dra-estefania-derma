#!/usr/bin/env node
/**
 * PREPARE WEB-IN-BIO DEPLOY
 * =========================
 *
 * Este script se ejecuta ÚNICAMENTE en GitHub Actions (CI),
 * antes del build de Astro. Su objetivo es transformar el sitio
 * completo en una única página de contacto estilo "web in bio"
 * para el dominio principal.
 *
 * QUÉ HACE:
 * 1. Mueve las páginas no deseadas a src/pages/_draft/ (Astro las ignora)
 * 2. Copia src/pages/contacto.astro → src/pages/index.astro
 *
 * RESULTADO:
 * - El build solo genera /index.html (la página de contacto)
 * - Las demás páginas no se compilan ni se despliegan
 *
 * REVERSIÓN:
 * - En CI no es necesario (runner efímero).
 * - En local, corre: node scripts/restore-pages.js
 */

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "..", "src", "pages");
const DRAFT_DIR = path.join(PAGES_DIR, "_draft");

// Páginas que se ocultan del build
const PAGES_TO_HIDE = ["index.astro", "acerca.astro", "servicios.astro"];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Creado: ${path.relative(process.cwd(), dir)}`);
  }
}

function moveToDraft(filename) {
  const src = path.join(PAGES_DIR, filename);
  const dest = path.join(DRAFT_DIR, filename);

  if (!fs.existsSync(src)) {
    console.log(`⚠️  No encontrado: ${filename} (quizás ya fue movido)`);
    return;
  }

  fs.renameSync(src, dest);
  console.log(`📦 Movido: ${filename} → src/pages/_draft/${filename}`);
}

function copyContactoToIndex() {
  const src = path.join(PAGES_DIR, "contacto.astro");
  const dest = path.join(PAGES_DIR, "index.astro");

  if (!fs.existsSync(src)) {
    throw new Error("❌ No se encontró src/pages/contacto.astro");
  }

  fs.copyFileSync(src, dest);
  console.log(`📋 Copiado: contacto.astro → index.astro`);
}

// ─── MAIN ───
console.log("🚀 Preparando deploy tipo web-in-bio...\n");

ensureDir(DRAFT_DIR);

for (const page of PAGES_TO_HIDE) {
  moveToDraft(page);
}

copyContactoToIndex();

console.log("\n✅ Listo. Astro solo generará la página de contacto en la raíz.\n");
