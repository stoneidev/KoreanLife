import { useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
import { usePushNotify } from '../model/usePushNotify'

export function PushCard() {
  const { t } = useI18n()
  const { state, testSent, error, enable, sendTest } = usePushNotify()

  if (state === 'unsupported') {
    return (
      <div className="push-card">
        <div className="push-card-head">
          <span className="app-icon" aria-hidden>
            <Icon name="chat" size={22} />
          </span>
          <div>
            <strong>{t('push.title')}</strong>
            <p className="mute">{t('push.unsupported')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="push-card">
      <div className="push-card-head">
        <span className="app-icon" aria-hidden>
          <Icon name="chat" size={22} />
        </span>
        <div>
          <strong>{t('push.title')}</strong>
          <p className="mute">{t('push.lead')}</p>
        </div>
      </div>

      {state === 'denied' ? (
        <p className="push-note push-note-warn">{t('push.denied')}</p>
      ) : null}
      {error ? <p className="push-note push-note-warn">{t('push.error')}</p> : null}
      {testSent ? <p className="push-note push-note-ok">{t('push.testSent')}</p> : null}

      <div className="push-actions">
        {state === 'subscribed' ? (
          <button type="button" className="btn btn-primary btn-block" onClick={sendTest}>
            {t('push.sendTest')}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={enable}
            disabled={state === 'subscribing' || state === 'denied'}
          >
            {state === 'subscribing' ? t('push.enabling') : t('push.enable')}
          </button>
        )}
      </div>
    </div>
  )
}
