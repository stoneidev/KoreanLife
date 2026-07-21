import { routes } from '@/shared/config/routes'

export const navItems = [
  { to: routes.home, labelKey: 'nav.home', icon: '🏠', end: true },
  { to: routes.guides, labelKey: 'nav.guides', icon: '🧭' },
  { to: routes.phrases, labelKey: 'nav.phrases', icon: '💬' },
  { to: routes.reality, labelKey: 'nav.reality', icon: '🎬' },
  { to: routes.safety, labelKey: 'nav.safety', icon: '🛡️' },
] as const
