import { Link, useParams } from 'react-router-dom'
import { getGuideById, GuideDetailBody } from '@/entities/guide'
import { routes } from '@/shared/config/routes'
import { Screen } from '@/shared/ui'

export function GuideDetailPage() {
  const { id } = useParams()
  const guide = id ? getGuideById(id) : undefined

  if (!guide) {
    return (
      <Screen padded>
        <p className="mute">가이드를 찾을 수 없어요.</p>
        <Link to={routes.guides} className="back">
          ← Guides
        </Link>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="page-head">
        <Link to={routes.guides} className="back">
          ← Guides
        </Link>
        <p className="mono">
          {guide.code} · {guide.category}
        </p>
        <h1 className="display" style={{ fontSize: 28, marginTop: 8 }}>
          {guide.title}
        </h1>
      </div>

      <GuideDetailBody guide={guide} />

      <section className="block" style={{ paddingBottom: 24 }}>
        <Link to={routes.phrases} className="btn btn-ink btn-block">
          이 상황에 쓸 문장 시트 →
        </Link>
      </section>
    </Screen>
  )
}
