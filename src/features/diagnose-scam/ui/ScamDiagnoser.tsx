import { useMemo, useState } from 'react'
import { scamChecklist } from '@/entities/scam-check'
import { pick, useI18n } from '@/shared/i18n'
import { getScamVerdict, scoreScamChecks } from '../model/verdict'

export function ScamDiagnoser() {
  const { t, lang } = useI18n()
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
  const verdictLabel = t(`scam.verdict.${verdict.level}`, { score })

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
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(item.id)
                }
              }}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
            >
              <div className="box" aria-hidden>
                {on ? '✓' : ''}
              </div>
              <p>
                {pick(item.text, lang)}
                {item.weight === 3 ? <span className="core-mark">{t('scam.core')}</span> : null}
              </p>
            </div>
          )
        })}
      </div>
      <div className={`verdict ${verdict.cls}`} role="status">
        {verdictLabel}
      </div>
    </>
  )
}
