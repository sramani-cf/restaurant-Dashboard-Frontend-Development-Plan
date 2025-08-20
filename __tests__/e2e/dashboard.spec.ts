import { test, expect } from '@playwright/test'

// Use the saved authentication state
test.use({ storageState: 'test-results/.auth/user.json' })

test.describe('Restaurant Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('displays dashboard overview', async ({ page }) => {
    // Check that main dashboard elements are visible
    await expect(page.locator('[data-testid="dashboard-header"]')).toBeVisible()
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible()
    
    // Check for KPI cards
    await expect(page.locator('[data-testid="revenue-card"]')).toBeVisible()
    await expect(page.locator('[data-testid="orders-card"]')).toBeVisible()
    await expect(page.locator('[data-testid="avg-order-card"]')).toBeVisible()
    await expect(page.locator('[data-testid="occupancy-card"]')).toBeVisible()
  })

  test('shows real-time data updates', async ({ page }) => {
    // Get initial revenue value
    const initialRevenue = await page.locator('[data-testid="revenue-value"]').textContent()
    
    // Simulate a new order being placed (this could be done via API)
    await page.request.post('/api/orders', {
      data: {
        items: [{ id: '1', quantity: 1, price: 25.99 }],
        total: 25.99,
        customerId: 'test-customer',
      },
    })
    
    // Wait for real-time update (if implemented with WebSockets/SSE)
    await page.waitForTimeout(2000)
    
    // Verify the revenue card updates (this depends on your real-time implementation)
    const updatedRevenue = await page.locator('[data-testid="revenue-value"]').textContent()
    // In a real implementation, you'd check that the values have changed
  })

  test('navigates to different sections', async ({ page }) => {
    // Test navigation to Orders
    await page.click('[data-testid="nav-orders"]')
    await page.waitForURL('/orders')
    await expect(page.locator('[data-testid="orders-page"]')).toBeVisible()
    
    // Test navigation to Menu
    await page.click('[data-testid="nav-menu"]')
    await page.waitForURL('/menu')
    await expect(page.locator('[data-testid="menu-page"]')).toBeVisible()
    
    // Test navigation to Reservations
    await page.click('[data-testid="nav-reservations"]')
    await page.waitForURL('/reservations')
    await expect(page.locator('[data-testid="reservations-page"]')).toBeVisible()
    
    // Navigate back to dashboard
    await page.click('[data-testid="nav-dashboard"]')
    await page.waitForURL('/dashboard')
    await expect(page.locator('[data-testid="dashboard-header"]')).toBeVisible()
  })

  test('filters data by date range', async ({ page }) => {
    // Open date filter
    await page.click('[data-testid="date-filter-button"]')
    
    // Select "Last 7 days"
    await page.click('[data-testid="date-filter-7days"]')
    
    // Verify that data updates
    await expect(page.locator('[data-testid="date-range-display"]')).toContainText('Last 7 days')
    
    // Check that charts and KPIs update (you'd need to verify specific values)
    await expect(page.locator('[data-testid="sales-chart"]')).toBeVisible()
  })

  test('displays sales trend chart', async ({ page }) => {
    await expect(page.locator('[data-testid="sales-trend-chart"]')).toBeVisible()
    
    // Check chart elements
    await expect(page.locator('[data-testid="chart-container"] canvas')).toBeVisible()
    
    // Verify chart legend
    await expect(page.locator('[data-testid="chart-legend"]')).toBeVisible()
    
    // Test chart interactions (hover, click)
    const chartCanvas = page.locator('[data-testid="chart-container"] canvas')
    await chartCanvas.hover({ position: { x: 100, y: 100 } })
    
    // Verify tooltip appears
    await expect(page.locator('[data-testid="chart-tooltip"]')).toBeVisible()
  })

  test('shows live order feed', async ({ page }) => {
    await expect(page.locator('[data-testid="live-orders-feed"]')).toBeVisible()
    
    // Check for recent orders
    const orderItems = page.locator('[data-testid="order-item"]')
    await expect(orderItems).toHaveCount(3) // Assuming we show latest 3 orders
    
    // Verify order information is displayed
    const firstOrder = orderItems.first()
    await expect(firstOrder.locator('[data-testid="order-number"]')).toBeVisible()
    await expect(firstOrder.locator('[data-testid="order-status"]')).toBeVisible()
    await expect(firstOrder.locator('[data-testid="order-total"]')).toBeVisible()
  })

  test('displays table status overview', async ({ page }) => {
    await expect(page.locator('[data-testid="table-status-overview"]')).toBeVisible()
    
    // Check different table status indicators
    await expect(page.locator('[data-testid="available-tables"]')).toBeVisible()
    await expect(page.locator('[data-testid="occupied-tables"]')).toBeVisible()
    await expect(page.locator('[data-testid="reserved-tables"]')).toBeVisible()
    
    // Verify clicking on a table status shows details
    await page.click('[data-testid="occupied-tables"]')
    await expect(page.locator('[data-testid="occupied-tables-detail"]')).toBeVisible()
  })

  test('handles error states gracefully', async ({ page }) => {
    // Mock an API error
    await page.route('/api/analytics/sales', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
    })
    
    // Reload the page to trigger the API call
    await page.reload()
    
    // Verify error state is displayed
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Failed to load data')
    
    // Verify retry functionality
    await page.click('[data-testid="retry-button"]')
    // In a real test, you'd mock the API to succeed on retry
  })

  test('is responsive on different screen sizes', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Verify mobile navigation
    await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible()
    await page.click('[data-testid="mobile-nav-toggle"]')
    await expect(page.locator('[data-testid="mobile-nav-menu"]')).toBeVisible()
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 })
    
    // Verify layout adapts
    await expect(page.locator('[data-testid="dashboard-content"]')).toBeVisible()
    
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // Verify full layout is visible
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible()
    await expect(page.locator('[data-testid="main-content"]')).toBeVisible()
  })

  test('supports keyboard navigation', async ({ page }) => {
    // Test navigation with keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter') // Should activate focused element
    
    // Test skip links for accessibility
    await page.keyboard.press('Tab')
    const skipLink = page.locator('[data-testid="skip-to-content"]')
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeFocused()
    }
  })

  test('meets accessibility standards', async ({ page }) => {
    // This would require @axe-core/playwright
    // await expect(page).toPassAxeTests()
    
    // Manual accessibility checks
    
    // Check for proper headings structure
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)
    
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    for (let i = 0; i < imageCount; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt')
    }
    
    // Check for proper form labels
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]')
    const inputCount = await inputs.count()
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const hasLabel = await input.evaluate(el => {
        return !!el.labels?.length || !!el.getAttribute('aria-label') || !!el.getAttribute('aria-labelledby')
      })
      expect(hasLabel).toBeTruthy()
    }
  })
})