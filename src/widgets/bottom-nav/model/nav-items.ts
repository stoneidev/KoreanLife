import { routes } from '@/shared/config/routes'

import type { IconName } from '@/shared/ui'

type NavItem = {
  to: string
  labelKey: string
  icon: IconName
  end?: boolean
}

export const navItems: NavItem[] = [
  { to: routes.home, labelKey: 'nav.home', icon: 'home', end: true },
  { to: routes.guides, labelKey: 'nav.guides', icon: 'compass' },
  { to: routes.phrases, labelKey: 'nav.phrases', icon: 'chat' },
  { to: routes.reality, labelKey: 'nav.reality', icon: 'film' },
  { to: routes.community, labelKey: 'nav.community', icon: 'people' },
  { to: routes.safety, labelKey: 'nav.safety', icon: 'shield' },
]
