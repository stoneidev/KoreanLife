import { Link } from 'react-router-dom'
import { useI18n } from '@/shared/i18n'
import { BlockHead, Icon } from '@/shared/ui'
import { quickIndex } from '../model/items'

export function QuickIndex() {
  const { t } = useI18n()

  return (
    <section className="block">
      <BlockHead title={t('quick.heading')} />
      <div className="tile-grid">
        {quickIndex.map((q) => (
          <Link key={q.num} to={q.to} className={`tile ${q.tone}`}>
            <span className="tile-icon" aria-hidden>
              <Icon name={q.icon} size={26} />
            </span>
            <span className="tile-badge">{q.num}</span>
            <strong>{t(q.titleKey)}</strong>
            <span>{t(q.descKey)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
