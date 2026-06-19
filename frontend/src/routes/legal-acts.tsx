import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { FilterBar } from '#/components/FilterBar'
import { LegalActItem } from '#/components/LegalActItem'
import { filterLegalActs, getEnactmentYears } from '#/lib/legal-acts'
import { parseLegalActsSearch } from '#/lib/validators/legal-acts-search'
import { legalActsQueryOptions } from '#/queries/legal-acts'
import type { Jurisdiction } from '#/utils/Types'

export const Route = createFileRoute('/Legal-acts')({
  validateSearch: parseLegalActsSearch,
  component: LegalActsPage,
})

function LegalActsPage() {
  const { jurisdiction, year } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data, isLoading, error } = useQuery(legalActsQueryOptions())

  const enactmentYears = useMemo(() => getEnactmentYears(data ?? []), [data])

  const filteredActs = useMemo(
    () => filterLegalActs(data ?? [], jurisdiction, year),
    [data, jurisdiction, year],
  )

  function clearFilters() {
    navigate({ search: { jurisdiction: undefined, year: undefined } })
  }

  function setJurisdiction(next: Jurisdiction | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        jurisdiction: next,
      }),
    })
  }

  function setYear(next: string | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        year: next,
      }),
    })
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p>Loading…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p>Error: {error.message}</p>
      </main>
    )
  }

  return (
    <main className="mx-auto mt-10 flex min-h-[60vh] w-full max-w-2xl flex-col px-4 pb-12">
      <FilterBar
        jurisdiction={jurisdiction}
        year={year}
        years={enactmentYears}
        onJurisdictionChange={setJurisdiction}
        onYearChange={setYear}
        onClear={clearFilters}
      />

      {filteredActs.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          Keine Rechtsnormen für die gewählten Filter gefunden.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredActs.map((act) => (
            <LegalActItem key={act.title} act={act} />
          ))}
        </ul>
      )}
    </main>
  )
}
