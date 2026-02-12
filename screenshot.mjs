import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

// Tab 1
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: 'tab1.png', fullPage: true });
console.log('Tab 1 done');

// Tab 2 - click Finances
let navButtons = await page.$$('nav button');
await navButtons[1].click();
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: 'tab2.png', fullPage: true });
console.log('Tab 2 done');

// Tab 3 - click Decision
navButtons = await page.$$('nav button');
await navButtons[2].click();
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: 'tab3.png', fullPage: true });
console.log('Tab 3 done');

// Tab 4 - click Schools
navButtons = await page.$$('nav button');
await navButtons[3].click();
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: 'tab4.png', fullPage: true });
console.log('Tab 4 done');

await browser.close();
