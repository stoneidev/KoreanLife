import { pick, useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
import { appCategories } from '../model/apps'
import type { EssentialApp } from '../model/apps'

const iconByCategory = Object.fromEntries(appCategories.map((c) => [c.id, c.icon]))

type AppCardProps = {
  app: EssentialApp
  /** Compact variant for the horizontal home strip. */
  compact?: boolean
}

export function AppCard({ app, compact }: AppCardProps) {
  const { t, lang } = useI18n()
  const icon = iconByCategory[app.category] ?? 'smartphone'

  return (
    <a
      className={`app-card${compact ? ' app-card-compact' : ''}`}
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="app-icon" aria-hidden>
        <Icon name={icon} size={compact ? 22 : 24} />
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
