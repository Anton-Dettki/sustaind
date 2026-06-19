import { Button } from '#/components/ui/button'
import { obligationsQueryOptions } from '#/queries/obligations'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type Obligation } from '#/utils/interfaces'

export const Route = createFileRoute('/obligations')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error, refetch, isFetching } = useQuery(obligationsQueryOptions())

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Reloading…' : 'Reload'}
      </Button>
      <ul>
        {data?.map((obligation: Obligation) => (
          <li key={obligation.title}>{obligation.title}</li>
        ))}
      </ul>
    </>
  )
}
