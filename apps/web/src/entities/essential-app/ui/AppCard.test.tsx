import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import type { EssentialApp } from '../model/apps'
import { AppCard } from './AppCard'

const sample: EssentialApp = {
  id: 'kakaotalk',
  name: 'KakaoTalk',
  category: 'messaging',
  icon: '/icons/apps/kakaotalk.jpg',
  tagline: { en: 'The messenger everyone uses', ko: '모두가 쓰는 국민 메신저' },
  why: {
    en: 'Non-negotiable.',
    ko: '필수.',
  },
  url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk',
  mustHave: true,
}

function renderCard(app: EssentialApp = sample) {
  return render(
    <LanguageProvider dict={dictionary}>
      <AppCard app={app} />
    </LanguageProvider>,
  )
}

describe('AppCard', () => {
  beforeEach(() => localStorage.clear())

  it('shows the app thumbnail in the icon slot', () => {
    const { container } = renderCard()
    const img = container.querySelector('.app-icon img')
    expect(img).toBeTruthy()
    expect(img).toHaveAttribute('src', '/icons/apps/kakaotalk.jpg')
    expect(img).toHaveAttribute('alt', '')
  })
})
