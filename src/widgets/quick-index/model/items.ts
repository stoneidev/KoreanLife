import { routes } from '@/shared/config/routes'

export const quickIndex = [
  {
    to: routes.phrases,
    num: '1',
    emoji: '💬',
    tone: 't-coral',
    titleKey: 'quick.phrases.title',
    descKey: 'quick.phrases.desc',
  },
  {
    to: routes.safety,
    num: '2',
    emoji: '🛡️',
    tone: 't-teal',
    titleKey: 'quick.safety.title',
    descKey: 'quick.safety.desc',
  },
  {
    to: routes.guideDetail('delivery-no-phone'),
    num: '3',
    emoji: '🛵',
    tone: 't-gold',
    titleKey: 'quick.delivery.title',
    descKey: 'quick.delivery.desc',
  },
  {
    to: routes.reality,
    num: '4',
    emoji: '🎬',
    tone: 't-ink',
    titleKey: 'quick.reality.title',
    descKey: 'quick.reality.desc',
  },
] as const
