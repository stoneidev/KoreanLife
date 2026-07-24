import { useState } from 'react'
import { ALL_CATEGORY, filterGuidesByCategory, getGuideCategories, GuideRow } from '@/entities/guide'
import { FilterBar } from '@/features/filter-by-category'
import { pick, useI18n } from '@/shared/i18n'
import { PageHead, Screen } from '@/shared/ui'

export function GuidesPage() {
  const { t, lang } = useI18n()
  const allLabel = pick(ALL_CATEGORY, lang)
  const [cat, setCat] = useState(allLabel)
  const filtered = filterGuidesByCategory(cat, lang)

  return (
    <Screen>
      <PageHead kicker={t('guides.kicker')} title={t('guides.title')} lead={t('guides.lead')} />
      <div className="screen-pad">
        <FilterBar options={getGuideCategories(lang)} value={cat} onChange={setCat} />
        {filtered.map((g) => (
          <GuideRow key={g.id} guide={g} />
        ))}
      </div>
    </Screen>
  )
}
