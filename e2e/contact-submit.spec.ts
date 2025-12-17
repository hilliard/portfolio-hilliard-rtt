import { test, expect } from '@playwright/test'

test('intercept contact form submission and validate payload', async ({ page }) => {
  await page.goto('/contact')

  await page.fill('input[name="name"]', 'E2E Tester')
  await page.fill('input[name="email"]', 'e2e@example.com')
  await page.fill('textarea[name="message"]', 'Testing contact form submission')

  const requestPromise = page.waitForRequest((req) => req.url().includes('formspree.io') && req.method() === 'POST')

  await page.click('button[type="submit"]')

  const req = await requestPromise
  const post = req.postData() || ''
  expect(post).toContain('name=E2E%20Tester')
  expect(post).toContain('email=e2e%40example.com')
  expect(post).toContain('message=Testing%20contact%20form%20submission')
})
