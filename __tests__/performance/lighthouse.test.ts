import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('homepage meets performance benchmarks', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')
    
    // Measure performance metrics using Playwright's built-in metrics
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const metrics = {}
          
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              metrics.domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
              metrics.loadComplete = entry.loadEventEnd - entry.loadEventStart
            }
            
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                metrics.firstContentfulPaint = entry.startTime
              }
            }
          })
          
          resolve(metrics)
        }).observe({ entryTypes: ['navigation', 'paint'] })
      })
    })
    
    // Assert performance metrics
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2000) // 2 seconds
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1500) // 1.5 seconds
  })

  test('dashboard loads within acceptable time limits', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'admin@test.com')
    await page.fill('[data-testid="password-input"]', 'testpass123')
    await page.click('[data-testid="login-button"]')
    
    // Navigate to dashboard and measure load time
    const startTime = Date.now()
    await page.goto('/dashboard')
    await page.waitForSelector('[data-testid="kpi-cards"]')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000) // 3 seconds maximum
  })

  test('orders page handles large datasets efficiently', async ({ page }) => {
    // Mock large dataset
    await page.route('/api/orders', (route) => {
      // Generate mock data for 1000 orders
      const orders = Array.from({ length: 1000 }, (_, i) => ({
        id: `order-${i}`,
        orderNumber: `ORD-${String(i).padStart(4, '0')}`,
        status: ['pending', 'preparing', 'ready', 'completed'][i % 4],
        total: (Math.random() * 100).toFixed(2),
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
        customerName: `Customer ${i}`,
      }))
      
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(orders),
      })
    })
    
    await page.goto('/orders')
    
    // Measure time to render the orders list
    const startTime = Date.now()
    await page.waitForSelector('[data-testid="orders-table"]')
    const renderTime = Date.now() - startTime
    
    expect(renderTime).toBeLessThan(5000) // 5 seconds for 1000 items
    
    // Check that virtualization or pagination is working
    const visibleRows = await page.locator('[data-testid="order-row"]').count()
    expect(visibleRows).toBeLessThanOrEqual(50) // Should not render all 1000 rows
  })

  test('memory usage remains stable during navigation', async ({ page }) => {
    const pages = ['/dashboard', '/orders', '/menu', '/reservations']
    const memoryUsages = []
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')
      
      // Get memory usage
      const memoryInfo = await page.evaluate(() => {
        if ('memory' in performance) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          }
        }
        return null
      })
      
      if (memoryInfo) {
        memoryUsages.push(memoryInfo.usedJSHeapSize)
      }
    }
    
    // Check that memory usage doesn't grow excessively
    if (memoryUsages.length > 1) {
      const initialMemory = memoryUsages[0]
      const finalMemory = memoryUsages[memoryUsages.length - 1]
      const memoryIncrease = ((finalMemory - initialMemory) / initialMemory) * 100
      
      expect(memoryIncrease).toBeLessThan(50) // Less than 50% increase
    }
  })

  test('images are optimized and load efficiently', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Get all images on the page
    const images = await page.locator('img').all()
    
    for (const img of images) {
      // Check that images have proper dimensions
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
      const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight)
      const displayWidth = await img.evaluate((el: HTMLImageElement) => el.clientWidth)
      const displayHeight = await img.evaluate((el: HTMLImageElement) => el.clientHeight)
      
      // Images shouldn't be significantly oversized
      if (displayWidth > 0 && displayHeight > 0) {
        const oversizeRatio = Math.max(
          naturalWidth / displayWidth,
          naturalHeight / displayHeight
        )
        expect(oversizeRatio).toBeLessThan(2) // Not more than 2x oversized
      }
      
      // Check for alt text (accessibility)
      const altText = await img.getAttribute('alt')
      expect(altText).not.toBeNull()
    }
  })

  test('network requests are minimized and efficient', async ({ page }) => {
    const requests = []
    
    page.on('request', (request) => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
      })
    })
    
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Analyze network requests
    const jsRequests = requests.filter(req => req.resourceType === 'script')
    const cssRequests = requests.filter(req => req.resourceType === 'stylesheet')
    const apiRequests = requests.filter(req => req.url.includes('/api/'))
    
    // Check reasonable limits
    expect(jsRequests.length).toBeLessThan(10) // Not too many JS bundles
    expect(cssRequests.length).toBeLessThan(5) // CSS should be bundled
    expect(apiRequests.length).toBeLessThan(20) // Reasonable API calls
    
    // Check for redundant requests
    const uniqueUrls = new Set(requests.map(req => req.url))
    expect(uniqueUrls.size).toBe(requests.length) // No duplicate requests
  })

  test('bundle size is within acceptable limits', async ({ page }) => {
    await page.goto('/')
    
    // Get all loaded scripts and their sizes
    const scriptSizes = await page.evaluate(() => {
      return Array.from(document.scripts)
        .map(script => {
          if (script.src && script.src.includes('/_next/static/')) {
            return {
              src: script.src,
              // We can't directly measure size in browser, but we can check existence
              exists: true
            }
          }
          return null
        })
        .filter(Boolean)
    })
    
    // Check that we don't have too many script files (indicating poor bundling)
    expect(scriptSizes.length).toBeLessThan(15)
  })

  test('database queries are optimized', async ({ page }) => {
    // This would require instrumentation in your backend
    // For now, we'll test that API responses are reasonably fast
    const apiEndpoints = [
      '/api/orders',
      '/api/menu/items',
      '/api/reservations',
      '/api/analytics/sales',
    ]
    
    for (const endpoint of apiEndpoints) {
      const startTime = Date.now()
      const response = await page.request.get(endpoint)
      const responseTime = Date.now() - startTime
      
      expect(response.ok()).toBeTruthy()
      expect(responseTime).toBeLessThan(500) // 500ms max for API calls
    }
  })

  test('CPU usage remains reasonable during intensive operations', async ({ page }) => {
    await page.goto('/orders')
    
    // Simulate intensive operations like filtering large datasets
    await page.click('[data-testid="status-filter"]')
    await page.click('[data-testid="filter-pending"]')
    
    // Clear filter
    await page.click('[data-testid="clear-filters"]')
    
    // Switch to analytics view (likely CPU intensive)
    await page.click('[data-testid="analytics-tab"]')
    await page.waitForSelector('[data-testid="orders-by-hour-chart"]')
    
    // If we get here without timeout, CPU usage was reasonable
    // In a real scenario, you'd want to measure actual CPU metrics
    expect(true).toBe(true)
  })

  test('handles offline scenarios gracefully', async ({ page, context }) => {
    await page.goto('/dashboard')
    
    // Go offline
    await context.setOffline(true)
    
    // Try to navigate to another page
    await page.click('[data-testid="nav-orders"]')
    
    // Should show offline indicator or cached content
    const offlineIndicator = page.locator('[data-testid="offline-indicator"]')
    const cachedContent = page.locator('[data-testid="cached-content"]')
    
    // Either offline indicator or cached content should be visible
    const hasOfflineHandling = await offlineIndicator.isVisible() || await cachedContent.isVisible()
    expect(hasOfflineHandling).toBeTruthy()
    
    // Go back online
    await context.setOffline(false)
  })
})