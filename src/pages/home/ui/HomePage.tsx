import { Link } from 'react-router-dom'
import { GuideRow, guides } from '@/entities/guide'
import { routes } from '@/shared/config/routes'
import { BlockHead, Screen } from '@/shared/ui'
import { CommunityNote } from '@/widgets/community-note'
import { HomeHero } from '@/widgets/home-hero'
import { QuickIndex } from '@/widgets/quick-index'
import { Topbar } from '@/widgets/topbar'

export function HomePage() {
  const featured = guides.slice(0, 3)

  return (
    <Screen>
      <Topbar />
      <HomeHero />
      <QuickIndex />
      <section className="block">
        <BlockHead title="인기 가이드" action={<Link to={routes.guides}>전체</Link>} />
        {featured.map((g) => (
          <GuideRow key={g.id} guide={g} />
        ))}
      </section>
      <CommunityNote />
    </Screen>
  )
}
