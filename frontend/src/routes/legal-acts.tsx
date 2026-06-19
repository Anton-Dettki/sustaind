import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { legalActsQueryOptions } from '#/queries/legal-acts'
import type { LegalAct } from '#/lib/api/legal-acts'

export const Route = createFileRoute('/legal-acts')({
  component: LegalActsPage,
})

function LegalActsPage() {
  const { data, isLoading, error } = useQuery(legalActsQueryOptions())

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.map((act: LegalAct) => (
        <li key={act.title}>{act.title}</li>
      ))}
    </ul>
  )
}