import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '../../test-results/.auth/user.json')
const adminAuthFile = path.join(__dirname, '../../test-results/.auth/admin.json')

setup('authenticate as user', async ({ page }) => {
  // Perform authentication steps
  await page.goto('/login')
  
  // Fill login form
  await page.fill('[data-testid="email-input"]', 'user@test.com')
  await page.fill('[data-testid="password-input"]', 'testpass123')
  
  // Click login button
  await page.click('[data-testid="login-button"]')
  
  // Wait for successful login - check for redirect to dashboard
  await page.waitForURL('/dashboard')
  
  // Verify we're logged in
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
  
  // Save signed-in state to 'user.json'
  await page.context().storageState({ path: authFile })
})

setup('authenticate as admin', async ({ page }) => {
  // Perform authentication steps for admin
  await page.goto('/login')
  
  // Fill login form with admin credentials
  await page.fill('[data-testid="email-input"]', 'admin@test.com')
  await page.fill('[data-testid="password-input"]', 'testpass123')
  
  // Click login button
  await page.click('[data-testid="login-button"]')
  
  // Wait for successful login
  await page.waitForURL('/dashboard')
  
  // Verify admin-specific elements are visible
  await expect(page.locator('[data-testid="admin-menu"]')).toBeVisible()
  
  // Save signed-in state to 'admin.json'
  await page.context().storageState({ path: adminAuthFile })
})

setup('setup test data', async ({ page }) => {
  // This setup can be used to create test data
  // that will be available for all tests
  
  console.log('Setting up test data...')
  
  // Example: Create test menu items via API
  await page.request.post('/api/menu/items', {
    data: {
      name: 'Test Pizza',
      description: 'A test pizza for E2E testing',
      price: 15.99,
      category: 'Main Courses',
      available: true,
    },
  })
  
  // Example: Create test reservation
  await page.request.post('/api/reservations', {
    data: {
      guestName: 'Test Guest',
      guestEmail: 'test@example.com',
      guestPhone: '+1234567890',
      partySize: 4,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
    },
  })
  
  console.log('Test data setup completed')
})