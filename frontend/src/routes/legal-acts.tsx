import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { legalActsQueryOptions } from '#/queries/legal-acts'
import { type LegalAct } from '#/utils/interfaces'
import { ShieldAlertIcon, ArrowRightIcon } from 'lucide-react'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '#/components/ui/item'
import { Button } from '#/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'

export const Route = createFileRoute('/legal-acts')({
  component: LegalActsPage,
})

function LegalActsPage() {
  const { data, isLoading, error } = useQuery(legalActsQueryOptions())

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
    <main className="flex min-h-[60vh] justify-center px-4 mt-10">
      <ul className="flex w-full max-w-lg flex-col gap-2">
        {data?.map((act: LegalAct) => (
          <Item
            key={act.title}
            variant="outline"
          >
            <ItemMedia variant="icon">
              <ShieldAlertIcon/>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {act.title}
              </ItemTitle>
              <ItemDescription>
                <span className="flex items-center gap-2">
                  <Avatar size="sm">
                    {act.jurisdiction === 'DE' && (
                      <><AvatarImage src="/flags/germany.png" /><AvatarFallback>DE</AvatarFallback></>
                    )}
                    {act.jurisdiction === 'EU' && (
                      <><AvatarImage src="/flags/eu.png" /><AvatarFallback>EU</AvatarFallback></>
                    )}
                  </Avatar>

                  {act.jurisdiction} <span className="text-muted-foreground">({act.enactmentDate})</span>
                </span>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" asChild>
                <Link
                  to="/obligations"
                  search={{ short: act.titleShort }}
                >
                  View Obligations <ArrowRightIcon />
                </Link>
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ul>
    </main>
  )
}