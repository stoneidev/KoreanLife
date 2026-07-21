import { Link, useParams } from 'react-router-dom'
import { getGuideById, GuideDetailBody } from '@/entities/guide'
import { routes } from '@/shared/config/routes'
import { pick, useI18n } from '@/shared/i18n'
import { Icon, Screen } from '@/shared/ui'

export function GuideDetailPage() {
  const { t, lang } = useI18n()
  const { id } = useParams()
  const guide = id ? getGuideById(id) : undefined

  if (!guide) {
    return (
      <Screen padded>
        <p className="mute">{t('guide.notFound')}</p>
        <Link to={routes.guides} className="back">
          <Icon name="arrow-left" size={16} /> {t('nav.guides')}
        </Link>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="page-head">
        <Link to={routes.guides} className="back">
          <Icon name="arrow-left" size={16} /> {t('nav.guides')}
        </Link>
        <p className="kicker">{pick(guide.category, lang)}</p>
        <h1>{pick(guide.title, lang)}</h1>
      </div>

      <GuideDetailBody guide={guide} />

      <section className="block" style={{ paddingBottom: 24 }}>
        <Link to={routes.phrases} className="btn btn-primary btn-block">
          {t('guide.toPhrases')} <Icon name="arrow-right" size={16} />
        </Link>
      </section>
    </Screen>
  )
}
