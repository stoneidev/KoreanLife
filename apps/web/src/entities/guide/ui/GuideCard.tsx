import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import { pick, useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
import type { Guide } from '../model/guides'

type GuideRowProps = {
  guide: Guide
}

export function GuideRow({ guide }: GuideRowProps) {
  const { lang } = useI18n()
  return (
    <Link to={routes.guideDetail(guide.id)} className="guide-card">
      <div className="guide-card-cover" aria-hidden>
        <Icon name={guide.icon} size={38} />
      </div>
      <div className="guide-card-body">
        <span className="cat">{pick(guide.category, lang)}</span>
        <h3>{pick(guide.title, lang)}</h3>
        <p>{pick(guide.summary, lang)}</p>
      </div>
    </Link>
  )
}

type GuideDetailBodyProps = {
  guide: Guide
}

export function GuideDetailBody({ guide }: GuideDetailBodyProps) {
  const { t, lang } = useI18n()
  return (
    <>
      <div className="why-box">
        <span className="kicker">{t('guide.why')}</span>
        {pick(guide.pain, lang)}
      </div>

      <section className="block">
        <div className="block-head">
          <h2>{t('guide.steps')}</h2>
        </div>
        <ol className="step-list">
          {guide.steps.map((s) => (
            <li key={s.en}>{pick(s, lang)}</li>
          ))}
        </ol>
      </section>

      <section className="block">
        <div className="block-head">
          <h2>{t('guide.dosDonts')}</h2>
        </div>
        <div className="rule do">
          <strong>
            <Icon name="check" size={15} /> {t('guide.do')}
          </strong>
          {guide.dos.map((d) => (
            <p key={d.en}>{pick(d, lang)}</p>
          ))}
        </div>
        <div className="rule dont">
          <strong>
            <Icon name="close" size={15} /> {t('guide.dont')}
          </strong>
          {guide.donts.map((d) => (
            <p key={d.en}>{pick(d, lang)}</p>
          ))}
        </div>
      </section>
    </>
  )
}
