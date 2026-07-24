import { useState } from 'react'
import type { Phrase } from '@/entities/phrase'
import { useI18n } from '@/shared/i18n'
import { Icon, Toast } from '@/shared/ui'
import { copyText, speakKorean } from '../lib/phrase-actions'

type PhraseSheetProps = {
  phrase: Phrase
}

export function PhraseSheet({ phrase }: PhraseSheetProps) {
  const { t } = useI18n()
  const [toast, setToast] = useState<string | null>(null)

  const copy = async () => {
    try {
      await copyText(phrase.ko)
      setToast(t('phrases.copied'))
    } catch {
      setToast(t('phrases.copyFailed'))
    }
    setTimeout(() => setToast(null), 1800)
  }

  return (
    <>
      <article className="phrase-card">
        <p className="ko">{phrase.ko}</p>
        <p className="roman">{phrase.roman}</p>
        <p className="en">{phrase.en}</p>
        <div className="actions">
          <button type="button" onClick={copy}>
            <Icon name="copy" size={16} /> {t('phrases.copy')}
          </button>
          <button type="button" onClick={() => speakKorean(phrase.ko)}>
            <Icon name="volume" size={16} /> {t('phrases.listen')}
          </button>
        </div>
      </article>
      {toast ? <Toast message={toast} /> : null}
    </>
  )
}
