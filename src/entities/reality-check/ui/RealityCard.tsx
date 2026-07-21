import { pick, useI18n } from '@/shared/i18n'
import type { RealityCheck } from '../model/reality-checks'

type RealityCardProps = {
  item: RealityCheck
}

export function RealityCard({ item }: RealityCardProps) {
  const { t, lang } = useI18n()

  return (
    <article className="reality-card">
      <h3>{pick(item.topic, lang)}</h3>
      <div className="split">
        <div className="drama">
          <span className="lbl">🎬 {t('reality.onScreen')}</span>
          {pick(item.drama, lang)}
        </div>
        <div className="real">
          <span className="lbl">✓ {t('reality.reality')}</span>
          {pick(item.real, lang)}
        </div>
      </div>
      <p className="reality-source">
        <span aria-hidden>📌</span>
        {pick(item.source, lang)}
      </p>
    </article>
  )
}
