import { Link } from 'react-router-dom'
import { ScamDiagnoser } from '@/features/diagnose-scam'
import { routes } from '@/shared/config/routes'
import { useI18n } from '@/shared/i18n'
import { BlockHead, Icon, PageHead, Screen } from '@/shared/ui'

export function SafetyPage() {
  const { t } = useI18n()

  return (
    <Screen>
      <PageHead kicker={t('safety.kicker')} title={t('safety.title')} lead={t('safety.lead')} />
      <div className="screen-pad">
        <ScamDiagnoser />
      </div>
      <section className="block" style={{ paddingBottom: 24 }}>
        <BlockHead title={t('safety.helpTitle')} />
        <div className="help-list">
          <div>
            <strong>{t('safety.help1.title')}</strong>
            <span>{t('safety.help1.desc')}</span>
          </div>
          <div>
            <strong>{t('safety.help2.title')}</strong>
            <span>{t('safety.help2.desc')}</span>
          </div>
        </div>
        <Link
          to={routes.guideDetail('deposit-scam')}
          className="btn btn-primary btn-block"
          style={{ marginTop: 14 }}
        >
          {t('safety.fullGuide')} <Icon name="arrow-right" size={16} />
        </Link>
      </section>
    </Screen>
  )
}
