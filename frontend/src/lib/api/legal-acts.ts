import { api } from './client'
import { type LegalAct } from '#/utils/interfaces'

export function fetchLegalActs() {
  return api<LegalAct[]>('/legal-acts')
}