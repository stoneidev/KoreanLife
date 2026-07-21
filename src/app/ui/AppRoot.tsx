import { Route, Routes, useLocation } from 'react-router-dom'
import { CommunityPage } from '@/pages/community'
import { GuideDetailPage } from '@/pages/guide-detail'
import { GuidesPage } from '@/pages/guides'
import { HomePage } from '@/pages/home'
import { PhrasesPage } from '@/pages/phrases'
import { RealityPage } from '@/pages/reality'
import { SafetyPage } from '@/pages/safety'
import { routes } from '@/shared/config/routes'
import { BottomNav } from '@/widgets/bottom-nav'

export function App() {
  const location = useLocation()

  return (
    <div className="phone">
      <Routes location={location}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.guides} element={<GuidesPage />} />
        <Route path="/guides/:id" element={<GuideDetailPage />} />
        <Route path={routes.phrases} element={<PhrasesPage />} />
        <Route path={routes.reality} element={<RealityPage />} />
        <Route path={routes.safety} element={<SafetyPage />} />
        <Route path={routes.community} element={<CommunityPage />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
