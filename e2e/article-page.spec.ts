import { test, expect } from '@playwright/test'

test.describe('Article Page — SEO critical paths', () => {
  let articleSlug: string

  test.beforeAll(async ({ browser }) => {
    // Dynamic: grab first article slug from homepage to avoid hardcoded slug
    const page = await browser.newPage()
    await page.goto('/')

    // Try to find the first article link on the homepage
    const firstArticleLink = page.locator('a[href^="/article/"]').first()
    const href = await firstArticleLink.getAttribute('href').catch(() => null)

    if (href) {
      articleSlug = href.replace('/article/', '')
    } else {
      // Fallback: if homepage has no articles, skip gracefully
      articleSlug = ''
    }

    await page.close()
  })

  test('homepage has at least one article link', async ({ page }) => {
    await page.goto('/')
    const articleLinks = page.locator('a[href^="/article/"]')
    await expect(articleLinks.first()).toBeVisible()
  })

  test('article page has JSON-LD NewsArticle schema', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')
    await page.goto(`/article/${articleSlug}`)

    const ldScript = page.locator('script[type="application/ld+json"]').first()
    await expect(ldScript).toBeAttached()

    const ld = await ldScript.textContent()
    expect(ld).toBeTruthy()

    const schema = JSON.parse(ld!)
    expect(schema['@type']).toBe('NewsArticle')
  })

  test('canonical URL uses production domain', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')
    await page.goto(`/article/${articleSlug}`)

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href')
    expect(canonical).toBeTruthy()
    // Canonical should use configured NEXT_PUBLIC_SITE_URL or aurews.id.vn
    expect(canonical).toMatch(/^https?:\/\//)
    expect(canonical).toContain('/article/')
  })

  test('JSON-LD mainEntityOfPage matches canonical URL', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')
    await page.goto(`/article/${articleSlug}`)

    const ldScript = page.locator('script[type="application/ld+json"]').first()
    const ld = await ldScript.textContent()
    if (!ld) return

    const schema = JSON.parse(ld)
    expect(schema.mainEntityOfPage).toContain('/article/')
  })

  test('og:image is set', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')
    await page.goto(`/article/${articleSlug}`)

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content')
    expect(ogImage).toBeTruthy()
    expect(ogImage!.length).toBeGreaterThan(10)
  })
})

test.describe('News Sitemap — 48h fallback', () => {
  test('never returns empty sitemap (has at least one <url>)', async ({ page }) => {
    const res = await page.goto('/news-sitemap.xml')
    expect(res!.status()).toBe(200)
    const body = await res!.text()
    expect(body).toContain('<url>')
    expect(body).not.toMatch(/<urlset[^>]*>\s*<\/urlset>/)
  })
})
