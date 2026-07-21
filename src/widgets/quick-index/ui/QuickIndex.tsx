import { Link } from 'react-router-dom'
import { BlockHead } from '@/shared/ui'
import { quickIndex } from '../model/items'

export function QuickIndex() {
  return (
    <section className="block">
      <BlockHead title="즉시 해결" meta="INDEX / 01–04" />
      <ul className="index-list">
        {quickIndex.map((q) => (
          <li key={q.num}>
            <Link to={q.to}>
              <span className="index-num">{q.num}</span>
              <span>
                <strong>{q.title}</strong>
                <span>{q.desc}</span>
              </span>
              <span className="index-arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
