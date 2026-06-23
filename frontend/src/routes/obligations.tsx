import {
  obligationsQueryKey,
  obligationsQueryOptions,
  updateObligationStatusMutationOptions,
} from '#/queries/obligations'
import { legalActsQueryOptions } from '#/queries/legal-acts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { LegalAct, Obligation } from '#/types/Interfaces'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import { ChevronDownIcon, ShieldAlertIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { CreateObligationDialog } from '#/components/CreateObligationDialog'

export const Route = createFileRoute('/Obligations')({
  validateSearch: (search: Record<string, unknown>) => ({
    short: typeof search.short === 'string' ? search.short : undefined,
  }),
  component: RouteComponent,
})

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In progress',
    done: 'Done',
  }
  return labels[status] ?? status
}

function groupByShort(obligations: Obligation[]) {
  const groups = new Map<string, Obligation[]>()

  for (const obligation of obligations) {
    const group = groups.get(obligation.legalActTitleShort) ?? []
    group.push(obligation)
    groups.set(obligation.legalActTitleShort, group)
  }

  return groups
}

function RouteComponent() {
  const { short } = Route.useSearch()
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(obligationsQueryOptions())
  const { data: legalActs } = useQuery(legalActsQueryOptions())
  const { mutate: updateStatus, isPending } = useMutation({
    ...updateObligationStatusMutationOptions(),
    onSuccess: (updatedObligations) => {
      queryClient.setQueryData(obligationsQueryKey, updatedObligations)
    },
  })

  const groups = useMemo(() => groupByShort(data ?? []), [data])

  const orderedShorts = useMemo(() => {
    const shortsInData = [...groups.keys()]

    if (!legalActs?.length) return shortsInData

    const fromLegalActs = legalActs
      .map((act: LegalAct) => act.titleShort)
      .filter((titleShort: string) => groups.has(titleShort))

    const remaining = shortsInData.filter(
      (titleShort) => !fromLegalActs.includes(titleShort),
    )

    return [...fromLegalActs, ...remaining]
  }, [groups, legalActs])

  const visibleShorts = short
    ? orderedShorts.filter((titleShort) => titleShort === short)
    : orderedShorts

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

  if (short && visibleShorts.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <p>No obligations found for {short}.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-10 px-4 pb-12">
      <div className="flex justify-end">
        <CreateObligationDialog legalActs={legalActs ?? []} />
      </div>
      {visibleShorts.map((titleShort) => (
        <section key={titleShort} id={titleShort} className="flex flex-col gap-3 scroll-mt-24">
          <h2 className="text-lg font-semibold tracking-tight">{titleShort}</h2>
          <ul className="flex flex-col gap-2">
            {groups.get(titleShort)?.map((obligation) => (
              <li key={obligation.title}>
                <Item variant="outline">
                  <ItemMedia variant="icon">
                    <ShieldAlertIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{obligation.title}</ItemTitle>
                    <ItemDescription>{obligation.description}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" disabled={isPending} className="gap-1.5">
                            <span>{formatStatus(obligation.status)}</span>
                            <ChevronDownIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({ id: obligation.id, status: 'open' })
                            }
                          >
                            {formatStatus('open')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({ id: obligation.id, status: 'in_progress' })
                            }
                          >
                            {formatStatus('in_progress')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({ id: obligation.id, status: 'done' })
                            }
                          >
                            {formatStatus('done')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </ItemActions>
                </Item>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
