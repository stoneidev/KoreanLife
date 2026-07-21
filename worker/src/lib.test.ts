import { describe, expect, it } from 'vitest'
import { corsHeaders, validateSubscription } from './lib'

describe('validateSubscription', () => {
  const valid = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/abc',
    keys: { p256dh: 'BKxxx', auth: 'authtoken' },
  }

  it('accepts a well-formed subscription', () => {
    const r = validateSubscription(valid)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value.endpoint).toBe(valid.endpoint)
      expect(r.value.keys.p256dh).toBe('BKxxx')
    }
  })

  it('rejects a non-object', () => {
    expect(validateSubscription(null).ok).toBe(false)
    expect(validateSubscription('nope').ok).toBe(false)
  })

  it('rejects a non-https or non-string endpoint', () => {
    expect(validateSubscription({ ...valid, endpoint: 'http://x' }).ok).toBe(false)
    expect(validateSubscription({ ...valid, endpoint: 123 }).ok).toBe(false)
  })

  it('rejects missing keys', () => {
    expect(validateSubscription({ endpoint: valid.endpoint }).ok).toBe(false)
    expect(validateSubscription({ ...valid, keys: { p256dh: 'x' } }).ok).toBe(false)
    expect(validateSubscription({ ...valid, keys: { auth: 'x' } }).ok).toBe(false)
  })

  it('rejects a suspiciously long endpoint (abuse guard)', () => {
    expect(validateSubscription({ ...valid, endpoint: 'https://' + 'a'.repeat(3000) }).ok).toBe(
      false,
    )
  })
})

describe('corsHeaders', () => {
  it('echoes the allowed origin', () => {
    const h = corsHeaders('https://koreanlife.pages.dev')
    expect(h['Access-Control-Allow-Origin']).toBe('https://koreanlife.pages.dev')
    expect(h['Access-Control-Allow-Methods']).toContain('POST')
  })

  it('falls back to * when no origin configured', () => {
    expect(corsHeaders(undefined)['Access-Control-Allow-Origin']).toBe('*')
  })
})
