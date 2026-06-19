import { api } from './client'
import { type Obligation } from '#/utils/interfaces'

export function fetchObligations() {
    return api<Obligation[]>('/obligations')
}

export function updateObligationStatus(title: string, status: string) {
  return api<Obligation[]>(`/obligations/${encodeURIComponent(title)}`, {
    method: 'PATCH',
    body: { status },
  })
}