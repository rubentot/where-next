import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1000));

// Click Finances tab
let navButtons = await page.$$('nav button');
await navButtons[1].click();
await new Promise(r => setTimeout(r, 1000));

// Click Norway in country selector (last button in the selector row)
// The country pills are inside the "Compare Norway with:" section
const pills = await page.$$('main button');
// Find the Norway pill — it'll be the last country selector
for (const pill of pills) {
  const text = await pill.evaluate(el => el.textContent);
  if (text && text.includes('Norway')) {
    await pill.click();
    break;
  }
}

await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: 'tab2-norway.png', fullPage: true });
console.log('Norway comparison done');

await browser.close();
