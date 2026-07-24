import { useState } from 'react'

function App() {
  const [adminKey, setAdminKey] = useState('')
  const [title, setTitle] = useState('KoreanLife')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('/')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Sending...')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
      const response = await fetch(`${apiUrl}/api/push/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({ title, body, url })
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        setStatus(`Error: ${err.error || response.statusText}`)
      } else {
        const data = await response.json()
        setStatus(`Success! Sent: ${data.success}, Failed: ${data.failed}`)
      }
    } catch (err) {
      setStatus(`Network error: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>KoreanLife Admin</h1>
      <p>Broadcast push notifications to all users.</p>

      <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Admin Key</label>
          <input 
            type="password" 
            value={adminKey} 
            onChange={e => setAdminKey(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Notification Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Notification Body</label>
          <textarea 
            value={body} 
            onChange={e => setBody(e.target.value)} 
            required 
            rows={4}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Action URL (Optional)</label>
          <input 
            type="text" 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', background: '#FF4D67', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Sending...' : 'Broadcast Push Message'}
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Status:</strong> {status}
        </div>
      )}
    </div>
  )
}

export default App
