import { routes } from '@/shared/config/routes'

export const navItems = [
  { to: routes.home, label: '홈', end: true },
  { to: routes.guides, label: '가이드' },
  { to: routes.phrases, label: '문장' },
  { to: routes.reality, label: '리얼' },
  { to: routes.safety, label: '안전' },
] as const
