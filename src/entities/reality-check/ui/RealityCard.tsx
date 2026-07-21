import type { RealityCheck } from '../model/reality-checks'

type RealityCardProps = {
  item: RealityCheck
}

export function RealityCard({ item }: RealityCardProps) {
  return (
    <article className="reality-card">
      <h3>{item.topic}</h3>
      <div className="split">
        <div className="drama">
          <span className="lbl">🎬 On screen</span>
          {item.drama}
        </div>
        <div className="real">
          <span className="lbl">✓ Reality</span>
          {item.real}
        </div>
      </div>
      <p className="reality-source">
        <span aria-hidden>📌</span>
        {item.source}
      </p>
    </article>
  )
}
