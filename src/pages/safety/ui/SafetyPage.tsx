import { Link } from 'react-router-dom'
import { ScamDiagnoser } from '@/features/diagnose-scam'
import { routes } from '@/shared/config/routes'
import { BlockHead, PageHead, Screen } from '@/shared/ui'

export function SafetyPage() {
  return (
    <Screen>
      <PageHead
        kicker="Safety / Housing"
        title="선입금 사기 진단"
        lead="고시원·원룸 구할 때 지금 상황에 해당하는 항목을 모두 선택하세요."
      />
      <div className="screen-pad">
        <ScamDiagnoser />
      </div>
      <section className="block" style={{ paddingBottom: 24 }}>
        <BlockHead title="사기 의심될 때" />
        <div className="help-row">
          <div>
            <strong>경찰 112 · 외국인 통역 1345</strong>
            <span>다누리콜센터는 13개 언어 통역 지원</span>
          </div>
          <div>
            <strong>인터넷등기소에서 등기부등본 열람</strong>
            <span>실소유주 확인 700원 — 계약 전 필수</span>
          </div>
        </div>
        <Link to={routes.guideDetail('deposit-scam')} className="btn btn-ink btn-block" style={{ marginTop: 14 }}>
          선입금 사기 전체 가이드 →
        </Link>
      </section>
    </Screen>
  )
}
