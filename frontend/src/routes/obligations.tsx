import { obligationsQueryOptions } from '#/queries/obligations'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type Obligation } from '#/utils/interfaces'

export const Route = createFileRoute('/obligations')({
  validateSearch: (search: Record<string, unknown>) => ({
    short: typeof search.short === 'string' ? search.short : undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { short } = Route.useSearch()
  const { data, isLoading, error } = useQuery(obligationsQueryOptions())

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  const obligations = short
    ? data?.filter((obligation: Obligation) => obligation.legalActTitleShort === short)
    : data

  return (
    <ul>
      {obligations?.map((obligation: Obligation) => (
        <li key={obligation.title}>{obligation.title}</li>
      ))}
    </ul>
  )
}
