import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default styling', () => {
      render(<Card data-testid="card">Card content</Card>)
      const card = screen.getByTestId('card')
      
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass(
        'rounded-xl',
        'border',
        'bg-card',
        'text-card-foreground',
        'shadow'
      )
    })

    it('accepts custom className', () => {
      render(<Card className="custom-class">Content</Card>)
      const card = screen.getByText('Content')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards additional props', () => {
      render(
        <Card data-testid="card" role="region" aria-label="Custom card">
          Content
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'region')
      expect(card).toHaveAttribute('aria-label', 'Custom card')
    })
  })

  describe('CardHeader', () => {
    it('renders with proper styling', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>)
      const header = screen.getByTestId('header')
      
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('can contain title and description', () => {
      render(
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      )
      
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })
  })

  describe('CardContent', () => {
    it('renders with proper styling', () => {
      render(<CardContent data-testid="content">Content here</CardContent>)
      const content = screen.getByTestId('content')
      
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('accepts custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>)
      const content = screen.getByText('Content')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('renders with proper styling', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>)
      const footer = screen.getByTestId('footer')
      
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('handles alignment classes', () => {
      render(<CardFooter className="justify-between">Footer</CardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer).toHaveClass('justify-between')
    })
  })

  describe('CardTitle', () => {
    it('renders with proper heading styling', () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>)
      const title = screen.getByTestId('title')
      
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('font-semibold', 'leading-none', 'tracking-tight')
    })

    it('renders as h3 by default', () => {
      render(<CardTitle>Default Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Default Title')
    })

    it('can render as different heading levels', () => {
      const { rerender } = render(<CardTitle as="h1">H1 Title</CardTitle>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

      rerender(<CardTitle as="h2">H2 Title</CardTitle>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })

  describe('CardDescription', () => {
    it('renders with proper styling', () => {
      render(<CardDescription data-testid="desc">Description text</CardDescription>)
      const desc = screen.getByTestId('desc')
      
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('renders as paragraph by default', () => {
      render(<CardDescription>Test description</CardDescription>)
      const desc = screen.getByText('Test description')
      expect(desc.tagName).toBe('P')
    })
  })

  describe('Complete Card Example', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Restaurant Dashboard</CardTitle>
            <CardDescription>
              Manage your restaurant operations efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the main content area of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      )

      const card = screen.getByTestId('complete-card')
      expect(card).toBeInTheDocument()

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Restaurant Dashboard')
      expect(screen.getByText('Manage your restaurant operations efficiently')).toBeInTheDocument()
      expect(screen.getByText('This is the main content area of the card.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
    })

    it('maintains proper structure and accessibility', () => {
      render(
        <Card role="article" aria-labelledby="card-title">
          <CardHeader>
            <CardTitle id="card-title">Accessible Card</CardTitle>
            <CardDescription>This card follows accessibility best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content that is properly associated with the title</p>
          </CardContent>
        </Card>
      )

      const card = screen.getByRole('article')
      expect(card).toHaveAttribute('aria-labelledby', 'card-title')
      
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveAttribute('id', 'card-title')
    })
  })

  describe('Responsive Design', () => {
    it('handles responsive padding classes', () => {
      render(
        <Card>
          <CardHeader className="sm:p-8">
            <CardTitle>Responsive Header</CardTitle>
          </CardHeader>
          <CardContent className="sm:p-8 sm:pt-0">
            <p>Responsive content</p>
          </CardContent>
        </Card>
      )

      const header = screen.getByText('Responsive Header').parentElement
      const content = screen.getByText('Responsive content').parentElement

      expect(header).toHaveClass('sm:p-8')
      expect(content).toHaveClass('sm:p-8', 'sm:pt-0')
    })
  })
})