import { test, expect } from '@playwright/test'

test('contact form can be filled and submit button becomes enabled', async ({ page }) => {
  await page.goto('/contact')

  await page.fill('input[name="name"]', 'Playwright Tester')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'This is a test message.')

  const submit = page.locator('button[type="submit"]')
  await expect(submit).toBeEnabled()
})
