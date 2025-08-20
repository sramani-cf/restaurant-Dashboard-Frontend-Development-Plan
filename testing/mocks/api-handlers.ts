import { http, HttpResponse } from 'msw'
import { mockMenuItems, mockMenuCategories } from '../fixtures/menu-data'
import { mockOrders } from '../fixtures/order-data'
import { mockReservations, mockTables } from '../fixtures/reservation-data'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const apiHandlers = [
  // Auth endpoints
  http.post(`${baseUrl}/api/auth/login`, () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'admin@restaurant.com',
        name: 'Admin User',
        role: 'admin',
      },
      token: 'mock-jwt-token',
    })
  }),

  http.post(`${baseUrl}/api/auth/logout`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.get(`${baseUrl}/api/auth/me`, () => {
    return HttpResponse.json({
      id: '1',
      email: 'admin@restaurant.com',
      name: 'Admin User',
      role: 'admin',
    })
  }),

  // Menu endpoints
  http.get(`${baseUrl}/api/menu/items`, () => {
    return HttpResponse.json(mockMenuItems)
  }),

  http.get(`${baseUrl}/api/menu/items/:id`, ({ params }) => {
    const item = mockMenuItems.find(item => item.id === params.id)
    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(item)
  }),

  http.post(`${baseUrl}/api/menu/items`, async ({ request }) => {
    const newItem = await request.json() as any
    const item = {
      id: (mockMenuItems.length + 1).toString(),
      ...newItem,
    }
    return HttpResponse.json(item, { status: 201 })
  }),

  http.put(`${baseUrl}/api/menu/items/:id`, async ({ request, params }) => {
    const updates = await request.json() as any
    const existingItem = mockMenuItems.find(item => item.id === params.id)
    if (!existingItem) {
      return new HttpResponse(null, { status: 404 })
    }
    const updatedItem = { ...existingItem, ...updates }
    return HttpResponse.json(updatedItem)
  }),

  http.delete(`${baseUrl}/api/menu/items/:id`, ({ params }) => {
    const item = mockMenuItems.find(item => item.id === params.id)
    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ success: true })
  }),

  http.get(`${baseUrl}/api/menu/categories`, () => {
    return HttpResponse.json(mockMenuCategories)
  }),

  // Order endpoints
  http.get(`${baseUrl}/api/orders`, () => {
    return HttpResponse.json(mockOrders)
  }),

  http.get(`${baseUrl}/api/orders/:id`, ({ params }) => {
    const order = mockOrders.find(order => order.id === params.id)
    if (!order) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(order)
  }),

  http.post(`${baseUrl}/api/orders`, async ({ request }) => {
    const newOrder = await request.json() as any
    const order = {
      id: (mockOrders.length + 1).toString(),
      orderNumber: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...newOrder,
    }
    return HttpResponse.json(order, { status: 201 })
  }),

  http.put(`${baseUrl}/api/orders/:id`, async ({ request, params }) => {
    const updates = await request.json() as any
    const existingOrder = mockOrders.find(order => order.id === params.id)
    if (!existingOrder) {
      return new HttpResponse(null, { status: 404 })
    }
    const updatedOrder = { ...existingOrder, ...updates, updatedAt: new Date() }
    return HttpResponse.json(updatedOrder)
  }),

  http.delete(`${baseUrl}/api/orders/:id`, ({ params }) => {
    const order = mockOrders.find(order => order.id === params.id)
    if (!order) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ success: true })
  }),

  // Reservation endpoints
  http.get(`${baseUrl}/api/reservations`, ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    
    let filteredReservations = mockReservations
    if (date) {
      const filterDate = new Date(date)
      filteredReservations = mockReservations.filter(
        reservation => reservation.date.toDateString() === filterDate.toDateString()
      )
    }
    
    return HttpResponse.json(filteredReservations)
  }),

  http.get(`${baseUrl}/api/reservations/:id`, ({ params }) => {
    const reservation = mockReservations.find(res => res.id === params.id)
    if (!reservation) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(reservation)
  }),

  http.post(`${baseUrl}/api/reservations`, async ({ request }) => {
    const newReservation = await request.json() as any
    const reservation = {
      id: (mockReservations.length + 1).toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      source: 'online',
      ...newReservation,
    }
    return HttpResponse.json(reservation, { status: 201 })
  }),

  http.put(`${baseUrl}/api/reservations/:id`, async ({ request, params }) => {
    const updates = await request.json() as any
    const existingReservation = mockReservations.find(res => res.id === params.id)
    if (!existingReservation) {
      return new HttpResponse(null, { status: 404 })
    }
    const updatedReservation = { ...existingReservation, ...updates, updatedAt: new Date() }
    return HttpResponse.json(updatedReservation)
  }),

  http.delete(`${baseUrl}/api/reservations/:id`, ({ params }) => {
    const reservation = mockReservations.find(res => res.id === params.id)
    if (!reservation) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ success: true })
  }),

  // Table endpoints
  http.get(`${baseUrl}/api/tables`, () => {
    return HttpResponse.json(mockTables)
  }),

  http.put(`${baseUrl}/api/tables/:id`, async ({ request, params }) => {
    const updates = await request.json() as any
    const existingTable = mockTables.find(table => table.id === params.id)
    if (!existingTable) {
      return new HttpResponse(null, { status: 404 })
    }
    const updatedTable = { ...existingTable, ...updates }
    return HttpResponse.json(updatedTable)
  }),

  // Analytics endpoints
  http.get(`${baseUrl}/api/analytics/sales`, ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || 'day'
    
    return HttpResponse.json({
      totalSales: 1250.50,
      ordersCount: 45,
      averageOrderValue: 27.79,
      period,
      data: [
        { date: '2024-01-15', sales: 850.25, orders: 28 },
        { date: '2024-01-16', sales: 1100.75, orders: 38 },
        { date: '2024-01-17', sales: 950.00, orders: 32 },
      ],
    })
  }),

  http.get(`${baseUrl}/api/analytics/popular-items`, () => {
    return HttpResponse.json([
      { itemId: '2', name: 'Margherita Pizza', orderCount: 25 },
      { itemId: '1', name: 'Caesar Salad', orderCount: 18 },
      { itemId: '3', name: 'Grilled Salmon', orderCount: 15 },
    ])
  }),

  // Health check
  http.get(`${baseUrl}/api/health`, () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
  }),

  // Error simulation endpoints
  http.get(`${baseUrl}/api/test/error`, () => {
    return new HttpResponse(null, { status: 500 })
  }),

  http.get(`${baseUrl}/api/test/timeout`, () => {
    return new Promise(() => {}) // Never resolves to simulate timeout
  }),

  // Catch-all for unhandled requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`)
    return new HttpResponse(null, { status: 404 })
  }),
]