import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import { useI18n } from '@/shared/i18n'
import { BlockHead, Icon } from '@/shared/ui'

export function CommunityNote() {
  const { t } = useI18n()

  return (
    <section className="block" style={{ paddingBottom: 24 }}>
      <BlockHead title={t('community.heading')} />
      <div className="community-note">
        <span className="source-tag">
          <Icon name="chat" size={13} /> r/AskAKorean
        </span>
        <h3>{t('community.question')}</h3>
        <p className="mute">{t('community.answer')}</p>
        <div style={{ marginTop: 14 }}>
          <Link to={routes.guideDetail('etiquette-transit')} className="btn btn-line btn-sm">
            {t('community.cta')} <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
