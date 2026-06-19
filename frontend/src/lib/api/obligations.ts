import { api } from './client'
import { type Obligation } from '#/utils/Interfaces'

export function fetchObligations() {
    return api<Obligation[]>('/obligations')
}

export function updateObligationStatus(title: string, status: string) {
  return api<Obligation[]>(`/obligations/${encodeURIComponent(title)}`, {
    method: 'PATCH',
    body: { status },
  })
}

export function createObligation(title: string, legalActTitleShort: string, description: string, status: string) {
  return api<Obligation[]>(`/obligations/create`, {
    method: 'POST',
    body: { title, legalActTitleShort, description, status },
  })
}