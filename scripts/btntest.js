/* eslint-disable no-console */
const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "shell",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 300)); });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + String(e).slice(0, 300)));
  await page.setViewport({ width: 1440, height: 900 });

  // login via API to get cookie
  await page.goto("http://localhost:3114/", { waitUntil: "networkidle0" });
  const loginRes = await page.evaluate(async () => {
    const r = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Btn Test", email: "btn"+Date.now()+"@test.com", password: "password123" }) });
    return { status: r.status, body: await r.text() };
  }).catch((e) => ({ status: "goto-first", body: String(e) }));
  console.log("signup:", JSON.stringify(loginRes).slice(0, 200));

  await page.goto("http://localhost:3114/dashboard", { waitUntil: "networkidle0" });
  console.log("dashboard title:", (await page.title()).slice(0, 80));

  // create site via API
  const created = await page.evaluate(async () => {
    const r = await fetch("/api/websites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Button Farm", templateId: "minimal-portfolio", siteType: "Portfolio", ownerName: "Btn Test", tagline: "Tester" }) });
    return { status: r.status, body: await r.text() };
  });
  const wid = JSON.parse(created.body).website.id;
  console.log("created:", wid, "status:", created.status);

  await page.goto(`http://localhost:3114/builder/${wid}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2500));
  const hasBuilder = await page.evaluate(() => document.body.innerText.slice(0, 120));
  console.log("builder text:", JSON.stringify(hasBuilder));

  // click Save
  const saveBtn = await page.evaluateHandle(() => [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Save"));
  if (saveBtn.asElement()) { await saveBtn.asElement().click(); await new Promise((r) => setTimeout(r, 2000)); }
  const savedState = await page.evaluate(() => document.body.innerText.includes("Saved") ? "Saved-visible" : document.body.innerText.slice(200, 320));
  console.log("after save:", JSON.stringify(savedState));

  // click Publish
  const pubBtn = await page.evaluateHandle(() => [...document.querySelectorAll("button")].find((b) => /Publish/.test(b.textContent)));
  if (pubBtn.asElement()) { await pubBtn.asElement().click(); await new Promise((r) => setTimeout(r, 2500)); }
  const afterPub = await page.evaluate(() => ({ unpub: [...document.querySelectorAll("button")].some((b) => b.textContent.includes("Unpublish")), text: document.body.innerText.slice(200, 340) }));
  console.log("after publish:", JSON.stringify(afterPub));

  // preview link
  const previewHref = await page.evaluate(() => { const a = [...document.querySelectorAll("a")].find((x) => x.textContent.trim() === "Preview"); return a ? a.href : null; });
  console.log("preview href:", previewHref);
  if (previewHref) {
    const slug = previewHref.split("/s/")[1];
    const r = await page.evaluate(async (s) => { const res = await fetch(`/s/${s}`); return res.status; }, slug);
    console.log("preview status:", r);
  }

  console.log("CONSOLE ERRORS:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
