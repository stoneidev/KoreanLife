import { RealityCard, realityChecks } from '@/entities/reality-check'
import { useI18n } from '@/shared/i18n'
import { PageHead, Screen } from '@/shared/ui'

export function RealityPage() {
  const { t } = useI18n()

  return (
    <Screen>
      <PageHead kicker={t('reality.kicker')} title={t('reality.title')} lead={t('reality.lead')} />
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        {realityChecks.map((rc) => (
          <RealityCard key={rc.id} item={rc} />
        ))}
      </div>
    </Screen>
  )
}
