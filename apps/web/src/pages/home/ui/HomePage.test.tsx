import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import { HomePage } from './HomePage'

function renderHome() {
  return render(
    <LanguageProvider dict={dictionary}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('HomePage', () => {
  beforeEach(() => localStorage.clear())

  it('renders the English hero by default', () => {
    renderHome()
    expect(screen.getByText(/Settle into Korea without the guesswork/i)).toBeInTheDocument()
  })

  it('switches the whole page to Korean via the toggle', async () => {
    renderHome()
    await userEvent.click(screen.getByRole('button', { name: /switch language|언어/i }))
    expect(screen.getByText(/한국 정착/)).toBeInTheDocument()
    // popular guides section header is translated too
    expect(screen.getByText('인기 가이드')).toBeInTheDocument()
  })

  it('shows three featured guide cards', () => {
    renderHome()
    // guide titles link to detail pages
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(3)
  })
})
