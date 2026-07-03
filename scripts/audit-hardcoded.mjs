#!/usr/bin/env node
/**
 * Audit script: detects hardcoded contact/business literals outside data files.
 *
 * Allowed sources of truth:
 * - src/data/site.js
 * - src/data/socialLinks.js
 * - src/data/links.js (may compose from the above)
 *
 * Run with: npm run audit:hardcoded
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;
const ALLOWED_FILES = new Set([
  "src/data/site.js",
  "src/data/socialLinks.js",
  "src/data/links.js",
]);

const PATTERNS = [
  { name: "email", regex: /estefaniaborges\.derma@gmail\.com/g },
  { name: "phone formatted", regex: /999\s?221\s?3021/g },
  { name: "phone raw", regex: /529992213021/g },
  { name: "whatsapp api url", regex: /api\.whatsapp\.com\/send\?phone=/g },
  { name: "doctoralia profile url", regex: /doctoralia\.com\.mx\/mariana-estefania-garcia-borges-2/g },
  { name: "doctoralia short url", regex: /doctoralia\.com\.mx\/z\/DUNvsn/g },
  { name: "instagram url", regex: /instagram\.com\/dra\.estefaniaderma/g },
  { name: "instagram handle", regex: /@dra\.estefaniaderma/g },
  { name: "address full", regex: /C\.\s*20\s*251[^"']*Altabrisa/g },
  { name: "address short", regex: /C\.20\s*#251[^"']*Altabrisa/g },
  { name: "price", regex: /\$1,100\s*MXN/g },
];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...walk(path));
    } else if (/\.(astro|js|jsx|ts|tsx|md|mdx)$/.test(entry)) {
      files.push(path);
    }
  }
  return files;
}

const files = walk(ROOT);
let violations = 0;

for (const file of files) {
  const rel = relative(join(ROOT, ".."), file);
  if (ALLOWED_FILES.has(rel)) continue;

  const content = readFileSync(file, "utf-8");
  for (const { name, regex } of PATTERNS) {
    const matches = content.match(regex);
    if (matches) {
      console.error(`❌ ${rel}: hardcoded ${name} (${matches.length}x)`);
      violations += matches.length;
    }
  }
}

if (violations > 0) {
  console.error(`\nFound ${violations} hardcoded literal(s). Move them to src/data/site.js or src/data/socialLinks.js.`);
  process.exit(1);
}

console.log("✅ No hardcoded contact/business literals found outside data files.");
