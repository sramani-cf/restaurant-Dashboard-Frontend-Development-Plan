import { renderHook, act } from '@testing-library/react'
import { useAccessibility } from '@/hooks/useAccessibility'

// Mock the accessibility utilities
jest.mock('@/lib/accessibility/keyboard', () => ({
  handleKeyboardNavigation: jest.fn(),
  trapFocus: jest.fn(),
  restoreFocus: jest.fn(),
}))

jest.mock('@/lib/accessibility/screen-reader', () => ({
  announceToScreenReader: jest.fn(),
  updateAriaLive: jest.fn(),
}))

jest.mock('@/lib/accessibility/aria', () => ({
  generateId: jest.fn(() => 'generated-id-123'),
  updateAriaAttributes: jest.fn(),
}))

import * as keyboard from '@/lib/accessibility/keyboard'
import * as screenReader from '@/lib/accessibility/screen-reader'
import * as aria from '@/lib/accessibility/aria'

describe('useAccessibility Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic functionality', () => {
    it('initializes with default values', () => {
      const { result } = renderHook(() => useAccessibility())
      
      expect(result.current.isScreenReaderActive).toBe(false)
      expect(result.current.isKeyboardNavigating).toBe(false)
      expect(result.current.focusTrapActive).toBe(false)
      expect(result.current.announcements).toEqual([])
    })

    it('provides accessibility utilities', () => {
      const { result } = renderHook(() => useAccessibility())
      
      expect(typeof result.current.announce).toBe('function')
      expect(typeof result.current.generateId).toBe('function')
      expect(typeof result.current.trapFocus).toBe('function')
      expect(typeof result.current.releaseFocus).toBe('function')
      expect(typeof result.current.setKeyboardNavigation).toBe('function')
    })
  })

  describe('Screen reader announcements', () => {
    it('makes announcements to screen readers', () => {
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.announce('Test announcement')
      })
      
      expect(screenReader.announceToScreenReader).toHaveBeenCalledWith('Test announcement')
      expect(result.current.announcements).toContain('Test announcement')
    })

    it('handles different announcement priorities', () => {
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.announce('Error message', 'assertive')
      })
      
      expect(screenReader.announceToScreenReader).toHaveBeenCalledWith('Error message', 'assertive')
    })

    it('clears announcements after timeout', async () => {
      jest.useFakeTimers()
      
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.announce('Temporary message')
      })
      
      expect(result.current.announcements).toContain('Temporary message')
      
      act(() => {
        jest.advanceTimersByTime(5000) // Default timeout
      })
      
      expect(result.current.announcements).not.toContain('Temporary message')
      
      jest.useRealTimers()
    })

    it('limits the number of stored announcements', () => {
      const { result } = renderHook(() => useAccessibility())
      
      // Add more than the limit (assume limit is 5)
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.announce(`Message ${i}`)
        }
      })
      
      expect(result.current.announcements.length).toBeLessThanOrEqual(5)
    })
  })

  describe('Focus management', () => {
    it('activates focus trap', () => {
      const mockElement = document.createElement('div')
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.trapFocus(mockElement)
      })
      
      expect(keyboard.trapFocus).toHaveBeenCalledWith(mockElement)
      expect(result.current.focusTrapActive).toBe(true)
    })

    it('releases focus trap', () => {
      const mockElement = document.createElement('div')
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.trapFocus(mockElement)
      })
      
      expect(result.current.focusTrapActive).toBe(true)
      
      act(() => {
        result.current.releaseFocus()
      })
      
      expect(keyboard.restoreFocus).toHaveBeenCalled()
      expect(result.current.focusTrapActive).toBe(false)
    })

    it('restores focus to previous element when trap is released', () => {
      const originalFocus = document.createElement('button')
      originalFocus.focus = jest.fn()
      document.body.appendChild(originalFocus)
      originalFocus.focus()
      
      const trapElement = document.createElement('div')
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.trapFocus(trapElement)
      })
      
      act(() => {
        result.current.releaseFocus()
      })
      
      expect(keyboard.restoreFocus).toHaveBeenCalled()
      
      document.body.removeChild(originalFocus)
    })
  })

  describe('Keyboard navigation', () => {
    it('enables keyboard navigation mode', () => {
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.setKeyboardNavigation(true)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(true)
    })

    it('disables keyboard navigation mode', () => {
      const { result } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.setKeyboardNavigation(true)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(true)
      
      act(() => {
        result.current.setKeyboardNavigation(false)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(false)
    })

    it('automatically detects keyboard navigation', () => {
      const { result } = renderHook(() => useAccessibility({
        autoDetectKeyboard: true,
      }))
      
      // Simulate Tab key press
      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'Tab' })
        document.dispatchEvent(event)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(true)
    })

    it('disables keyboard mode on mouse interaction', () => {
      const { result } = renderHook(() => useAccessibility({
        autoDetectKeyboard: true,
      }))
      
      // Enable keyboard mode first
      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'Tab' })
        document.dispatchEvent(event)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(true)
      
      // Simulate mouse interaction
      act(() => {
        const event = new MouseEvent('mousedown')
        document.dispatchEvent(event)
      })
      
      expect(result.current.isKeyboardNavigating).toBe(false)
    })
  })

  describe('ID generation', () => {
    it('generates unique IDs', () => {
      const { result } = renderHook(() => useAccessibility())
      
      const id1 = result.current.generateId()
      const id2 = result.current.generateId()
      
      expect(id1).toBeDefined()
      expect(id2).toBeDefined()
      expect(id1).not.toBe(id2)
      expect(aria.generateId).toHaveBeenCalledTimes(2)
    })

    it('generates IDs with custom prefix', () => {
      const { result } = renderHook(() => useAccessibility())
      
      const id = result.current.generateId('custom-prefix')
      
      expect(aria.generateId).toHaveBeenCalledWith('custom-prefix')
    })
  })

  describe('Screen reader detection', () => {
    it('detects screen reader usage', () => {
      // Mock screen reader detection
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (compatible; NVDA)',
      })
      
      const { result } = renderHook(() => useAccessibility({
        detectScreenReader: true,
      }))
      
      expect(result.current.isScreenReaderActive).toBe(true)
    })

    it('handles absence of screen reader', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      })
      
      const { result } = renderHook(() => useAccessibility({
        detectScreenReader: true,
      }))
      
      expect(result.current.isScreenReaderActive).toBe(false)
    })
  })

  describe('Custom options', () => {
    it('accepts custom configuration', () => {
      const customConfig = {
        autoDetectKeyboard: true,
        detectScreenReader: true,
        announcementTimeout: 3000,
        maxAnnouncements: 3,
      }
      
      const { result } = renderHook(() => useAccessibility(customConfig))
      
      // Verify configuration is applied
      expect(result.current).toBeDefined()
    })

    it('uses default values for missing options', () => {
      const { result } = renderHook(() => useAccessibility({}))
      
      expect(result.current.isScreenReaderActive).toBe(false)
      expect(result.current.isKeyboardNavigating).toBe(false)
    })
  })

  describe('Cleanup', () => {
    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
      
      const { unmount } = renderHook(() => useAccessibility({
        autoDetectKeyboard: true,
      }))
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalled()
      
      removeEventListenerSpy.mockRestore()
    })

    it('releases focus trap on unmount', () => {
      const mockElement = document.createElement('div')
      const { result, unmount } = renderHook(() => useAccessibility())
      
      act(() => {
        result.current.trapFocus(mockElement)
      })
      
      unmount()
      
      expect(keyboard.restoreFocus).toHaveBeenCalled()
    })
  })

  describe('Error handling', () => {
    it('handles errors in screen reader announcements gracefully', () => {
      ;(screenReader.announceToScreenReader as jest.Mock).mockImplementation(() => {
        throw new Error('Screen reader error')
      })
      
      const { result } = renderHook(() => useAccessibility())
      
      expect(() => {
        act(() => {
          result.current.announce('Test message')
        })
      }).not.toThrow()
    })

    it('handles focus trap errors gracefully', () => {
      ;(keyboard.trapFocus as jest.Mock).mockImplementation(() => {
        throw new Error('Focus trap error')
      })
      
      const mockElement = document.createElement('div')
      const { result } = renderHook(() => useAccessibility())
      
      expect(() => {
        act(() => {
          result.current.trapFocus(mockElement)
        })
      }).not.toThrow()
      
      expect(result.current.focusTrapActive).toBe(false)
    })
  })
})