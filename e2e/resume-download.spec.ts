import { test, expect } from '@playwright/test'

test('resume PDF is downloadable and valid', async ({ request }) => {
  const res = await request.get('/resume/Hilliard-M-Scott-Resume-2025.pdf')
  expect(res.status()).toBe(200)
  const ct = res.headers()['content-type'] || ''
  expect(ct).toContain('pdf')
  const body = await res.body()
  expect(body.length).toBeGreaterThan(1000)
})
