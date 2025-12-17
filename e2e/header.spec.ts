import { test, expect } from '@playwright/test'

test('header navigation opens and navigates to work section', async ({ page }) => {
  await page.goto('/')
  // open mobile nav toggle
  await page.click('button[aria-label="toggle navigation"]')
  // click the My Work link
  await page.click('a[href="/#work"]')
  // verify the work section is visible (hash navigation might not update URL in static export)
  await expect(page.locator('#work').first()).toBeInViewport()
})
