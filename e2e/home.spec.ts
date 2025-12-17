import { test, expect } from '@playwright/test'

test('homepage shows heading', async ({ page }) => {
  await page.goto('/')
  // basic check: page has at least one H1
  const h1 = page.locator('h1')
  await expect(h1.first()).toBeVisible()
})
