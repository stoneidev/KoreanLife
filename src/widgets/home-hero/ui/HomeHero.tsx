import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import { useI18n } from '@/shared/i18n'

export function HomeHero() {
  const { t } = useI18n()

  return (
    <section className="hero">
      <p className="hero-kicker">{t('home.hero.kicker')}</p>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.lead')}</p>
      <div className="hero-cta">
        <Link to={routes.phrases} className="btn btn-fill">
          💬 {t('home.hero.ctaPhrases')}
        </Link>
        <Link to={routes.safety} className="btn btn-ghost">
          🛡️ {t('home.hero.ctaSafety')}
        </Link>
      </div>
    </section>
  )
}
