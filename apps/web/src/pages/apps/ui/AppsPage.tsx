import { AppCard, getAppsByCategory } from '@/entities/essential-app'
import { pick, useI18n } from '@/shared/i18n'
import { Icon, PageHead, Screen } from '@/shared/ui'

export function AppsPage() {
  const { t, lang } = useI18n()
  const groups = getAppsByCategory()

  return (
    <Screen>
      <PageHead kicker={t('apps.kicker')} title={t('apps.title')} lead={t('apps.lead')} />
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        {groups.map(({ category, apps }) => (
          <section key={category.id} className="app-group">
            <h2 className="app-group-head">
              <Icon name={category.icon} size={18} />
              {pick(category.label, lang)}
            </h2>
            <div className="app-list">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Screen>
  )
}
