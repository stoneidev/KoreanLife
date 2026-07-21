import { describe, expect, it } from 'vitest'
import { urlBase64ToUint8Array } from './vapid'

describe('urlBase64ToUint8Array', () => {
  it('decodes a standard VAPID public key to 65 bytes', () => {
    const key = 'BF3o6m9HResNwUpkOSTc_O5Gm7-8Zpawo3rDRjWCDTEwuPvpIVGHIxAbIaSmqTFF3rdlgSfV9S-h6g1OZ3ehpMc'
    const bytes = urlBase64ToUint8Array(key)
    // uncompressed P-256 public key = 0x04 + 64 bytes
    expect(bytes).toBeInstanceOf(Uint8Array)
    expect(bytes.length).toBe(65)
    expect(bytes[0]).toBe(0x04)
  })

  it('handles url-safe chars (- and _) and missing padding', () => {
    // "??>" style bytes via url-safe alphabet
    const bytes = urlBase64ToUint8Array('-_-_')
    expect(bytes.length).toBe(3)
  })

  it('round-trips a known value', () => {
    // base64url "AQID" => [1,2,3]
    expect(Array.from(urlBase64ToUint8Array('AQID'))).toEqual([1, 2, 3])
  })
})
