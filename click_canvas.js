import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Listen for console events and log them to the terminal
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });

  await page.goto('http://localhost:8000/game.html');
  await page.click('canvas');

  // Wait for 3 seconds to see if enemies spawn
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'screenshot_after_delay.png' });
  await browser.close();
})();
