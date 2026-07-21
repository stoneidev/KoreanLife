import type { RealityCheck } from '../model/reality-checks'

type RealityCardProps = {
  item: RealityCheck
}

export function RealityCard({ item }: RealityCardProps) {
  return (
    <article className="topic-block">
      <h3>{item.topic}</h3>
      <div className="split">
        <div>
          <span className="lbl">미디어</span>
          {item.drama}
        </div>
        <div>
          <span className="lbl">현실</span>
          {item.real}
        </div>
      </div>
      <p className="mono" style={{ marginTop: 10, textTransform: 'none', letterSpacing: 0 }}>
        근거 · {item.source}
      </p>
    </article>
  )
}
