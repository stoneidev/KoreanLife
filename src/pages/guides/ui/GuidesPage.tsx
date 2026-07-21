import { useState } from 'react'
import { filterGuidesByCategory, getGuideCategories, GuideRow } from '@/entities/guide'
import { FilterBar } from '@/features/filter-by-category'
import { PageHead, Screen } from '@/shared/ui'

export function GuidesPage() {
  const [cat, setCat] = useState('전체')
  const filtered = filterGuidesByCategory(cat)

  return (
    <Screen>
      <PageHead
        kicker="Guides / Handbook"
        title="생활 돌파 가이드"
        lead="커뮤니티에서 가장 많이 반복된 질문을 단계별 해법으로 정리했습니다."
      />
      <div className="screen-pad">
        <FilterBar options={getGuideCategories()} value={cat} onChange={setCat} />
        {filtered.map((g) => (
          <GuideRow key={g.id} guide={g} />
        ))}
      </div>
    </Screen>
  )
}
