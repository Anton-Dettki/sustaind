import { api } from './client'

export interface LegalAct {
    title: string;
    titleShort: string;
    jurisdiction: string;
    enactmentDate: string;
  }

export function fetchLegalActs() {
  return api<LegalAct[]>('/legal-acts')
}