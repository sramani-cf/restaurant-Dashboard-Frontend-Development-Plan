import { render, screen } from '@testing-library/react'
import { KPICards } from '@/components/dashboard/kpi-cards'

// Mock the data
const mockKPIData = {
  todayRevenue: 2450.75,
  todayOrders: 38,
  avgOrderValue: 64.49,
  tableOccupancy: 85,
  yesterdayRevenue: 2200.50,
  yesterdayOrders: 35,
  yesterdayAvgOrderValue: 62.87,
  yesterdayTableOccupancy: 78,
}

describe('KPICards Component', () => {
  it('renders all KPI cards', () => {
    render(<KPICards data={mockKPIData} />)

    expect(screen.getByText('Today\'s Revenue')).toBeInTheDocument()
    expect(screen.getByText('Orders Today')).toBeInTheDocument()
    expect(screen.getByText('Avg Order Value')).toBeInTheDocument()
    expect(screen.getByText('Table Occupancy')).toBeInTheDocument()
  })

  it('displays revenue with proper formatting', () => {
    render(<KPICards data={mockKPIData} />)
    
    expect(screen.getByText('$2,450.75')).toBeInTheDocument()
  })

  it('calculates and displays percentage changes correctly', () => {
    render(<KPICards data={mockKPIData} />)
    
    // Revenue change: (2450.75 - 2200.50) / 2200.50 * 100 ≈ 11.4%
    expect(screen.getByText('+11.4%')).toBeInTheDocument()
    
    // Orders change: (38 - 35) / 35 * 100 ≈ 8.6%
    expect(screen.getByText('+8.6%')).toBeInTheDocument()
    
    // Avg order value change: (64.49 - 62.87) / 62.87 * 100 ≈ 2.6%
    expect(screen.getByText('+2.6%')).toBeInTheDocument()
    
    // Table occupancy change: (85 - 78) / 78 * 100 ≈ 9.0%
    expect(screen.getByText('+9.0%')).toBeInTheDocument()
  })

  it('shows positive trend indicators for increases', () => {
    render(<KPICards data={mockKPIData} />)
    
    const trendUpIcons = screen.getAllByTestId('trend-up-icon')
    expect(trendUpIcons).toHaveLength(4) // All metrics show positive trends
  })

  it('shows negative trend indicators for decreases', () => {
    const negativeData = {
      todayRevenue: 2000.00,
      todayOrders: 30,
      avgOrderValue: 60.00,
      tableOccupancy: 70,
      yesterdayRevenue: 2450.75,
      yesterdayOrders: 38,
      yesterdayAvgOrderValue: 64.49,
      yesterdayTableOccupancy: 85,
    }

    render(<KPICards data={negativeData} />)
    
    const trendDownIcons = screen.getAllByTestId('trend-down-icon')
    expect(trendDownIcons).toHaveLength(4) // All metrics show negative trends
  })

  it('handles zero values gracefully', () => {
    const zeroData = {
      todayRevenue: 0,
      todayOrders: 0,
      avgOrderValue: 0,
      tableOccupancy: 0,
      yesterdayRevenue: 100,
      yesterdayOrders: 5,
      yesterdayAvgOrderValue: 20,
      yesterdayTableOccupancy: 50,
    }

    render(<KPICards data={zeroData} />)
    
    expect(screen.getByText('$0.00')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('handles division by zero in percentage calculations', () => {
    const zeroDivisionData = {
      todayRevenue: 100,
      todayOrders: 5,
      avgOrderValue: 20,
      tableOccupancy: 50,
      yesterdayRevenue: 0,
      yesterdayOrders: 0,
      yesterdayAvgOrderValue: 0,
      yesterdayTableOccupancy: 0,
    }

    render(<KPICards data={zeroDivisionData} />)
    
    // Should show some indication when previous value is 0
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies correct styling for positive trends', () => {
    render(<KPICards data={mockKPIData} />)
    
    const positiveChanges = screen.getAllByText(/^\+\d+\.\d+%$/)
    positiveChanges.forEach(element => {
      expect(element).toHaveClass('text-green-600')
    })
  })

  it('applies correct styling for negative trends', () => {
    const negativeData = {
      todayRevenue: 2000.00,
      todayOrders: 30,
      avgOrderValue: 60.00,
      tableOccupancy: 70,
      yesterdayRevenue: 2450.75,
      yesterdayOrders: 38,
      yesterdayAvgOrderValue: 64.49,
      yesterdayTableOccupancy: 85,
    }

    render(<KPICards data={negativeData} />)
    
    const negativeChanges = screen.getAllByText(/^-\d+\.\d+%$/)
    negativeChanges.forEach(element => {
      expect(element).toHaveClass('text-red-600')
    })
  })

  it('displays table occupancy as percentage', () => {
    render(<KPICards data={mockKPIData} />)
    
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  it('formats large numbers correctly', () => {
    const largeNumberData = {
      todayRevenue: 12500.99,
      todayOrders: 150,
      avgOrderValue: 83.34,
      tableOccupancy: 95,
      yesterdayRevenue: 11000.00,
      yesterdayOrders: 140,
      yesterdayAvgOrderValue: 78.57,
      yesterdayTableOccupancy: 90,
    }

    render(<KPICards data={largeNumberData} />)
    
    expect(screen.getByText('$12,500.99')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('$83.34')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
  })

  it('is accessible with proper ARIA labels', () => {
    render(<KPICards data={mockKPIData} />)
    
    // Check for accessible card structure
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(4)
    
    // Check for accessible headings
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(4)
    
    // Each card should have descriptive content
    expect(screen.getByLabelText('Today\'s revenue compared to yesterday')).toBeInTheDocument()
    expect(screen.getByLabelText('Today\'s orders compared to yesterday')).toBeInTheDocument()
  })

  it('handles loading state', () => {
    render(<KPICards data={null} loading={true} />)
    
    const skeletons = screen.getAllByTestId('kpi-skeleton')
    expect(skeletons).toHaveLength(4)
  })

  it('handles error state', () => {
    render(<KPICards data={null} error="Failed to load KPI data" />)
    
    expect(screen.getByText('Error loading KPI data')).toBeInTheDocument()
    expect(screen.getByText('Failed to load KPI data')).toBeInTheDocument()
  })

  it('refreshes data when refresh button is clicked', async () => {
    const mockRefresh = jest.fn()
    
    render(<KPICards data={mockKPIData} onRefresh={mockRefresh} />)
    
    const refreshButton = screen.getByLabelText('Refresh KPI data')
    await userEvent.click(refreshButton)
    
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('updates in real-time when data changes', () => {
    const { rerender } = render(<KPICards data={mockKPIData} />)
    
    expect(screen.getByText('$2,450.75')).toBeInTheDocument()
    
    const updatedData = {
      ...mockKPIData,
      todayRevenue: 2600.00,
    }
    
    rerender(<KPICards data={updatedData} />)
    
    expect(screen.getByText('$2,600.00')).toBeInTheDocument()
  })
})

import userEvent from '@testing-library/user-event'