import { pick, useI18n } from '@/shared/i18n'
import type { EssentialApp } from '../model/apps'

type AppCardProps = {
  app: EssentialApp
  /** Compact variant for the horizontal home strip. */
  compact?: boolean
}

export function AppCard({ app, compact }: AppCardProps) {
  const { t, lang } = useI18n()

  return (
    <a
      className={`app-card${compact ? ' app-card-compact' : ''}`}
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="app-icon" aria-hidden>
        <img src={app.icon} alt="" width={compact ? 40 : 44} height={compact ? 40 : 44} loading="lazy" />
      </span>
      <div className="app-card-body">
        <div className="app-card-head">
          <strong>{app.name}</strong>
          {app.mustHave ? <span className="app-must">{t('apps.mustHave')}</span> : null}
        </div>
        <p className="app-tagline">{pick(app.tagline, lang)}</p>
        {compact ? null : <p className="app-why">{pick(app.why, lang)}</p>}
      </div>
    </a>
  )
}
