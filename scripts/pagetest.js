// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "shell",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + String(e).slice(0, 200)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3115/", { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "pages@test.com", password: "password123" }) });
  });
  const wid = "w_042667244fa1af68muo8qdzu";
  await page.goto(`http://localhost:3115/builder/${wid}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2000));
  // open Pages tab
  const tabs = await page.evaluate(() => [...document.querySelectorAll("aside button")].map((b) => b.textContent.trim()));
  console.log("tabs:", JSON.stringify(tabs.slice(0, 8)));
  await page.evaluate(() => [...document.querySelectorAll("aside button")].find((b) => b.textContent.trim() === "Pages")?.click());
  await new Promise((r) => setTimeout(r, 1000));
  const panelText = await page.evaluate(() => document.querySelector("aside")?.innerText.slice(0, 400));
  console.log("pages panel:", JSON.stringify(panelText));
  // preview iframe text: check nav links in preview
  const navLinks = await page.evaluate(() => [...document.querySelectorAll("main a")].map((a) => `${a.textContent.trim()}=>${a.getAttribute("href")}`).slice(0, 12));
  console.log("preview links:", JSON.stringify(navLinks));
  console.log("ERRORS:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
