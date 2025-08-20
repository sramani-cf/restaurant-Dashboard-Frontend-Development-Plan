# Testing Guide for Restaurant Dashboard

This document provides comprehensive information about the testing strategy, setup, and execution for the Restaurant Dashboard application.

## Overview

Our testing strategy follows a multi-layered approach to ensure code quality, reliability, and user experience:

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test API routes and data layer interactions
- **End-to-End Tests**: Test complete user workflows across the application
- **Performance Tests**: Monitor and validate application performance
- **Accessibility Tests**: Ensure the application meets WCAG standards
- **Security Tests**: Validate security measures and vulnerability scanning

## Test Stack

### Core Testing Tools
- **Jest**: JavaScript testing framework for unit and integration tests
- **React Testing Library**: Testing utilities for React components
- **Playwright**: End-to-end testing framework
- **MSW (Mock Service Worker)**: API mocking for consistent testing
- **Axe**: Accessibility testing library

### Quality Assurance Tools
- **Lighthouse CI**: Performance and best practices auditing
- **CodeCov**: Code coverage reporting and analysis
- **ESLint**: Static code analysis and linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## Test Structure

```
__tests__/
├── components/          # Component unit tests
│   ├── ui/             # UI component tests
│   ├── dashboard/      # Dashboard component tests
│   ├── orders/         # Order management tests
│   └── ...
├── api/                # API integration tests
├── utils/              # Utility function tests
├── hooks/              # Custom hook tests
├── e2e/                # End-to-end tests
├── performance/        # Performance tests
└── accessibility/      # Accessibility tests

testing/
├── fixtures/           # Test data fixtures
├── mocks/              # Mock implementations
├── helpers/            # Test utilities and helpers
└── global-setup.ts     # Global test setup
```

## Running Tests

### Prerequisites

```bash
npm install
```

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run only UI component tests
npm run test:ui

# Run only integration tests
npm run test:integration
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI (interactive mode)
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug
```

### Performance Tests

```bash
# Run Lighthouse performance audit
npm run build && npm run start
lhci autorun

# Run custom performance tests
npm run test:performance
```

### Accessibility Tests

```bash
# Run accessibility audit
npm run accessibility:test

# Run accessibility tests during development
npm run accessibility:dev
```

### All Tests

```bash
# Run complete test suite (CI equivalent)
npm run test:all

# Run all tests for CI/CD
npm run test:ci
```

## Coverage Requirements

Our project maintains high code coverage standards:

- **Minimum Coverage**: 80% for lines, functions, branches, and statements
- **Target Coverage**: 90% overall coverage
- **New Code**: 85% minimum coverage for new features

### Coverage Reports

Coverage reports are generated in multiple formats:
- **HTML**: `coverage/lcov-report/index.html`
- **JSON**: `coverage/coverage-final.json`
- **LCOV**: `coverage/lcov.info`

View the HTML coverage report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Writing Tests

### Unit Test Example

```typescript
// __tests__/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Test Example

```typescript
// __tests__/api/menu.test.ts
import { GET, POST } from '@/app/api/menu/items/route'
import { NextRequest } from 'next/server'

describe('/api/menu/items', () => {
  it('returns menu items', async () => {
    const request = new NextRequest('http://localhost:3000/api/menu/items')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
```

### E2E Test Example

```typescript
// __tests__/e2e/orders.spec.ts
import { test, expect } from '@playwright/test'

test('create new order workflow', async ({ page }) => {
  await page.goto('/orders')
  await page.click('[data-testid="new-order-button"]')
  
  // Fill order details
  await page.fill('[data-testid="customer-name"]', 'John Doe')
  await page.click('[data-testid="menu-item-1"]')
  await page.click('[data-testid="add-to-order"]')
  
  // Submit order
  await page.click('[data-testid="submit-order"]')
  
  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## Test Data Management

### Fixtures

Test fixtures provide consistent, reusable test data:

```typescript
// testing/fixtures/menu-data.ts
export const mockMenuItems = [
  {
    id: '1',
    name: 'Caesar Salad',
    price: 12.99,
    category: 'Appetizers',
    available: true,
  },
  // ... more items
]
```

### Mocks

Use MSW for API mocking:

```typescript
// testing/mocks/api-handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/menu/items', () => {
    return HttpResponse.json(mockMenuItems)
  }),
]
```

## Continuous Integration

### GitHub Actions Workflow

Our CI pipeline runs comprehensive tests on every pull request:

1. **Code Quality**: ESLint, Prettier, TypeScript checks
2. **Security**: Dependency audit, vulnerability scanning
3. **Unit Tests**: Jest with coverage reporting
4. **Integration Tests**: API endpoint testing
5. **E2E Tests**: Playwright across multiple browsers
6. **Performance**: Lighthouse CI auditing
7. **Accessibility**: Axe compliance testing

### Quality Gates

All tests must pass before merging:
- ✅ All unit tests passing
- ✅ Code coverage ≥ 80%
- ✅ All E2E tests passing
- ✅ No accessibility violations
- ✅ Performance scores ≥ 70
- ✅ No security vulnerabilities

## Performance Testing

### Lighthouse Configuration

Performance benchmarks are configured in `lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
}
```

### Custom Performance Tests

Monitor key performance metrics:
- First Contentful Paint < 2s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Total Blocking Time < 300ms

## Accessibility Testing

### Automated Testing

We use axe-core for automated accessibility testing:

```typescript
import AxeBuilder from '@axe-core/playwright'

test('page is accessible', async ({ page }) => {
  await page.goto('/')
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  
  expect(accessibilityScanResults.violations).toEqual([])
})
```

### Manual Testing Checklist

- [ ] Keyboard navigation works throughout the application
- [ ] Screen reader announcements are appropriate
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible and appropriate
- [ ] Form labels are properly associated
- [ ] Error messages are announced to screen readers

## Debugging Tests

### Jest Debugging

```bash
# Debug specific test file
npm test -- --runInBand --no-cache ComponentName.test.tsx

# Debug with Chrome DevTools
node --inspect-brk node_modules/.bin/jest --runInBand ComponentName.test.tsx
```

### Playwright Debugging

```bash
# Run with headed browser
npm run test:e2e -- --headed

# Debug mode with step-through
npm run test:e2e:debug

# Run specific test
npx playwright test orders.spec.ts --debug
```

## Best Practices

### Test Organization
- Group related tests with `describe` blocks
- Use descriptive test names that explain the expected behavior
- Follow the Arrange-Act-Assert pattern
- Keep tests focused and independent

### Data Management
- Use fixtures for consistent test data
- Clean up after tests to prevent side effects
- Mock external dependencies and APIs
- Use `beforeEach` and `afterEach` for setup and cleanup

### Performance
- Avoid unnecessary re-renders in component tests
- Use `screen.getBy*` queries over `container.querySelector`
- Prefer user-centric queries over implementation details
- Mock expensive operations and API calls

### Maintenance
- Keep tests up-to-date with application changes
- Regularly review and refactor test code
- Remove obsolete tests and mocks
- Monitor test execution time and optimize slow tests

## Troubleshooting

### Common Issues

**Tests failing locally but passing in CI**
- Check Node.js and npm versions match CI environment
- Ensure all dependencies are installed (`npm ci`)
- Clear Jest cache (`npm test -- --clearCache`)

**E2E tests timing out**
- Increase timeout values in `playwright.config.ts`
- Check for proper wait conditions (`waitForSelector`, `waitForURL`)
- Verify test data setup is complete

**Coverage reports not generating**
- Ensure Jest is configured with coverage collection
- Check that source files are included in coverage paths
- Verify test files are properly excluded from coverage

**Mock Service Worker not intercepting requests**
- Check that MSW server is properly set up in test files
- Verify request URLs match mock handlers exactly
- Ensure MSW is started before tests run

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Guide](https://testing-library.com/docs/react-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

## Contributing

When adding new features:
1. Write tests before implementing the feature (TDD)
2. Ensure all existing tests continue to pass
3. Add both positive and negative test cases
4. Include accessibility and performance considerations
5. Update documentation as needed

For questions about testing, please refer to this guide or reach out to the development team.