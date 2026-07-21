import { useState } from 'react'
import { getPhraseSetById, phraseSets } from '@/entities/phrase'
import { FilterBar } from '@/features/filter-by-category'
import { PhraseSheet } from '@/features/use-phrase-sheet'
import { PageHead, Screen, Tip } from '@/shared/ui'

export function PhrasesPage() {
  const [setId, setSetId] = useState(phraseSets[0].id)
  const current = getPhraseSetById(setId)!

  return (
    <Screen>
      <PageHead
        kicker="Phrase Sheets"
        title="상황별 문장 시트"
        lead="전화·채팅·대면에서 그대로 복사하거나 재생해서 보여주세요."
      />
      <div className="screen-pad">
        <FilterBar
          options={phraseSets.map((s) => s.label)}
          value={current.label}
          onChange={(label) => {
            const next = phraseSets.find((s) => s.label === label)
            if (next) setSetId(next.id)
          }}
        />

        {current.phrases.map((p) => (
          <PhraseSheet key={p.ko} phrase={p} />
        ))}

        <Tip>
          전화가 두렵다면 첫 문장은 항상 &ldquo;한국어가 서툴러서 천천히 말씀해 주세요&rdquo;로
          시작하세요. 상대의 말 속도가 확 달라집니다.
        </Tip>
      </div>
    </Screen>
  )
}
