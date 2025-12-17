import { test, expect } from '@playwright/test'

test('portfolio item page renders and shows title', async ({ page }) => {
  await page.goto('/portfolio/uccs-soccer')
  const h1 = page.locator('h1')
  await expect(h1).toBeVisible()
  await expect(page).toHaveURL(/portfolio\/uccs-soccer/)
})
