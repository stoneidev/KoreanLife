import type { Lang } from '@/shared/i18n'

/**
 * Compact relative time from a UTC-seconds timestamp.
 * `nowSeconds` is injectable so the logic stays deterministic and testable.
 */
export function formatRelativeTime(
  createdUtc: number,
  lang: Lang,
  nowSeconds: number = Date.now() / 1000,
): string {
  const diff = Math.max(0, Math.floor(nowSeconds - createdUtc))

  if (diff < 60) return lang === 'ko' ? '방금' : 'just now'

  const min = Math.floor(diff / 60)
  if (min < 60) return lang === 'ko' ? `${min}분 전` : `${min}m ago`

  const hr = Math.floor(min / 60)
  if (hr < 24) return lang === 'ko' ? `${hr}시간 전` : `${hr}h ago`

  const day = Math.floor(hr / 24)
  return lang === 'ko' ? `${day}일 전` : `${day}d ago`
}
