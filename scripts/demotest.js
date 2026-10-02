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
  await page.goto("http://localhost:3121/demo/freelancer", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 2000));

  // edit site name in top bar
  const name = await page.evaluate(() => {
    const input = document.querySelector("header input");
    if (!input) return "NO-INPUT";
    input.focus();
    document.execCommand("selectAll", false);
    document.execCommand("insertText", false, "Demo Renamed");
    input.blur();
    return "edited";
  });
  console.log("edit:", name);
  await new Promise((r) => setTimeout(r, 2500)); // autosave debounce
  const saved = await page.evaluate(() => ({
    status: document.body.innerText.includes("saved in this browser") ? "pill-ok" : "pill-missing",
    stored: !!localStorage.getItem("createio-demo-freelancer"),
    hasName: (localStorage.getItem("createio-demo-freelancer") || "").includes("Demo Renamed"),
  }));
  console.log("persist:", JSON.stringify(saved));

  // reload → survives?
  await page.reload({ waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1500));
  const after = await page.evaluate(() => document.querySelector("header input")?.value);
  console.log("after reload site name:", after);

  // undo still works?
  await page.keyboard.down("Meta"); await page.keyboard.press("z"); await page.keyboard.up("Meta");
  await new Promise((r) => setTimeout(r, 500));
  console.log("ERRORS:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
