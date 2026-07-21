import { routes } from '@/shared/config/routes'
import type { IconName } from '@/shared/ui'

type QuickItem = {
  to: string
  num: string
  icon: IconName
  tone: string
  titleKey: string
  descKey: string
}

export const quickIndex: QuickItem[] = [
  {
    to: routes.phrases,
    num: '1',
    icon: 'chat',
    tone: 't-coral',
    titleKey: 'quick.phrases.title',
    descKey: 'quick.phrases.desc',
  },
  {
    to: routes.safety,
    num: '2',
    icon: 'shield',
    tone: 't-teal',
    titleKey: 'quick.safety.title',
    descKey: 'quick.safety.desc',
  },
  {
    to: routes.guideDetail('delivery-no-phone'),
    num: '3',
    icon: 'scooter',
    tone: 't-gold',
    titleKey: 'quick.delivery.title',
    descKey: 'quick.delivery.desc',
  },
  {
    to: routes.reality,
    num: '4',
    icon: 'film',
    tone: 't-ink',
    titleKey: 'quick.reality.title',
    descKey: 'quick.reality.desc',
  },
]
