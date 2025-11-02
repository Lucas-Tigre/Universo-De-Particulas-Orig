
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/game.html');
  await page.waitForSelector('#canvas');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
