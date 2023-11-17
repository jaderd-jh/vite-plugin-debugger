import { devices, expect, test } from '@playwright/test'

test.use({
  ...devices['iPhone 13 Pro'],
})

test('eruda initial success', async ({ page }) => {
  await page.goto('/')
  // await page.locator('.eruda-entry-btn').click()
  const tabConsole = page.locator('.eruda-active').first()
  await expect(tabConsole).toHaveText('All')
})
