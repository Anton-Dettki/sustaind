const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

export async function api<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`)
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
}