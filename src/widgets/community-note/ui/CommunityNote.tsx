import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import { BlockHead } from '@/shared/ui'

export function CommunityNote() {
  return (
    <section className="block" style={{ paddingBottom: 24 }}>
      <BlockHead title="이번 주 질문" meta="98 replies" />
      <div className="community-note">
        <span className="source-tag">
          <span aria-hidden>💬</span> r/AskAKorean
        </span>
        <h3>외국인이 하지 않았으면 하는 것 1순위는?</h3>
        <p className="mute">
          한국인 답변 압도적 1위는 대중교통에서의 큰 소리. 에티켓 가이드에서 전체 요약을 확인하세요.
        </p>
        <div style={{ marginTop: 14 }}>
          <Link to={routes.guideDetail('etiquette-transit')} className="btn btn-line btn-sm">
            요약 보기 →
          </Link>
        </div>
      </div>
    </section>
  )
}
