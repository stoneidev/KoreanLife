import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import type { Guide } from '../model/guides'

type GuideRowProps = {
  guide: Guide
}

export function GuideRow({ guide }: GuideRowProps) {
  return (
    <Link to={routes.guideDetail(guide.id)} className="guide-row">
      <span className="cat">
        {guide.code} · {guide.category}
      </span>
      <h3>{guide.title}</h3>
      <p>{guide.summary}</p>
    </Link>
  )
}

type GuideDetailBodyProps = {
  guide: Guide
}

export function GuideDetailBody({ guide }: GuideDetailBodyProps) {
  return (
    <>
      <div className="why-box">
        <span className="mono">Why — community signal</span>
        {guide.pain}
      </div>

      <section className="block">
        <div className="block-head">
          <h2>단계별 해법</h2>
        </div>
        <ol className="step-list">
          {guide.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="block">
        <div className="block-head">
          <h2>Do / Don&apos;t</h2>
        </div>
        <div className="rule do">
          <strong>Do</strong>
          {guide.dos.map((d) => (
            <p key={d}>· {d}</p>
          ))}
        </div>
        <div className="rule dont">
          <strong>Don&apos;t</strong>
          {guide.donts.map((d) => (
            <p key={d}>· {d}</p>
          ))}
        </div>
      </section>
    </>
  )
}
