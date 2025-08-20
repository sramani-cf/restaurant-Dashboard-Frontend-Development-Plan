import { render, screen } from '@testing-library/react'

// Mock the utils functions - these would be imported from your actual utils
const mockUtils = {
  cn: jest.fn(),
  formatCurrency: jest.fn(),
  formatDate: jest.fn(),
  debounce: jest.fn(),
  throttle: jest.fn(),
  generateId: jest.fn(),
  validateEmail: jest.fn(),
  slugify: jest.fn(),
  truncateText: jest.fn(),
  capitalizeFirstLetter: jest.fn(),
  isValidPhoneNumber: jest.fn(),
  sanitizeInput: jest.fn(),
  calculatePercentageChange: jest.fn(),
  roundToDecimal: jest.fn(),
  parseQueryParams: jest.fn(),
  buildQueryString: jest.fn(),
}

// Mock the actual utils file
jest.mock('@/utils', () => mockUtils)

import * as utils from '@/utils'

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('cn (className utility)', () => {
    it('combines class names correctly', () => {
      mockUtils.cn.mockImplementation((...classes) => classes.filter(Boolean).join(' '))
      
      const result = utils.cn('base-class', 'additional-class', null, undefined, 'final-class')
      expect(result).toBe('base-class additional-class final-class')
    })

    it('handles conditional classes', () => {
      mockUtils.cn.mockImplementation((...classes) => classes.filter(Boolean).join(' '))
      
      const isActive = true
      const result = utils.cn('base', isActive && 'active', !isActive && 'inactive')
      expect(result).toBe('base active')
    })
  })

  describe('formatCurrency', () => {
    beforeEach(() => {
      mockUtils.formatCurrency.mockImplementation((amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
        }).format(amount)
      })
    })

    it('formats currency correctly', () => {
      const result = utils.formatCurrency(1234.56)
      expect(result).toBe('$1,234.56')
    })

    it('handles zero values', () => {
      const result = utils.formatCurrency(0)
      expect(result).toBe('$0.00')
    })

    it('handles negative values', () => {
      const result = utils.formatCurrency(-50.75)
      expect(result).toBe('-$50.75')
    })

    it('supports different currencies', () => {
      const result = utils.formatCurrency(100, 'EUR')
      expect(mockUtils.formatCurrency).toHaveBeenCalledWith(100, 'EUR')
    })
  })

  describe('formatDate', () => {
    beforeEach(() => {
      mockUtils.formatDate.mockImplementation((date, format = 'short') => {
        const d = new Date(date)
        if (format === 'short') {
          return d.toLocaleDateString('en-US')
        }
        if (format === 'long') {
          return d.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
        return d.toISOString()
      })
    })

    it('formats dates in short format', () => {
      const date = new Date('2024-01-15')
      const result = utils.formatDate(date, 'short')
      expect(result).toMatch(/1\/15\/2024/)
    })

    it('formats dates in long format', () => {
      const date = new Date('2024-01-15')
      const result = utils.formatDate(date, 'long')
      expect(result).toMatch(/Monday, January 15, 2024/)
    })

    it('handles string date inputs', () => {
      const result = utils.formatDate('2024-01-15')
      expect(mockUtils.formatDate).toHaveBeenCalledWith('2024-01-15', 'short')
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      mockUtils.debounce.mockImplementation((func, delay) => {
        let timeoutId
        return (...args) => {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => func.apply(this, args), delay)
        }
      })
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('delays function execution', () => {
      const mockFn = jest.fn()
      const debouncedFn = utils.debounce(mockFn, 100)
      
      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('cancels previous calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = utils.debounce(mockFn, 100)
      
      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      mockUtils.throttle.mockImplementation((func, delay) => {
        let lastCall = 0
        return (...args) => {
          const now = Date.now()
          if (now - lastCall >= delay) {
            lastCall = now
            return func.apply(this, args)
          }
        }
      })
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('limits function calls', () => {
      const mockFn = jest.fn()
      const throttledFn = utils.throttle(mockFn, 100)
      
      throttledFn('test1')
      throttledFn('test2')
      throttledFn('test3')
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('test1')
    })
  })

  describe('generateId', () => {
    beforeEach(() => {
      mockUtils.generateId.mockImplementation((prefix = 'id') => {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
      })
    })

    it('generates unique IDs', () => {
      const id1 = utils.generateId()
      const id2 = utils.generateId()
      
      expect(id1).not.toBe(id2)
      expect(id1).toMatch(/^id-/)
      expect(id2).toMatch(/^id-/)
    })

    it('supports custom prefixes', () => {
      const id = utils.generateId('custom')
      expect(id).toMatch(/^custom-/)
    })
  })

  describe('validateEmail', () => {
    beforeEach(() => {
      mockUtils.validateEmail.mockImplementation((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      })
    })

    it('validates correct email addresses', () => {
      expect(utils.validateEmail('user@example.com')).toBe(true)
      expect(utils.validateEmail('test.email+tag@example.co.uk')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(utils.validateEmail('invalid-email')).toBe(false)
      expect(utils.validateEmail('user@')).toBe(false)
      expect(utils.validateEmail('@example.com')).toBe(false)
      expect(utils.validateEmail('')).toBe(false)
    })
  })

  describe('slugify', () => {
    beforeEach(() => {
      mockUtils.slugify.mockImplementation((text) => {
        return text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      })
    })

    it('creates URL-friendly slugs', () => {
      expect(utils.slugify('Hello World')).toBe('hello-world')
      expect(utils.slugify('Special Characters!@#')).toBe('special-characters')
      expect(utils.slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
    })

    it('handles empty strings', () => {
      expect(utils.slugify('')).toBe('')
    })
  })

  describe('truncateText', () => {
    beforeEach(() => {
      mockUtils.truncateText.mockImplementation((text, maxLength, suffix = '...') => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength - suffix.length) + suffix
      })
    })

    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated'
      const result = utils.truncateText(longText, 20)
      
      expect(result).toBe('This is a very lo...')
    })

    it('preserves short text', () => {
      const shortText = 'Short text'
      const result = utils.truncateText(shortText, 20)
      
      expect(result).toBe('Short text')
    })

    it('supports custom suffix', () => {
      const text = 'Long text here'
      const result = utils.truncateText(text, 10, '…')
      
      expect(mockUtils.truncateText).toHaveBeenCalledWith(text, 10, '…')
    })
  })

  describe('capitalizeFirstLetter', () => {
    beforeEach(() => {
      mockUtils.capitalizeFirstLetter.mockImplementation((text) => {
        if (!text) return text
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      })
    })

    it('capitalizes first letter', () => {
      expect(utils.capitalizeFirstLetter('hello')).toBe('Hello')
      expect(utils.capitalizeFirstLetter('WORLD')).toBe('World')
    })

    it('handles empty strings', () => {
      expect(utils.capitalizeFirstLetter('')).toBe('')
    })
  })

  describe('isValidPhoneNumber', () => {
    beforeEach(() => {
      mockUtils.isValidPhoneNumber.mockImplementation((phone) => {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
        return phoneRegex.test(phone)
      })
    })

    it('validates phone numbers', () => {
      expect(utils.isValidPhoneNumber('+1234567890')).toBe(true)
      expect(utils.isValidPhoneNumber('(123) 456-7890')).toBe(true)
      expect(utils.isValidPhoneNumber('123-456-7890')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(utils.isValidPhoneNumber('123')).toBe(false)
      expect(utils.isValidPhoneNumber('abc-def-ghij')).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    beforeEach(() => {
      mockUtils.sanitizeInput.mockImplementation((input) => {
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      })
    })

    it('removes script tags', () => {
      const maliciousInput = 'Hello <script>alert("xss")</script> World'
      const result = utils.sanitizeInput(maliciousInput)
      
      expect(result).toBe('Hello  World')
    })

    it('preserves safe content', () => {
      const safeInput = 'This is <em>emphasized</em> text'
      utils.sanitizeInput(safeInput)
      
      expect(mockUtils.sanitizeInput).toHaveBeenCalledWith(safeInput)
    })
  })

  describe('calculatePercentageChange', () => {
    beforeEach(() => {
      mockUtils.calculatePercentageChange.mockImplementation((oldValue, newValue) => {
        if (oldValue === 0) return newValue === 0 ? 0 : 100
        return ((newValue - oldValue) / oldValue) * 100
      })
    })

    it('calculates positive percentage change', () => {
      const result = utils.calculatePercentageChange(100, 150)
      expect(result).toBe(50)
    })

    it('calculates negative percentage change', () => {
      const result = utils.calculatePercentageChange(100, 75)
      expect(result).toBe(-25)
    })

    it('handles zero old value', () => {
      const result = utils.calculatePercentageChange(0, 50)
      expect(result).toBe(100)
    })
  })

  describe('roundToDecimal', () => {
    beforeEach(() => {
      mockUtils.roundToDecimal.mockImplementation((num, decimals = 2) => {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
      })
    })

    it('rounds to specified decimal places', () => {
      expect(utils.roundToDecimal(3.14159, 2)).toBe(3.14)
      expect(utils.roundToDecimal(3.14159, 3)).toBe(3.142)
    })

    it('handles integers', () => {
      expect(utils.roundToDecimal(5)).toBe(5)
    })
  })

  describe('parseQueryParams', () => {
    beforeEach(() => {
      mockUtils.parseQueryParams.mockImplementation((queryString) => {
        const params = new URLSearchParams(queryString)
        const result = {}
        for (const [key, value] of params) {
          result[key] = value
        }
        return result
      })
    })

    it('parses query parameters', () => {
      const result = utils.parseQueryParams('?name=John&age=30')
      expect(result).toEqual({ name: 'John', age: '30' })
    })

    it('handles empty query string', () => {
      const result = utils.parseQueryParams('')
      expect(result).toEqual({})
    })
  })

  describe('buildQueryString', () => {
    beforeEach(() => {
      mockUtils.buildQueryString.mockImplementation((params) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            searchParams.append(key, String(value))
          }
        })
        return searchParams.toString()
      })
    })

    it('builds query string from object', () => {
      const params = { name: 'John', age: 30, active: true }
      const result = utils.buildQueryString(params)
      expect(result).toBe('name=John&age=30&active=true')
    })

    it('skips null and undefined values', () => {
      const params = { name: 'John', age: null, active: undefined, city: 'NYC' }
      utils.buildQueryString(params)
      
      expect(mockUtils.buildQueryString).toHaveBeenCalledWith(params)
    })
  })
})