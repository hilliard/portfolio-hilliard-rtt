import { test, expect } from '@playwright/test'

test('resume links exist and have correct targets', async ({ page }) => {
  await page.goto('/contact')

  const htmlResume = page.locator('a[href="/resume/hilliard-m-scott-resume-2025.html"]')
  await expect(htmlResume).toHaveCount(1)
  await expect(htmlResume).toHaveAttribute('target', '_blank')

  const pdfResume = page.locator('a[href="/resume/Hilliard-M-Scott-Resume-2025.pdf"]')
  await expect(pdfResume).toHaveCount(1)
  await expect(pdfResume).toHaveAttribute('target', '_blank')
})
