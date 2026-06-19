import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ShieldAlertIcon } from 'lucide-react'
import { JurisdictionBadge } from '#/components/JurisdictionBadge'
import { Button } from '#/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { LegalAct } from '#/types/Interfaces'

type LegalActItemProps = {
  act: LegalAct
}

export function LegalActItem({ act }: LegalActItemProps) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{act.title}</ItemTitle>
        <ItemDescription>
          <JurisdictionBadge
            jurisdiction={act.jurisdiction}
            enactmentDate={act.enactmentDate}
          />
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" asChild>
          <Link to="/Obligations" search={{ short: act.titleShort }}>
            View Obligations <ArrowRightIcon />
          </Link>
        </Button>
      </ItemActions>
    </Item>
  )
}
