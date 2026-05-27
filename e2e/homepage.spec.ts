import { test, expect } from '@playwright/test'

test('homepage displays header, main title, article cards and navigation categories', async ({ page }) => {
  await page.goto('/')
  
  // Verify correct title tag contains Aurews
  await expect(page).toHaveTitle(/Aurews/i)
  
  // Verify that the navigation bar has categories/links
  const navLinks = page.locator('nav a')
  await expect(navLinks.first()).toBeVisible()
  
  // Verify the page contains article elements or cards
  const articleLinks = page.locator('a[href^="/article/"]')
  await expect(articleLinks.first()).toBeVisible()
})
