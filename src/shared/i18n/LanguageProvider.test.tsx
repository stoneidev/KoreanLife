import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, useI18n } from './LanguageProvider'
import type { Dictionary } from './translate'

const dict: Dictionary = {
  en: { hello: 'Hello' },
  ko: { hello: '안녕' },
}

function Probe() {
  const { t, lang, setLang, toggle } = useI18n()
  return (
    <div>
      <p data-testid="msg">{t('hello')}</p>
      <p data-testid="lang">{lang}</p>
      <button onClick={() => setLang('ko')}>ko</button>
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

function renderProbe() {
  return render(
    <LanguageProvider dict={dict}>
      <Probe />
    </LanguageProvider>,
  )
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to English', () => {
    renderProbe()
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
    expect(screen.getByTestId('msg')).toHaveTextContent('Hello')
  })

  it('setLang switches language and translations', async () => {
    renderProbe()
    await userEvent.click(screen.getByText('ko'))
    expect(screen.getByTestId('lang')).toHaveTextContent('ko')
    expect(screen.getByTestId('msg')).toHaveTextContent('안녕')
  })

  it('toggle flips between en and ko', async () => {
    renderProbe()
    await userEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang')).toHaveTextContent('ko')
    await userEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('persists the chosen language to localStorage', async () => {
    renderProbe()
    await userEvent.click(screen.getByText('ko'))
    expect(localStorage.getItem('koreanlife.lang')).toBe('ko')
  })

  it('restores a persisted language on mount', () => {
    localStorage.setItem('koreanlife.lang', 'ko')
    renderProbe()
    expect(screen.getByTestId('lang')).toHaveTextContent('ko')
  })

  it('throws a clear error when useI18n is used outside the provider', () => {
    function Orphan() {
      useI18n()
      return null
    }
    expect(() => render(<Orphan />)).toThrow(/LanguageProvider/)
  })
})
