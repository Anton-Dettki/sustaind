import { api } from './client'
import type { Obligation } from '#/types/Interfaces'

export function fetchObligations() {
    return api<Obligation[]>('/obligations')
}

export function updateObligationStatus(id: string, status: string) {
  return api<Obligation[]>(`/obligations/${encodeURIComponent(id)}`, {
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