declare module 'webpush-webcrypto' {
  export class ApplicationServerKeys {
    static fromJSON(json: { publicKey: string; privateKey: string }): Promise<ApplicationServerKeys>
  }
  
  export function generatePushHTTPRequest(options: {
    applicationServerKeys: ApplicationServerKeys
    payload: string
    target: any
    adminContact: string
    ttl?: number
    urgency?: string
  }): Promise<{ headers: HeadersInit; body: string; endpoint: string }>
}
