import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider } from '@/shared/i18n'
import type { Dictionary } from '@/shared/i18n'
import { Topbar } from './Topbar'

const dict: Dictionary = {
  en: { 'app.name': 'KoreanLife', 'app.tagline': 'Settle in', 'lang.toggle': '한국어' },
  ko: { 'app.name': 'KoreanLife', 'app.tagline': '정착', 'lang.toggle': 'EN' },
}

function renderTopbar() {
  return render(
    <LanguageProvider dict={dict}>
      <Topbar />
    </LanguageProvider>,
  )
}

describe('Topbar', () => {
  beforeEach(() => localStorage.clear())

  it('shows the brand name', () => {
    renderTopbar()
    expect(screen.getByText('KoreanLife')).toBeInTheDocument()
  })

  it('language toggle shows the other language and switches on click', async () => {
    renderTopbar()
    const toggle = screen.getByRole('button', { name: /switch language|언어/i })
    // starts in EN, so the button offers Korean
    expect(toggle).toHaveTextContent('한국어')
    await userEvent.click(toggle)
    // now in KO, button offers English
    expect(toggle).toHaveTextContent('EN')
  })
})
