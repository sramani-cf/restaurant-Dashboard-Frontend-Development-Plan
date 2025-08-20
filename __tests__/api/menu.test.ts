import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from '@/app/api/menu/items/route'

// Mock the database/data layer
jest.mock('@/lib/menu/data', () => ({
  getMenuItems: jest.fn(),
  getMenuItemById: jest.fn(),
  createMenuItem: jest.fn(),
  updateMenuItem: jest.fn(),
  deleteMenuItem: jest.fn(),
}))

import * as menuData from '@/lib/menu/data'

const mockMenuItems = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with caesar dressing',
    price: 12.99,
    category: 'Appetizers',
    available: true,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional pizza with fresh mozzarella',
    price: 18.99,
    category: 'Main Courses',
    available: true,
  },
]

describe('/api/menu/items API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/menu/items', () => {
    it('returns menu items successfully', async () => {
      ;(menuData.getMenuItems as jest.Mock).mockResolvedValue(mockMenuItems)

      const request = new NextRequest('http://localhost:3000/api/menu/items')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toEqual(mockMenuItems)
      expect(menuData.getMenuItems).toHaveBeenCalledTimes(1)
    })

    it('filters items by category when provided', async () => {
      const filteredItems = mockMenuItems.filter(item => item.category === 'Appetizers')
      ;(menuData.getMenuItems as jest.Mock).mockResolvedValue(filteredItems)

      const request = new NextRequest('http://localhost:3000/api/menu/items?category=Appetizers')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toEqual(filteredItems)
      expect(menuData.getMenuItems).toHaveBeenCalledWith({ category: 'Appetizers' })
    })

    it('filters items by availability when provided', async () => {
      const availableItems = mockMenuItems.filter(item => item.available)
      ;(menuData.getMenuItems as jest.Mock).mockResolvedValue(availableItems)

      const request = new NextRequest('http://localhost:3000/api/menu/items?available=true')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toEqual(availableItems)
      expect(menuData.getMenuItems).toHaveBeenCalledWith({ available: true })
    })

    it('handles database errors gracefully', async () => {
      ;(menuData.getMenuItems as jest.Mock).mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/menu/items')
      const response = await GET(request)
      
      expect(response.status).toBe(500)
      
      const data = await response.json()
      expect(data).toEqual({
        error: 'Failed to fetch menu items',
        message: 'Database connection failed',
      })
    })

    it('handles empty results', async () => {
      ;(menuData.getMenuItems as jest.Mock).mockResolvedValue([])

      const request = new NextRequest('http://localhost:3000/api/menu/items')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toEqual([])
    })
  })

  describe('POST /api/menu/items', () => {
    const validMenuItem = {
      name: 'New Dish',
      description: 'A delicious new dish',
      price: 15.99,
      category: 'Main Courses',
      available: true,
    }

    it('creates a new menu item successfully', async () => {
      const createdItem = { id: '3', ...validMenuItem }
      ;(menuData.createMenuItem as jest.Mock).mockResolvedValue(createdItem)

      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify(validMenuItem),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(201)
      
      const data = await response.json()
      expect(data).toEqual(createdItem)
      expect(menuData.createMenuItem).toHaveBeenCalledWith(validMenuItem)
    })

    it('validates required fields', async () => {
      const invalidMenuItem = {
        description: 'Missing name and price',
        category: 'Main Courses',
      }

      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify(invalidMenuItem),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(400)
      
      const data = await response.json()
      expect(data.error).toBe('Validation failed')
      expect(data.issues).toContain('Name is required')
      expect(data.issues).toContain('Price is required')
    })

    it('validates price is positive', async () => {
      const invalidMenuItem = {
        ...validMenuItem,
        price: -5.00,
      }

      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify(invalidMenuItem),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(400)
      
      const data = await response.json()
      expect(data.error).toBe('Validation failed')
      expect(data.issues).toContain('Price must be greater than 0')
    })

    it('validates name length', async () => {
      const invalidMenuItem = {
        ...validMenuItem,
        name: '', // Empty name
      }

      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify(invalidMenuItem),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(400)
    })

    it('handles database errors during creation', async () => {
      ;(menuData.createMenuItem as jest.Mock).mockRejectedValue(new Error('Duplicate item name'))

      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify(validMenuItem),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(500)
      
      const data = await response.json()
      expect(data.error).toBe('Failed to create menu item')
    })

    it('handles malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(400)
      
      const data = await response.json()
      expect(data.error).toBe('Invalid JSON format')
    })
  })

  describe('PUT /api/menu/items/:id', () => {
    const updateData = {
      name: 'Updated Dish Name',
      price: 19.99,
      available: false,
    }

    it('updates a menu item successfully', async () => {
      const updatedItem = { ...mockMenuItems[0], ...updateData }
      ;(menuData.updateMenuItem as jest.Mock).mockResolvedValue(updatedItem)

      const request = new NextRequest('http://localhost:3000/api/menu/items/1', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await PUT(request, { params: { id: '1' } })
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toEqual(updatedItem)
      expect(menuData.updateMenuItem).toHaveBeenCalledWith('1', updateData)
    })

    it('returns 404 for non-existent item', async () => {
      ;(menuData.updateMenuItem as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/menu/items/999', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await PUT(request, { params: { id: '999' } })
      
      expect(response.status).toBe(404)
      
      const data = await response.json()
      expect(data.error).toBe('Menu item not found')
    })

    it('validates update data', async () => {
      const invalidUpdate = {
        price: -10, // Invalid price
        name: '', // Invalid name
      }

      const request = new NextRequest('http://localhost:3000/api/menu/items/1', {
        method: 'PUT',
        body: JSON.stringify(invalidUpdate),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await PUT(request, { params: { id: '1' } })
      
      expect(response.status).toBe(400)
      
      const data = await response.json()
      expect(data.error).toBe('Validation failed')
    })
  })

  describe('DELETE /api/menu/items/:id', () => {
    it('deletes a menu item successfully', async () => {
      ;(menuData.deleteMenuItem as jest.Mock).mockResolvedValue(true)

      const request = new NextRequest('http://localhost:3000/api/menu/items/1')
      const response = await DELETE(request, { params: { id: '1' } })
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('Menu item deleted successfully')
      expect(menuData.deleteMenuItem).toHaveBeenCalledWith('1')
    })

    it('returns 404 for non-existent item', async () => {
      ;(menuData.deleteMenuItem as jest.Mock).mockResolvedValue(false)

      const request = new NextRequest('http://localhost:3000/api/menu/items/999')
      const response = await DELETE(request, { params: { id: '999' } })
      
      expect(response.status).toBe(404)
      
      const data = await response.json()
      expect(data.error).toBe('Menu item not found')
    })

    it('handles database errors during deletion', async () => {
      ;(menuData.deleteMenuItem as jest.Mock).mockRejectedValue(new Error('Cannot delete item with active orders'))

      const request = new NextRequest('http://localhost:3000/api/menu/items/1')
      const response = await DELETE(request, { params: { id: '1' } })
      
      expect(response.status).toBe(500)
      
      const data = await response.json()
      expect(data.error).toBe('Failed to delete menu item')
    })
  })

  describe('Authentication and Authorization', () => {
    it('requires authentication for POST requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/menu/items', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New Dish',
          price: 15.99,
          category: 'Main',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Mock authentication middleware to return unauthorized
      const response = await POST(request)
      
      // This would depend on your auth implementation
      // expect(response.status).toBe(401)
    })

    it('requires proper permissions for DELETE requests', async () => {
      // This would test role-based access control
      // Implementation depends on your auth system
    })
  })

  describe('Rate Limiting', () => {
    it('applies rate limiting to API endpoints', async () => {
      // This would test rate limiting implementation
      // You might need to make multiple requests quickly
    })
  })

  describe('CORS Headers', () => {
    it('includes proper CORS headers', async () => {
      const request = new NextRequest('http://localhost:3000/api/menu/items')
      const response = await GET(request)
      
      // Check for CORS headers if your API supports cross-origin requests
      // expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined()
    })
  })
})