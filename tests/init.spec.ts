import { devices, expect, test } from '@playwright/test'

test.use({
  ...devices['iPhone 14 Pro Max'],
})

test('eruda initial success', async ({ page }) => {
  await page.goto('/')
  const element = page.locator('html > div#eruda').first()
  await element.locator('div.eruda-entry-btn').click()
  const tabConsole = element.locator('span.eruda-active').first()
  await expect(tabConsole).toHaveText('All')
})
