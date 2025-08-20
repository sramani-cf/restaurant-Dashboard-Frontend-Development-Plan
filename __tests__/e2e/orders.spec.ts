import { test, expect } from '@playwright/test'

// Use the saved authentication state
test.use({ storageState: 'test-results/.auth/user.json' })

test.describe('Orders Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders')
  })

  test('displays orders list', async ({ page }) => {
    // Verify page loads
    await expect(page.locator('[data-testid="orders-page"]')).toBeVisible()
    await expect(page.locator('[data-testid="orders-header"]')).toBeVisible()
    
    // Check for orders table
    await expect(page.locator('[data-testid="orders-table"]')).toBeVisible()
    
    // Verify table headers
    await expect(page.locator('th').filter({ hasText: 'Order #' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Status' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Total' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Time' })).toBeVisible()
  })

  test('creates a new order', async ({ page }) => {
    // Click new order button
    await page.click('[data-testid="new-order-button"]')
    
    // Verify order creation modal opens
    await expect(page.locator('[data-testid="new-order-modal"]')).toBeVisible()
    
    // Select customer
    await page.click('[data-testid="customer-select"]')
    await page.click('[data-testid="customer-option-1"]')
    
    // Add menu items
    await page.click('[data-testid="add-item-button"]')
    await page.click('[data-testid="menu-item-1"]') // Caesar Salad
    await page.click('[data-testid="add-to-order"]')
    
    // Add another item
    await page.click('[data-testid="add-item-button"]')
    await page.click('[data-testid="menu-item-2"]') // Pizza
    
    // Modify quantity
    await page.fill('[data-testid="item-quantity"]', '2')
    await page.click('[data-testid="add-to-order"]')
    
    // Review order
    await expect(page.locator('[data-testid="order-summary"]')).toBeVisible()
    await expect(page.locator('[data-testid="order-total"]')).toContainText('$53.97') // 12.99 + (18.99 * 2)
    
    // Add special instructions
    await page.fill('[data-testid="order-notes"]', 'No onions on pizza')
    
    // Create order
    await page.click('[data-testid="create-order-button"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Order created successfully')
    
    // Verify order appears in list
    const orderRows = page.locator('[data-testid="order-row"]')
    await expect(orderRows.first().locator('[data-testid="order-status"]')).toContainText('pending')
  })

  test('updates order status', async ({ page }) => {
    // Click on first order to view details
    await page.click('[data-testid="order-row"]', { nth: 0 })
    
    // Verify order details modal opens
    await expect(page.locator('[data-testid="order-details-modal"]')).toBeVisible()
    
    // Change status from pending to preparing
    await page.click('[data-testid="status-dropdown"]')
    await page.click('[data-testid="status-preparing"]')
    
    // Confirm status change
    await page.click('[data-testid="confirm-status-change"]')
    
    // Verify status updated
    await expect(page.locator('[data-testid="order-status-badge"]')).toContainText('preparing')
    
    // Close modal
    await page.click('[data-testid="close-modal"]')
    
    // Verify status updated in table
    await expect(page.locator('[data-testid="order-row"]').first().locator('[data-testid="order-status"]')).toContainText('preparing')
  })

  test('filters orders by status', async ({ page }) => {
    // Open status filter
    await page.click('[data-testid="status-filter"]')
    
    // Select 'pending' filter
    await page.click('[data-testid="filter-pending"]')
    
    // Verify only pending orders are shown
    const statusBadges = page.locator('[data-testid="order-status"]')
    const count = await statusBadges.count()
    
    for (let i = 0; i < count; i++) {
      await expect(statusBadges.nth(i)).toContainText('pending')
    }
    
    // Clear filter
    await page.click('[data-testid="clear-filters"]')
    
    // Verify all orders are shown again
    await expect(page.locator('[data-testid="order-row"]')).toHaveCount(4, { timeout: 5000 })
  })

  test('searches orders by customer name', async ({ page }) => {
    // Enter search term
    await page.fill('[data-testid="order-search"]', 'John Doe')
    
    // Wait for search results
    await page.waitForTimeout(500) // Debounced search
    
    // Verify filtered results
    const customerNames = page.locator('[data-testid="customer-name"]')
    const count = await customerNames.count()
    
    for (let i = 0; i < count; i++) {
      await expect(customerNames.nth(i)).toContainText('John Doe')
    }
    
    // Clear search
    await page.fill('[data-testid="order-search"]', '')
    await page.keyboard.press('Escape')
  })

  test('prints order receipt', async ({ page }) => {
    // Click on first order
    await page.click('[data-testid="order-row"]', { nth: 0 })
    
    // Click print receipt button
    const printPromise = page.waitForEvent('popup')
    await page.click('[data-testid="print-receipt-button"]')
    
    const printWindow = await printPromise
    
    // Verify receipt content
    await expect(printWindow.locator('[data-testid="receipt-header"]')).toBeVisible()
    await expect(printWindow.locator('[data-testid="order-items"]')).toBeVisible()
    await expect(printWindow.locator('[data-testid="receipt-total"]')).toBeVisible()
    
    await printWindow.close()
  })

  test('cancels order with confirmation', async ({ page }) => {
    // Click on first order
    await page.click('[data-testid="order-row"]', { nth: 0 })
    
    // Click cancel order button
    await page.click('[data-testid="cancel-order-button"]')
    
    // Verify confirmation modal
    await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible()
    await expect(page.locator('[data-testid="confirmation-message"]')).toContainText('Are you sure you want to cancel this order?')
    
    // Provide cancellation reason
    await page.fill('[data-testid="cancellation-reason"]', 'Customer requested cancellation')
    
    // Confirm cancellation
    await page.click('[data-testid="confirm-cancellation"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Order cancelled successfully')
    
    // Verify order status updated
    await expect(page.locator('[data-testid="order-status-badge"]')).toContainText('cancelled')
  })

  test('displays order timeline', async ({ page }) => {
    // Click on order with multiple status changes
    await page.click('[data-testid="order-row"]', { nth: 1 })
    
    // Click on timeline tab
    await page.click('[data-testid="timeline-tab"]')
    
    // Verify timeline is visible
    await expect(page.locator('[data-testid="order-timeline"]')).toBeVisible()
    
    // Verify timeline entries
    const timelineEntries = page.locator('[data-testid="timeline-entry"]')
    await expect(timelineEntries).toHaveCountGreaterThan(1)
    
    // Verify timeline entry details
    const firstEntry = timelineEntries.first()
    await expect(firstEntry.locator('[data-testid="timeline-status"]')).toBeVisible()
    await expect(firstEntry.locator('[data-testid="timeline-timestamp"]')).toBeVisible()
    await expect(firstEntry.locator('[data-testid="timeline-user"]')).toBeVisible()
  })

  test('handles real-time order updates', async ({ page }) => {
    // Get initial order count
    const initialOrderCount = await page.locator('[data-testid="order-row"]').count()
    
    // Simulate new order creation via API (this would typically come through WebSocket)
    await page.request.post('/api/orders', {
      data: {
        items: [{ id: '1', quantity: 1, price: 15.99 }],
        total: 15.99,
        customerId: 'new-customer',
        tableNumber: 5,
      },
    })
    
    // Wait for real-time update
    await page.waitForTimeout(2000)
    
    // Verify new order appears in list (if real-time updates are implemented)
    const updatedOrderCount = await page.locator('[data-testid="order-row"]').count()
    expect(updatedOrderCount).toBeGreaterThan(initialOrderCount)
  })

  test('exports orders to CSV', async ({ page }) => {
    // Click export button
    await page.click('[data-testid="export-orders-button"]')
    
    // Select date range for export
    await page.click('[data-testid="export-date-range"]')
    await page.click('[data-testid="last-week-option"]')
    
    // Start download
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="download-csv"]')
    
    const download = await downloadPromise
    
    // Verify download
    expect(download.suggestedFilename()).toContain('orders')
    expect(download.suggestedFilename()).toContain('.csv')
  })

  test('displays order analytics', async ({ page }) => {
    // Click analytics tab
    await page.click('[data-testid="analytics-tab"]')
    
    // Verify analytics widgets
    await expect(page.locator('[data-testid="orders-by-hour-chart"]')).toBeVisible()
    await expect(page.locator('[data-testid="popular-items-chart"]')).toBeVisible()
    await expect(page.locator('[data-testid="avg-order-time-metric"]')).toBeVisible()
    
    // Interact with charts
    const chart = page.locator('[data-testid="orders-by-hour-chart"] canvas')
    await chart.hover({ position: { x: 100, y: 100 } })
    
    // Verify tooltip appears
    await expect(page.locator('[data-testid="chart-tooltip"]')).toBeVisible()
  })

  test('handles kitchen display integration', async ({ page }) => {
    // Navigate to KDS view
    await page.click('[data-testid="kds-view-button"]')
    
    // Verify KDS interface
    await expect(page.locator('[data-testid="kds-stations"]')).toBeVisible()
    
    // Check for orders in preparation
    const preparingOrders = page.locator('[data-testid="preparing-order"]')
    await expect(preparingOrders).toHaveCountGreaterThan(0)
    
    // Mark order as ready
    await preparingOrders.first().click()
    await page.click('[data-testid="mark-ready-button"]')
    
    // Verify status change
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Order marked as ready')
  })

  test('mobile responsive order management', async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Verify mobile layout
    await expect(page.locator('[data-testid="mobile-orders-list"]')).toBeVisible()
    
    // Test mobile order creation
    await page.click('[data-testid="mobile-fab-button"]')
    await expect(page.locator('[data-testid="mobile-order-form"]')).toBeVisible()
    
    // Test swipe actions on mobile
    const orderCard = page.locator('[data-testid="order-card"]').first()
    
    // Swipe to reveal actions
    await orderCard.hover()
    await page.mouse.down()
    await page.mouse.move(50, 0)
    await page.mouse.up()
    
    // Verify action buttons appear
    await expect(page.locator('[data-testid="order-actions"]')).toBeVisible()
  })
})