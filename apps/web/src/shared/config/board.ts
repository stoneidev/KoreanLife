/**
 * Board API shares the push Worker origin. Override with VITE_BOARD_API_BASE if needed.
 */
export const BOARD_API_BASE =
  import.meta.env.VITE_BOARD_API_BASE ??
  import.meta.env.VITE_PUSH_API_BASE ??
  'https://koreanlife-push.nijin39.workers.dev'

const DEVICE_KEY = 'koreanlife.deviceId'
const NICK_KEY = 'koreanlife.boardNick'

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '')
  }
  return `dev${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

export function getDeviceId(): string {
  try {
    const existing = localStorage.getItem(DEVICE_KEY)
    if (existing) return existing
    const id = randomId()
    localStorage.setItem(DEVICE_KEY, id)
    return id
  } catch {
    return randomId()
  }
}

export function getBoardNick(): string {
  try {
    return localStorage.getItem(NICK_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setBoardNick(nick: string) {
  try {
    localStorage.setItem(NICK_KEY, nick.trim())
  } catch {
    /* ignore */
  }
}
