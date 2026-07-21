import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon, iconNames } from './Icon'

describe('Icon', () => {
  it('renders an svg for a known name', () => {
    const { container } = render(<Icon name="home" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('is decorative (aria-hidden) by default', () => {
    const { container } = render(<Icon name="shield" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('exposes an accessible label when given one', () => {
    const { getByRole } = render(<Icon name="globe" label="Language" />)
    const svg = getByRole('img', { name: 'Language' })
    expect(svg).toBeInTheDocument()
    expect(svg).not.toHaveAttribute('aria-hidden')
  })

  it('applies the requested pixel size to width and height', () => {
    const { container } = render(<Icon name="chat" size={32} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.getAttribute('height')).toBe('32')
  })

  it('forwards a className', () => {
    const { container } = render(<Icon name="check" className="nav-icon" />)
    expect(container.querySelector('svg')).toHaveClass('nav-icon')
  })

  it('every registered name renders without throwing', () => {
    for (const name of iconNames) {
      const { container } = render(<Icon name={name} />)
      expect(container.querySelector('svg')).toBeTruthy()
    }
  })
})
