import { chromium } from "@playwright/test";
import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3457;
const DIST = path.resolve(process.cwd(), "dist");
const OUT = path.resolve(process.cwd(), "screenshots");

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

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "es-MX",
});
const page = await context.newPage();

page.on("pageerror", (err) => console.error("[pageerror]", err.message));

await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
await page.waitForSelector("html.is-loaded", { timeout: 15000 });
await page.waitForTimeout(1500);

const offsets = [0, 400, 800, 1200];
for (const offset of offsets) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), offset);
  await page.waitForTimeout(400);
  const screenshot = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT, `home-desktop-${offset}.png`), screenshot);
  console.log(`Captured desktop scroll ${offset}`);
}

await browser.close();
server.close();
console.log("Done");
