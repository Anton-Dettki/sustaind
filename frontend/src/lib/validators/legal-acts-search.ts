import type { LegalActsSearch } from '#/utils/Types'

export function parseLegalActsSearch(search: Record<string, unknown>): LegalActsSearch {
  return {
    jurisdiction:
      search.jurisdiction === 'DE' || search.jurisdiction === 'EU'
        ? search.jurisdiction
        : undefined,
    year:
      typeof search.year === 'string' && /^\d{4}$/.test(search.year)
        ? search.year
        : undefined,
  }
}
