import { test, expect } from '@playwright/test'

test('social links have valid hrefs', async ({ page }) => {
  await page.goto('/contact.html')

  const github = page.locator('a[href^="https://github.com"]')
  await expect(github.first()).toBeVisible()

  const linkedin = page.locator('a[href^="https://linkedin.com"]')
  await expect(linkedin.first()).toBeVisible()

  const twitter = page.locator('a[href^="https://twitter.com"]')
  await expect(twitter.first()).toBeVisible()
})
