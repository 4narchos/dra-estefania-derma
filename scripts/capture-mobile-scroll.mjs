import { chromium, devices } from "@playwright/test";
import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3456;
const DIST = path.resolve(process.cwd(), "dist");
const OUT = path.resolve(process.cwd(), "screenshots");

// Servidor estático simple
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST, req.url === "/" ? "/index.html" : req.url);
  if (filePath.endsWith("/")) filePath += "index.html";
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`Serving ${DIST} at http://localhost:${PORT}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 14"],
  locale: "es-MX",
});
const page = await context.newPage();

page.on("console", (msg) => console.log("[console]", msg.type(), msg.text()));
page.on("pageerror", (err) => console.error("[pageerror]", err.message, err.stack));

await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

// Esperar a que termine el preloader y GSAP se inicialice
await page.waitForSelector("html.is-loaded", { timeout: 15000 });
await page.waitForTimeout(1500);

const offsets = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850, 3000];

for (const offset of offsets) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), offset);
  await page.waitForTimeout(400);
  const screenshot = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT, `home-intro-mobile-${offset}.png`), screenshot);
  console.log(`Captured scroll ${offset}`);
}

const debugAt = async (offset) => {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), offset);
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => {
    const s = (sel) => {
      const e = document.querySelector(sel);
      if (!e) return null;
      const cs = window.getComputedStyle(e);
      return {
        opacity: cs.opacity,
        transform: cs.transform,
        color: cs.color,
        display: cs.display,
      };
    };
    return {
      scrollY: window.scrollY,
      progress: window.scrollY / document.querySelector(".his-track")?.offsetHeight,
      presVisual: s(".his-pres-visual img"),
      presSignature: s(".his-pres-signature"),
      presTitle: s(".his-pres-title"),
      presHeader: s(".his-pres-header"),
      presMenu: s(".his-pres-menu"),
      heroTitle: s(".his-hero-title"),
      heroScene: s(".his-hero-scene"),
    };
  });
  console.log(`\nDebug at scroll ${offset}:`, JSON.stringify(info, null, 2));
};

await debugAt(0);
await debugAt(600);
await debugAt(1200);

// Logs de posición de elementos clave
const rects = await page.evaluate(() => {
  const el = (sel) => document.querySelector(sel);
  const r = (sel) => {
    const e = el(sel);
    if (!e) return null;
    const rect = e.getBoundingClientRect();
    const cs = window.getComputedStyle(e);
    return {
      selector: sel,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      opacity: cs.opacity,
      overflow: cs.overflow,
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      position: cs.position,
    };
  };
  return [r("html"), r("body"), r("main"), r(".home-intro-scroll-mobile"), r(".his-track"), r(".his-stage"), r(".his-hero-scene"), r(".his-pres-scene")];
});

console.log("\nElement rects/styles at scroll 3000:");
console.table(rects);

const scrollInfo = await page.evaluate(() => ({
  scrollY: window.scrollY,
  innerHeight: window.innerHeight,
  documentHeight: document.documentElement.scrollHeight,
  trackHeight: document.querySelector(".his-track")?.offsetHeight,
  stageHeight: document.querySelector(".his-stage")?.offsetHeight,
}));
console.log("\nScroll info:", scrollInfo);

await browser.close();
server.close();
console.log("Done");
