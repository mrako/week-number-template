const { test, expect } = require('@playwright/test');
const { getWeekNumber } = require('../src/weeknumber');

test.describe('week number', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL);
    await page.waitForSelector('h1');
  });

  test('is displayed correctly', async ({ page }) => {
    const contents = page.locator('h1');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await expect(contents).toHaveText(getWeekNumber().toString());
  });
});
