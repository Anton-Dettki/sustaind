import { api } from './client'
import { type LegalAct } from '#/types/Interfaces'

export function fetchLegalActs() {
  return api<LegalAct[]>('/legal-acts')
}