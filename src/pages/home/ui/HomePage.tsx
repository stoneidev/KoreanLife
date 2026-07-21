import { Link } from 'react-router-dom'
import { GuideRow, guides } from '@/entities/guide'
import { routes } from '@/shared/config/routes'
import { useI18n } from '@/shared/i18n'
import { BlockHead, Screen } from '@/shared/ui'
import { PushCard } from '@/features/push-notify'
import { CommunityNote } from '@/widgets/community-note'
import { EssentialApps } from '@/widgets/essential-apps'
import { HomeHero } from '@/widgets/home-hero'
import { QuickIndex } from '@/widgets/quick-index'
import { Topbar } from '@/widgets/topbar'

export function HomePage() {
  const { t } = useI18n()
  const featured = guides.slice(0, 3)

  return (
    <Screen>
      <Topbar />
      <HomeHero />
      <QuickIndex />
      <EssentialApps />
      <section className="block">
        <BlockHead
          title={t('home.popularGuides')}
          action={<Link to={routes.guides}>{t('common.viewAll')}</Link>}
        />
        {featured.map((g) => (
          <GuideRow key={g.id} guide={g} />
        ))}
      </section>
      <CommunityNote />
      <section className="block" style={{ paddingBottom: 8 }}>
        <PushCard />
      </section>
    </Screen>
  )
}
