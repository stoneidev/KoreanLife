import { CommunityFeed } from '@/features/community-feed'
import { useI18n } from '@/shared/i18n'
import { PageHead, Screen } from '@/shared/ui'

export function CommunityPage() {
  const { t } = useI18n()

  return (
    <Screen>
      <PageHead
        kicker={t('community.kicker')}
        title={t('community.title')}
        lead={t('community.lead')}
      />
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        <CommunityFeed />
      </div>
    </Screen>
  )
}
