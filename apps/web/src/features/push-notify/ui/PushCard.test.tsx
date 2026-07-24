import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import { VAPID_PUBLIC_KEY } from '../config'
import { urlBase64ToUint8Array } from '../lib/vapid'
import { PushCard } from './PushCard'

// Bytes of the app's current VAPID key — a subscription made with these
// "matches"; anything else simulates a subscription from a rotated key.
const CURRENT_KEY = urlBase64ToUint8Array(VAPID_PUBLIC_KEY).buffer
const STALE_KEY = new Uint8Array([9, 9, 9]).buffer

// --- browser API fakes ---
function installPushEnv(
  opts: {
    permission?: NotificationPermission
    grants?: NotificationPermission
    existing?: boolean
    staleKey?: boolean
  } = {},
) {
  const subscription = {
    toJSON: () => ({ endpoint: 'https://push/abc', keys: { p256dh: 'p', auth: 'a' } }),
    options: { applicationServerKey: opts.staleKey ? STALE_KEY : CURRENT_KEY },
    unsubscribe: vi.fn(async () => true),
  }
  const pushManager = {
    getSubscription: vi.fn(async () => (opts.existing ? subscription : null)),
    subscribe: vi.fn(async () => subscription),
  }
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: { ready: Promise.resolve({ pushManager }) },
  })
  Object.defineProperty(window, 'PushManager', { configurable: true, value: function () {} })
  const requestPermission = vi.fn(async () => opts.grants ?? opts.permission ?? 'granted')
  Object.defineProperty(window, 'Notification', {
    configurable: true,
    value: Object.assign(function () {}, {
      permission: opts.permission ?? 'default',
      requestPermission,
    }),
  })
  return { pushManager, requestPermission }
}

function renderCard() {
  return render(
    <LanguageProvider dict={dictionary}>
      <PushCard />
    </LanguageProvider>,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('PushCard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an unsupported message when push APIs are missing', () => {
    // @ts-expect-error force-remove for this test
    delete navigator.serviceWorker
    renderCard()
    expect(screen.getByText(/doesn.t support|지원하지/i)).toBeInTheDocument()
  })

  it('enables notifications: requests permission, subscribes, posts to the API', async () => {
    const { requestPermission, pushManager } = installPushEnv({
      permission: 'default',
      grants: 'granted',
    })
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 201 }))

    renderCard()
    await screen.findByRole('button', { name: /Turn on|알림 켜기/i })
    await userEvent.click(screen.getByRole('button', { name: /Turn on|알림 켜기/i }))

    await waitFor(() => expect(requestPermission).toHaveBeenCalled())
    await waitFor(() => expect(pushManager.subscribe).toHaveBeenCalled())
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/push/subscribe'),
      expect.objectContaining({ method: 'POST' }),
    )
    // now subscribed → test button appears
    await screen.findByRole('button', { name: /Send a test|테스트/i })
  })

  it('shows "turn on" (not test) when the existing subscription used a rotated key', async () => {
    installPushEnv({ permission: 'granted', existing: true, staleKey: true })
    renderCard()
    // stale key → treated as not-usable → prompts to (re)enable
    await screen.findByRole('button', { name: /Turn on|알림 켜기/i })
    expect(screen.queryByRole('button', { name: /Send a test|테스트/i })).not.toBeInTheDocument()
  })

  it('re-subscribes with the current key when the old one was rotated', async () => {
    const { pushManager } = installPushEnv({
      permission: 'granted',
      existing: true,
      staleKey: true,
    })
    const sub = (await pushManager.getSubscription())!
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 201 }))

    renderCard()
    await userEvent.click(await screen.findByRole('button', { name: /Turn on|알림 켜기/i }))

    // old subscription dropped, then a fresh subscribe with the current key
    await waitFor(() => expect(sub.unsubscribe).toHaveBeenCalled())
    expect(pushManager.subscribe).toHaveBeenCalled()
    await screen.findByRole('button', { name: /Send a test|테스트/i })
  })

  it('sends a test push when already subscribed', async () => {
    installPushEnv({ permission: 'granted', existing: true })
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))

    renderCard()
    const testBtn = await screen.findByRole('button', { name: /Send a test|테스트/i })
    await userEvent.click(testBtn)

    await waitFor(() =>
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/push/test'),
        expect.objectContaining({ method: 'POST' }),
      ),
    )
    expect(screen.getByText(/Test notification sent|테스트 알림/i)).toBeInTheDocument()
  })

  it('shows a blocked message when permission is denied', async () => {
    installPushEnv({ permission: 'denied' })
    renderCard()
    await waitFor(() => expect(screen.getByText(/blocked|차단/i)).toBeInTheDocument())
  })
})
