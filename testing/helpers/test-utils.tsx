import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Custom render function that includes providers
interface AllTheProvidersProps {
  children: ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<any>
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const { wrapper = AllTheProviders, ...renderOptions } = options
  
  const result = render(ui, { wrapper, ...renderOptions })
  
  return {
    ...result,
    user: userEvent.setup(),
  }
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { userEvent }

// Custom matchers and utilities
export const getByTestId = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`)
  if (!element) {
    throw new Error(`Unable to find element with testId: ${testId}`)
  }
  return element
}

export const queryByTestId = (container: HTMLElement, testId: string) => {
  return container.querySelector(`[data-testid="${testId}"]`)
}

// Accessibility test helpers
export const axeMatchers = {
  toBeAccessible: async (received: HTMLElement) => {
    const axe = (await import('@axe-core/react')).default
    const results = await axe(received)
    
    if (results.violations.length === 0) {
      return {
        pass: true,
        message: () => 'Element is accessible',
      }
    }
    
    return {
      pass: false,
      message: () => {
        const violationMessages = results.violations
          .map(violation => `${violation.id}: ${violation.description}`)
          .join('\\n')
        return `Element has accessibility violations:\\n${violationMessages}`
      },
    }
  },
}

// Performance test helpers
export const measureRenderTime = (renderFn: () => void): number => {
  const start = performance.now()
  renderFn()
  const end = performance.now()
  return end - start
}

// Mock data generators
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin' as const,
}

export const mockMenuItem = {
  id: '1',
  name: 'Test Item',
  description: 'Test Description',
  price: 12.99,
  category: 'Appetizers',
  available: true,
}

export const mockOrder = {
  id: '1',
  items: [mockMenuItem],
  total: 12.99,
  status: 'pending' as const,
  createdAt: new Date(),
  customerId: '1',
}

export const mockReservation = {
  id: '1',
  guestName: 'John Doe',
  guestPhone: '+1234567890',
  guestEmail: 'john@example.com',
  partySize: 4,
  date: new Date(),
  time: '19:00',
  status: 'confirmed' as const,
  tableId: '1',
}

// Test data factories
export const createMockUser = (overrides = {}) => ({
  ...mockUser,
  ...overrides,
})

export const createMockMenuItem = (overrides = {}) => ({
  ...mockMenuItem,
  ...overrides,
})

export const createMockOrder = (overrides = {}) => ({
  ...mockOrder,
  ...overrides,
})

export const createMockReservation = (overrides = {}) => ({
  ...mockReservation,
  ...overrides,
})

// Wait utilities
export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export const waitForMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Form testing utilities
export const fillFormField = async (user: ReturnType<typeof userEvent.setup>, fieldName: string, value: string) => {
  const field = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement
  if (!field) {
    throw new Error(`Field with name "${fieldName}" not found`)
  }
  await user.clear(field)
  await user.type(field, value)
}

export const submitForm = async (user: ReturnType<typeof userEvent.setup>, formTestId: string) => {
  const form = document.querySelector(`[data-testid="${formTestId}"]`) as HTMLFormElement
  if (!form) {
    throw new Error(`Form with testId "${formTestId}" not found`)
  }
  const submitButton = form.querySelector('[type="submit"]') as HTMLButtonElement
  if (submitButton) {
    await user.click(submitButton)
  } else {
    // Fallback to form submission
    await user.click(form)
  }
}

// Component testing patterns
export const testComponentRendering = (Component: React.ComponentType, props = {}) => {
  it('renders without crashing', () => {
    expect(() => render(<Component {...props} />)).not.toThrow()
  })
}

export const testComponentAccessibility = async (Component: React.ComponentType, props = {}) => {
  it('meets accessibility standards', async () => {
    const { container } = render(<Component {...props} />)
    await expect(container).toBeAccessible()
  })
}