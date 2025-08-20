import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '@/components/ui/modal'

describe('Modal Component', () => {
  it('renders when open is true', () => {
    render(
      <Modal open={true} onOpenChange={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )

    expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <div>Modal Content</div>
      </Modal>
    )

    const closeButton = screen.getByLabelText('Close')
    await user.click(closeButton)

    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls onOpenChange when overlay is clicked', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('modal-overlay')
    await user.click(overlay)

    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not call onOpenChange when modal content is clicked', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )

    const content = screen.getByTestId('modal-content')
    await user.click(content)

    expect(handleOpenChange).not.toHaveBeenCalled()
  })

  it('closes when Escape key is pressed', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <div>Modal Content</div>
      </Modal>
    )

    await user.keyboard('{Escape}')

    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('prevents closing when closeOnEscape is false', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange} closeOnEscape={false}>
        <div>Modal Content</div>
      </Modal>
    )

    await user.keyboard('{Escape}')

    expect(handleOpenChange).not.toHaveBeenCalled()
  })

  it('prevents closing when closeOnOverlayClick is false', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    render(
      <Modal open={true} onOpenChange={handleOpenChange} closeOnOverlayClick={false}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByTestId('modal-overlay')
    await user.click(overlay)

    expect(handleOpenChange).not.toHaveBeenCalled()
  })

  it('renders custom title and description', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        title="Custom Title"
        description="Custom Description"
      >
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Description')).toBeInTheDocument()
    
    // Check for proper heading level
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Custom Title')
  })

  it('applies custom className', () => {
    render(
      <Modal open={true} onOpenChange={() => {}} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('custom-modal')
  })

  it('supports different sizes', () => {
    const { rerender } = render(
      <Modal open={true} onOpenChange={() => {}} size="sm">
        <div>Small Modal</div>
      </Modal>
    )

    let dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-sm')

    rerender(
      <Modal open={true} onOpenChange={() => {}} size="lg">
        <div>Large Modal</div>
      </Modal>
    )

    dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-4xl')

    rerender(
      <Modal open={true} onOpenChange={() => {}} size="full">
        <div>Full Modal</div>
      </Modal>
    )

    dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-full')
  })

  it('traps focus within modal', async () => {
    const user = userEvent.setup()

    render(
      <Modal open={true} onOpenChange={() => {}}>
        <div>
          <input data-testid="first-input" placeholder="First input" />
          <button data-testid="button">Button</button>
          <input data-testid="last-input" placeholder="Last input" />
        </div>
      </Modal>
    )

    const firstInput = screen.getByTestId('first-input')
    const button = screen.getByTestId('button')
    const lastInput = screen.getByTestId('last-input')
    const closeButton = screen.getByLabelText('Close')

    // Focus should start on the first focusable element or close button
    await waitFor(() => {
      expect(document.activeElement).toBeInstanceOf(HTMLElement)
    })

    // Tab through elements
    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()

    // Should cycle back to first element
    await user.tab()
    expect(firstInput).toHaveFocus()
  })

  it('restores focus to trigger element when closed', async () => {
    const user = userEvent.setup()
    const handleOpenChange = jest.fn()

    const TestComponent = () => {
      const [open, setOpen] = React.useState(false)
      
      return (
        <div>
          <button onClick={() => setOpen(true)} data-testid="trigger">
            Open Modal
          </button>
          <Modal open={open} onOpenChange={setOpen}>
            <div>Modal Content</div>
          </Modal>
        </div>
      )
    }

    render(<TestComponent />)

    const trigger = screen.getByTestId('trigger')
    await user.click(trigger)

    // Modal should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close modal
    await user.keyboard('{Escape}')

    // Focus should return to trigger
    await waitFor(() => {
      expect(trigger).toHaveFocus()
    })
  })

  it('prevents body scroll when open', () => {
    render(
      <Modal open={true} onOpenChange={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    // Check that body has overflow hidden
    expect(document.body).toHaveStyle('overflow: hidden')
  })

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal open={true} onOpenChange={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    // Body should have overflow hidden
    expect(document.body).toHaveStyle('overflow: hidden')

    rerender(
      <Modal open={false} onOpenChange={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    // Body should have overflow restored
    expect(document.body).not.toHaveStyle('overflow: hidden')
  })

  it('meets accessibility standards', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        title="Accessible Modal"
        description="This modal follows accessibility best practices"
      >
        <div>
          <p>Modal content with proper labeling</p>
          <button>Action Button</button>
        </div>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    
    // Should have proper ARIA attributes
    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-describedby')
    
    // Should have modal attribute
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    
    // Close button should be accessible
    const closeButton = screen.getByLabelText('Close')
    expect(closeButton).toBeInTheDocument()
  })

  it('supports custom close button', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        showCloseButton={false}
        customCloseButton={<button data-testid="custom-close">Custom Close</button>}
      >
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
    expect(screen.getByTestId('custom-close')).toBeInTheDocument()
  })
})

// React import for useState
import React from 'react'