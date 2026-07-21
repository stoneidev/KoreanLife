import { useState } from 'react'
import type { Phrase } from '@/entities/phrase'
import { Toast } from '@/shared/ui'
import { copyText, speakKorean } from '../lib/phrase-actions'

type PhraseSheetProps = {
  phrase: Phrase
}

export function PhraseSheet({ phrase }: PhraseSheetProps) {
  const [toast, setToast] = useState<string | null>(null)

  const copy = async () => {
    try {
      await copyText(phrase.ko)
      setToast('복사됨 — 채팅창에 붙여넣으세요')
    } catch {
      setToast('복사 실패')
    }
    setTimeout(() => setToast(null), 1800)
  }

  return (
    <>
      <article className="phrase-sheet">
        <p className="ko">{phrase.ko}</p>
        <p className="roman">{phrase.roman}</p>
        <p className="en">{phrase.en}</p>
        <div className="actions">
          <button type="button" onClick={copy}>
            복사
          </button>
          <button type="button" onClick={() => speakKorean(phrase.ko)}>
            듣기
          </button>
        </div>
      </article>
      {toast ? <Toast message={toast} /> : null}
    </>
  )
}
