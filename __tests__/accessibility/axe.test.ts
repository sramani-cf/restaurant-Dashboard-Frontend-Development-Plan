import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('login page is accessible', async ({ page }) => {
    await page.goto('/login')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('dashboard is accessible after login', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'admin@test.com')
    await page.fill('[data-testid="password-input"]', 'testpass123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/dashboard')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('orders page is accessible', async ({ page }) => {
    await page.goto('/orders')
    await page.waitForSelector('[data-testid="orders-table"]')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('menu management page is accessible', async ({ page }) => {
    await page.goto('/menu')
    await page.waitForSelector('[data-testid="menu-items-table"]')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('reservations page is accessible', async ({ page }) => {
    await page.goto('/reservations')
    await page.waitForSelector('[data-testid="reservations-grid"]')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('forms have proper labeling', async ({ page }) => {
    await page.goto('/reservations')
    
    // Open new reservation form
    await page.click('[data-testid="new-reservation-button"]')
    await page.waitForSelector('[data-testid="reservation-form"]')
    
    // Check that all form inputs have proper labels
    const inputs = await page.locator('input, select, textarea').all()
    
    for (const input of inputs) {
      const hasLabel = await input.evaluate((el) => {
        // Check for label element
        const label = document.querySelector(`label[for="${el.id}"]`)
        if (label) return true
        
        // Check for aria-label
        if (el.getAttribute('aria-label')) return true
        
        // Check for aria-labelledby
        if (el.getAttribute('aria-labelledby')) return true
        
        // Check if wrapped in label
        if (el.closest('label')) return true
        
        return false
      })
      
      expect(hasLabel).toBeTruthy()
    }
  })

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Test keyboard navigation through main navigation
    await page.keyboard.press('Tab') // Should focus on first navigable element
    
    const focusedElement1 = await page.evaluate(() => {
      return {
        tagName: document.activeElement?.tagName,
        role: document.activeElement?.getAttribute('role'),
        href: document.activeElement?.getAttribute('href'),
      }
    })
    
    // Continue tabbing through navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    const focusedElement2 = await page.evaluate(() => {
      return {
        tagName: document.activeElement?.tagName,
        role: document.activeElement?.getAttribute('role'),
        href: document.activeElement?.getAttribute('href'),
      }
    })
    
    // Elements should be focusable
    expect(focusedElement1.tagName).toBeDefined()
    expect(focusedElement2.tagName).toBeDefined()
    expect(focusedElement1).not.toEqual(focusedElement2)
  })

  test('skip links are present and functional', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Tab to focus on skip link (should be first focusable element)
    await page.keyboard.press('Tab')
    
    const skipLink = await page.locator(':focus').first()
    const skipLinkText = await skipLink.textContent()
    
    expect(skipLinkText).toMatch(/skip to|skip navigation/i)
    
    // Activate skip link
    await page.keyboard.press('Enter')
    
    // Verify focus moved to main content
    const focusedElement = await page.evaluate(() => {
      return {
        tagName: document.activeElement?.tagName,
        id: document.activeElement?.id,
        role: document.activeElement?.getAttribute('role'),
      }
    })
    
    expect(focusedElement.id || focusedElement.role).toMatch(/main|content/i)
  })

  test('modal dialogs are accessible', async ({ page }) => {
    await page.goto('/orders')
    
    // Open a modal dialog
    await page.click('[data-testid="new-order-button"]')
    await page.waitForSelector('[data-testid="new-order-modal"]')
    
    // Test modal accessibility
    const modal = page.locator('[data-testid="new-order-modal"]')
    
    // Check ARIA attributes
    const ariaModal = await modal.getAttribute('aria-modal')
    const ariaLabel = await modal.getAttribute('aria-label')
    const ariaLabelledBy = await modal.getAttribute('aria-labelledby')
    
    expect(ariaModal).toBe('true')
    expect(ariaLabel || ariaLabelledBy).toBeTruthy()
    
    // Test focus trap
    const focusableElements = await modal.locator('button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all()
    expect(focusableElements.length).toBeGreaterThan(0)
    
    // First focusable element should be focused
    const firstFocusable = focusableElements[0]
    expect(await firstFocusable.evaluate(el => el === document.activeElement)).toBeTruthy()
    
    // Test that Tab cycles through modal elements only
    await page.keyboard.press('Tab')
    const focusedAfterTab = await page.evaluate(() => {
      const activeEl = document.activeElement
      return activeEl?.closest('[data-testid="new-order-modal"]') !== null
    })
    expect(focusedAfterTab).toBeTruthy()
    
    // Close modal and verify focus returns
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('tables have proper headers and structure', async ({ page }) => {
    await page.goto('/orders')
    await page.waitForSelector('[data-testid="orders-table"]')
    
    // Check table headers
    const table = page.locator('[data-testid="orders-table"]')
    const headers = await table.locator('th').all()
    
    expect(headers.length).toBeGreaterThan(0)
    
    // Each header should have proper text
    for (const header of headers) {
      const headerText = await header.textContent()
      expect(headerText?.trim()).toBeTruthy()
      
      // Check for scope attribute
      const scope = await header.getAttribute('scope')
      expect(scope).toBe('col')
    }
    
    // Check that table has caption or aria-label
    const tableCaption = await table.locator('caption').count()
    const tableAriaLabel = await table.getAttribute('aria-label')
    const tableAriaLabelledBy = await table.getAttribute('aria-labelledby')
    
    expect(tableCaption > 0 || tableAriaLabel || tableAriaLabelledBy).toBeTruthy()
  })

  test('images have appropriate alt text', async ({ page }) => {
    await page.goto('/dashboard')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')
      
      // Images should have alt text or be marked as decorative
      if (role === 'presentation' || role === 'none') {
        // Decorative images should have empty alt
        expect(alt).toBe('')
      } else {
        // Content images should have meaningful alt text
        expect(alt).toBeTruthy()
        expect(alt?.length).toBeGreaterThan(0)
      }
    }
  })

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/dashboard')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('[data-testid="kpi-cards"]')
      .analyze()
    
    // Specifically check for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    )
    
    expect(contrastViolations).toEqual([])
  })

  test('error messages are properly announced', async ({ page }) => {
    await page.goto('/login')
    
    // Submit form without filling required fields
    await page.click('[data-testid="login-button"]')
    
    // Check for ARIA live region with error
    const errorMessage = page.locator('[role="alert"], [aria-live="polite"], [aria-live="assertive"]')
    await expect(errorMessage).toBeVisible()
    
    const errorText = await errorMessage.textContent()
    expect(errorText).toBeTruthy()
  })

  test('page has proper heading structure', async ({ page }) => {
    const pages = ['/dashboard', '/orders', '/menu', '/reservations']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Check for h1
      const h1Elements = await page.locator('h1').count()
      expect(h1Elements).toBe(1)
      
      // Check heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
      const headingLevels = []
      
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase())
        const level = parseInt(tagName.replace('h', ''))
        headingLevels.push(level)
      }
      
      // Check that heading levels don't skip (e.g., h1 -> h3)
      for (let i = 1; i < headingLevels.length; i++) {
        const prevLevel = headingLevels[i - 1]
        const currentLevel = headingLevels[i]
        
        if (currentLevel > prevLevel) {
          expect(currentLevel - prevLevel).toBeLessThanOrEqual(1)
        }
      }
    }
  })

  test('interactive elements have visible focus indicators', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Find all interactive elements
    const interactiveElements = await page.locator(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).all()
    
    for (const element of interactiveElements.slice(0, 5)) { // Test first 5 to avoid timeout
      await element.focus()
      
      // Check that focused element has visible focus indicator
      const focusStyles = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el, ':focus')
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          outlineStyle: styles.outlineStyle,
          outlineColor: styles.outlineColor,
          boxShadow: styles.boxShadow,
        }
      })
      
      // Should have either outline or box-shadow for focus
      const hasFocusIndicator = 
        focusStyles.outline !== 'none' ||
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none'
      
      expect(hasFocusIndicator).toBeTruthy()
    }
  })

  test('dynamic content updates are announced', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Look for ARIA live regions
    const liveRegions = await page.locator('[aria-live], [role="status"], [role="alert"]').all()
    
    // Should have at least one live region for dynamic updates
    expect(liveRegions.length).toBeGreaterThan(0)
    
    // If there are real-time updates, they should be in live regions
    // This is a basic check - in practice you'd test actual dynamic updates
  })
})