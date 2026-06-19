import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import type { JurisdictionBadgeProps } from '#/types/Types'


export function JurisdictionBadge({ jurisdiction, enactmentDate }: JurisdictionBadgeProps) {
  return (
    <span className="flex items-center gap-2">
      <Avatar size="sm">
        {jurisdiction === 'DE' && (
          <>
            <AvatarImage src="/flags/germany.png" />
            <AvatarFallback>DE</AvatarFallback>
          </>
        )}
        {jurisdiction === 'EU' && (
          <>
            <AvatarImage src="/flags/eu.png" />
            <AvatarFallback>EU</AvatarFallback>
          </>
        )}
      </Avatar>

      {jurisdiction}
      {enactmentDate ? (
        <span className="text-muted-foreground">({enactmentDate})</span>
      ) : null}
    </span>
  )
}
