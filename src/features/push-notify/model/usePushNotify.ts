import { useCallback, useEffect, useState } from 'react'
import { PUSH_API_BASE, VAPID_PUBLIC_KEY, isPushSupported } from '../config'
import { subscriptionMatchesKey, urlBase64ToUint8Array } from '../lib/vapid'
import { nextPushState } from './push-state'
import type { PushState } from './push-state'

type UsePushNotify = {
  state: PushState
  /** Set after a successful test send, cleared on the next action. */
  testSent: boolean
  error: string | null
  enable: () => Promise<void>
  sendTest: () => Promise<void>
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  return navigator.serviceWorker.ready
}

function toJSON(sub: PushSubscription) {
  // PushSubscription.toJSON() gives { endpoint, keys: { p256dh, auth } }
  return sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }
}

export function usePushNotify(): UsePushNotify {
  const supported = isPushSupported()
  const [state, setState] = useState<PushState>(supported ? 'idle' : 'unsupported')
  const [testSent, setTestSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reflect any existing subscription on mount.
  useEffect(() => {
    if (!supported) return
    let active = true
    getRegistration()
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => {
        if (!active) return
        setState(
          nextPushState({
            supported: true,
            permission: Notification.permission,
            subscribed: !!sub,
          }),
        )
      })
      .catch(() => active && setState('idle'))
    return () => {
      active = false
    }
  }, [supported])

  const enable = useCallback(async () => {
    setError(null)
    setTestSent(false)
    if (!supported) {
      setState('unsupported')
      return
    }
    setState('subscribing')
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setState(permission === 'denied' ? 'denied' : 'idle')
        return
      }
      const reg = await getRegistration()
      const appServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)

      // Drop any subscription created with a different VAPID key (key rotation),
      // otherwise subscribe() would either reuse a stale sub or throw.
      const existing = await reg.pushManager.getSubscription()
      if (existing && !subscriptionMatchesKey(existing, appServerKey)) {
        await existing.unsubscribe()
      }
      const current = subscriptionMatchesKey(existing, appServerKey) ? existing : null

      const sub =
        current ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          // .buffer is a plain ArrayBuffer — satisfies BufferSource across TS lib versions
          applicationServerKey: appServerKey.buffer as ArrayBuffer,
        }))

      const res = await fetch(`${PUSH_API_BASE}/api/push/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: toJSON(sub) }),
      })
      if (!res.ok) throw new Error(`subscribe failed (${res.status})`)
      setState('subscribed')
    } catch (err) {
      setError((err as Error).message)
      setState('error')
    }
  }, [supported])

  const sendTest = useCallback(async () => {
    setError(null)
    setTestSent(false)
    try {
      const reg = await getRegistration()
      const sub = await reg.pushManager.getSubscription()
      if (!sub) throw new Error('not subscribed')
      const res = await fetch(`${PUSH_API_BASE}/api/push/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: toJSON(sub) }),
      })
      if (!res.ok) throw new Error(`test failed (${res.status})`)
      setTestSent(true)
    } catch (err) {
      setError((err as Error).message)
    }
  }, [])

  return { state, testSent, error, enable, sendTest }
}
