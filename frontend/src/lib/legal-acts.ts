import type { LegalAct } from '#/utils/Interfaces'
import type { Jurisdiction } from '#/utils/Types'

export function filterLegalActs(
  acts: LegalAct[],
  jurisdiction?: Jurisdiction,
  year?: string,
) {
  return acts.filter((act) => {
    if (jurisdiction && act.jurisdiction !== jurisdiction) return false
    if (year && act.enactmentDate.slice(0, 4) < year) return false
    return true
  })
}

export function getEnactmentYears(acts: LegalAct[]): string[] {
  const years = acts.map((act) => act.enactmentDate.slice(0, 4))
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
}
