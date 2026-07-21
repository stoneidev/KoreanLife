import { useMemo, useState } from 'react'
import { scamChecklist } from '@/entities/scam-check'
import { getScamVerdict, scoreScamChecks } from '../model/verdict'

export function ScamDiagnoser() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const weights = useMemo(
    () => Object.fromEntries(scamChecklist.map((item) => [item.id, item.weight])),
    [],
  )

  const score = useMemo(() => scoreScamChecks(checked, weights), [checked, weights])
  const verdict = getScamVerdict(score)

  return (
    <>
      <div className="check-list">
        {scamChecklist.map((item) => {
          const on = checked.has(item.id)
          return (
            <div
              key={item.id}
              className={`check-row ${on ? 'on' : ''}`}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggle(item.id)
              }}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
            >
              <div className="box">{on ? '✓' : ''}</div>
              <p>
                {item.text}
                {item.weight === 3 ? <span className="core-mark">핵심</span> : null}
              </p>
            </div>
          )
        })}
      </div>
      <div className={`verdict ${verdict.cls}`}>{verdict.label}</div>
    </>
  )
}
