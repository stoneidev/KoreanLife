import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { essentialApps } from '@/entities/essential-app'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import { AppsPage } from './AppsPage'

function renderApps() {
  return render(
    <LanguageProvider dict={dictionary}>
      <MemoryRouter>
        <AppsPage />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('AppsPage', () => {
  beforeEach(() => localStorage.clear())

  it('renders every curated app as an external link', () => {
    renderApps()
    const links = screen.getAllByRole('link')
    // one link per app
    expect(links.length).toBe(essentialApps.length)
    // links open the app site in a new, safe tab
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//)
    }
    expect(links.some((l) => l.getAttribute('href')?.includes('kakaocorp'))).toBe(true)
  })

  it('renders the English title by default', () => {
    renderApps()
    expect(screen.getByText('Apps to install first')).toBeInTheDocument()
  })

  it('renders in Korean when that language is persisted', () => {
    localStorage.setItem('koreanlife.lang', 'ko')
    renderApps()
    expect(screen.getByText('가장 먼저 설치할 앱')).toBeInTheDocument()
  })

  it('shows the must-have badge on flagged apps', () => {
    renderApps()
    expect(screen.getAllByText(/Must-have/i).length).toBeGreaterThan(0)
  })
})
