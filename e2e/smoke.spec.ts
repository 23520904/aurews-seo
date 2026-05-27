import { test, expect } from '@playwright/test'

test('homepage is reachable and shows articles', async ({ page }) => {
  const res = await page.goto('/')
  expect(res!.status()).toBe(200)
  await expect(page.locator('h1, h2, h3').first()).toBeVisible()
})

test('sitemap.xml is accessible', async ({ page }) => {
  const res = await page.goto('/sitemap.xml')
  expect(res!.status()).toBe(200)
  const ct = res!.headers()['content-type']
  expect(ct).toMatch(/xml/)
})

test('news-sitemap.xml is never empty', async ({ page }) => {
  const res = await page.goto('/news-sitemap.xml')
  expect(res!.status()).toBe(200)
  expect(await res!.text()).toContain('<url>')
})

test('login page renders', async ({ page }) => {
  await page.goto('/auth/login')
  await expect(page.locator('input[type="email"]')).toBeVisible()
})
