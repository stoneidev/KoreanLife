import { RealityCard, realityChecks } from '@/entities/reality-check'
import { PageHead, Screen } from '@/shared/ui'

export function RealityPage() {
  return (
    <Screen>
      <PageHead
        kicker="Reality Check"
        title="미디어 vs 현실"
        lead="커뮤니티에서 반복 질문된 오해를 실제 맥락과 나란히 놓았습니다."
      />
      <div className="screen-pad" style={{ paddingBottom: 24 }}>
        {realityChecks.map((rc) => (
          <RealityCard key={rc.id} item={rc} />
        ))}
      </div>
    </Screen>
  )
}
