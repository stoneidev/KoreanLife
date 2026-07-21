import { describe, expect, it } from 'vitest'
import { parseListLimit, validateDeviceId, validateNewPost, validateNewReply } from './validate'

describe('validateDeviceId', () => {
  it('accepts opaque client tokens', () => {
    const r = validateDeviceId('device_abc123XYZ')
    expect(r.ok).toBe(true)
  })

  it('rejects missing or short ids', () => {
    expect(validateDeviceId(undefined).ok).toBe(false)
    expect(validateDeviceId('short').ok).toBe(false)
  })
})

describe('validateNewPost', () => {
  it('accepts a valid post', () => {
    const r = validateNewPost({
      title: 'How to get a bank account?',
      body: 'I just arrived in Seoul…',
      authorName: 'Alex',
      lang: 'en',
    })
    expect(r.ok).toBe(true)
  })

  it('rejects empty title/body/author', () => {
    expect(validateNewPost({ title: '', body: 'x', authorName: 'a' }).ok).toBe(false)
    expect(validateNewPost({ title: 't', body: '', authorName: 'a' }).ok).toBe(false)
    expect(validateNewPost({ title: 't', body: 'b', authorName: '' }).ok).toBe(false)
  })

  it('rejects oversized fields', () => {
    expect(
      validateNewPost({ title: 't'.repeat(200), body: 'b', authorName: 'a' }).ok,
    ).toBe(false)
  })
})

describe('validateNewReply', () => {
  it('accepts a valid reply', () => {
    expect(validateNewReply({ body: 'Try a global bank first', authorName: 'Sam' }).ok).toBe(true)
  })

  it('rejects empty body', () => {
    expect(validateNewReply({ body: '  ', authorName: 'Sam' }).ok).toBe(false)
  })
})

describe('parseListLimit', () => {
  it('clamps to bounds', () => {
    expect(parseListLimit(undefined)).toBe(20)
    expect(parseListLimit('0')).toBe(1)
    expect(parseListLimit('999')).toBe(50)
  })
})
