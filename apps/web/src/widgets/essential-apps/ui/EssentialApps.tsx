import { Link } from 'react-router-dom'
import { AppCard, essentialApps } from '@/entities/essential-app'
import { routes } from '@/shared/config/routes'
import { useI18n } from '@/shared/i18n'
import { BlockHead } from '@/shared/ui'

export function EssentialApps() {
  const { t } = useI18n()
  const mustHave = essentialApps.filter((a) => a.mustHave)

  return (
    <section className="block">
      <BlockHead
        title={t('apps.homeHeading')}
        action={<Link to={routes.apps}>{t('common.viewAll')}</Link>}
      />
      <div className="app-strip">
        {mustHave.map((app) => (
          <AppCard key={app.id} app={app} compact />
        ))}
      </div>
    </section>
  )
}
