import { useState } from 'react'
import { BoardFeed } from '@/features/board-feed'
import { CommunityFeed } from '@/features/community-feed'
import { useI18n } from '@/shared/i18n'
import { PageHead, Screen } from '@/shared/ui'

type Tab = 'reddit' | 'board'

export function CommunityPage() {
  const { t } = useI18n()
  const [tab, setTab] = useState<Tab>('board')

  return (
    <Screen>
      <PageHead
        kicker={tab === 'board' ? t('board.kicker') : t('community.kicker')}
        title={tab === 'board' ? t('board.title') : t('community.title')}
        lead={tab === 'board' ? t('board.lead') : t('community.lead')}
      />
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        <div className="filter-bar community-tabs" role="tablist" aria-label={t('board.tabs')}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'board'}
            className={tab === 'board' ? 'on' : ''}
            onClick={() => setTab('board')}
          >
            {t('board.tabBoard')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'reddit'}
            className={tab === 'reddit' ? 'on' : ''}
            onClick={() => setTab('reddit')}
          >
            {t('board.tabReddit')}
          </button>
        </div>
        {tab === 'board' ? <BoardFeed /> : <CommunityFeed />}
      </div>
    </Screen>
  )
}
