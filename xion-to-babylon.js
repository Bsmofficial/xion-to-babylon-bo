const puppeteer = require("puppeteer");
const fs = require("fs");

const wallets = JSON.parse(fs.readFileSync("wallet.json")).wallets;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (const wallet of wallets) {
    console.log(`Processing wallet: ${wallet.address}`);

    await page.goto("https://union.build/bridge");

    // Connect wallet
    await page.click("button:has-text('Connect')");
    await page.waitForTimeout(2000); // Wait for wallet popup (simulate)

    // Select Xion as source
    await page.click("text=Xion");
    await page.click("text=Babylon");

    // Enter amount
    await page.type("input[type='number']", "0.1");

    // Click Bridge/Confirm
    await page.click("button:has-text('Bridge')");
    await page.waitForTimeout(10000); // Wait for processing

    console.log(`Transfer submitted for ${wallet.address}`);
  }

  await browser.close();
})();
