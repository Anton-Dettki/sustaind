import { api } from './client'
import { type LegalAct } from '#/utils/Interfaces'

export function fetchLegalActs() {
  return api<LegalAct[]>('/legal-acts')
}