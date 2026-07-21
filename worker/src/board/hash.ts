/** SHA-256 hex of a client device id — never store the raw id. */
export async function hashDeviceId(deviceId: string): Promise<string> {
  const data = new TextEncoder().encode(deviceId)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(digest)
  let hex = ''
  for (const b of bytes) hex += b.toString(16).padStart(2, '0')
  return hex
}
