export type PushState =
  | 'unsupported'
  | 'idle'
  | 'subscribing'
  | 'subscribed'
  | 'denied'
  | 'error'

type PushSignals = {
  supported: boolean
  permission: NotificationPermission
  subscribed: boolean
}

/** Derive the resting push state from browser capability/permission/subscription. */
export function nextPushState({ supported, permission, subscribed }: PushSignals): PushState {
  if (!supported) return 'unsupported'
  if (permission === 'denied') return 'denied'
  if (subscribed) return 'subscribed'
  return 'idle'
}
