import { useState } from 'react'
import { BoardFeed } from '@/features/board-feed'
import { CommunityFeed } from '@/features/community-feed'
import { useI18n } from '@/shared/i18n'
import { PageHead, Screen } from '@/shared/ui'
import { CommunitySwitch, type CommunitySource } from '@/widgets/community-switch'

export function CommunityPage() {
  const { t } = useI18n()
  const [tab, setTab] = useState<CommunitySource>('board')
  const [boardDeep, setBoardDeep] = useState(false)

  const showSwitch = tab === 'reddit' || !boardDeep

  return (
    <Screen>
      {showSwitch ? (
        <PageHead
          kicker={t('community.pageKicker')}
          title={t('community.pageTitle')}
          lead={t('community.pageLead')}
        />
      ) : null}
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        {showSwitch ? (
          <CommunitySwitch
            value={tab}
            ariaLabel={t('board.tabs')}
            onChange={(next) => {
              setTab(next)
              setBoardDeep(false)
            }}
            options={[
              {
                id: 'board',
                label: t('board.tabBoard'),
                hint: t('board.tabBoardHint'),
                icon: 'chat',
              },
              {
                id: 'reddit',
                label: t('board.tabReddit'),
                hint: t('board.tabRedditHint'),
                icon: 'globe',
              },
            ]}
          />
        ) : null}
        <div className="community-pane" key={tab}>
          {tab === 'board' ? (
            <BoardFeed onDepthChange={setBoardDeep} />
          ) : (
            <CommunityFeed />
          )}
        </div>
      </div>
    </Screen>
  )
}
