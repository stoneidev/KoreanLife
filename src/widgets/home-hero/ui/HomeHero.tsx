import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'

export function HomeHero() {
  return (
    <section className="hero-bleed">
      <p className="hero-kicker">r/AskAKorean · Jul 2026 field notes</p>
      <h1>
        KoreanLife
        <span>전화 없이, 사기 없이, 눈치 있게 — 정착 초기의 실질 장벽만 다룹니다.</span>
      </h1>
      <div className="hero-cta">
        <Link to={routes.phrases} className="btn btn-fill">
          문장 시트 열기
        </Link>
        <Link to={routes.safety} className="btn btn-ghost">
          사기 진단
        </Link>
      </div>
    </section>
  )
}
