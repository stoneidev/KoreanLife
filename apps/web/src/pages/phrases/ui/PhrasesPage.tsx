import { useState } from 'react'
import { getPhraseSetById, phraseSets } from '@/entities/phrase'
import { FilterBar } from '@/features/filter-by-category'
import { PhraseSheet } from '@/features/use-phrase-sheet'
import { pick, useI18n } from '@/shared/i18n'
import { PageHead, Screen, Tip } from '@/shared/ui'

export function PhrasesPage() {
  const { t, lang } = useI18n()
  const [setId, setSetId] = useState(phraseSets[0].id)
  const current = getPhraseSetById(setId)!

  const options = phraseSets.map((s) => pick(s.label, lang))
  const currentOption = pick(current.label, lang)

  return (
    <Screen>
      <PageHead
        kicker={t('phrases.kicker')}
        title={t('phrases.title')}
        lead={t('phrases.lead')}
      />
      <div className="screen-pad">
        <FilterBar
          options={options}
          value={currentOption}
          onChange={(option) => {
            const next = phraseSets.find((s) => pick(s.label, lang) === option)
            if (next) setSetId(next.id)
          }}
        />

        {current.phrases.map((p) => (
          <PhraseSheet key={p.ko} phrase={p} />
        ))}

        <Tip>{t('phrases.tip')}</Tip>
      </div>
    </Screen>
  )
}
