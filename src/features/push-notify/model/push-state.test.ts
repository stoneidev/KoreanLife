import { describe, expect, it } from 'vitest'
import { nextPushState } from './push-state'

describe('nextPushState', () => {
  it('is unsupported when the browser lacks push', () => {
    expect(nextPushState({ supported: false, permission: 'default', subscribed: false })).toBe(
      'unsupported',
    )
  })

  it('is denied when permission was blocked', () => {
    expect(nextPushState({ supported: true, permission: 'denied', subscribed: false })).toBe(
      'denied',
    )
  })

  it('is subscribed when a subscription exists and permission granted', () => {
    expect(nextPushState({ supported: true, permission: 'granted', subscribed: true })).toBe(
      'subscribed',
    )
  })

  it('is idle when supported but not yet subscribed', () => {
    expect(nextPushState({ supported: true, permission: 'default', subscribed: false })).toBe(
      'idle',
    )
    expect(nextPushState({ supported: true, permission: 'granted', subscribed: false })).toBe(
      'idle',
    )
  })
})
