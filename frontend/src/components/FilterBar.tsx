import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { cn } from '#/lib/utils'
import { type FilterBarProps } from '#/types/Types'

export function FilterBar({
  jurisdiction,
  year,
  years,
  onJurisdictionChange,
  onYearChange,
  onClear,
  className,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(jurisdiction || year)

  return (
    <section className={cn('mb-6 rounded-xl border bg-card p-4 shadow-sm', className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight">Filter</h2>
        {hasActiveFilters ? (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Zurücksetzen
          </Button>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="jurisdiction-filter">Land</Label>
            <Select
              value={jurisdiction ?? 'all'}
              onValueChange={(value) =>
                onJurisdictionChange(value === 'all' ? undefined : (value as 'DE' | 'EU'))
              }
            >
              <SelectTrigger id="jurisdiction-filter" className="w-full min-w-0">
                <SelectValue placeholder="Alle Länder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Länder</SelectItem>
                <SelectItem value="DE">Deutschland (DE)</SelectItem>
                <SelectItem value="EU">EU</SelectItem>
              </SelectContent>
            </Select>
          </div>
        
          <div className="grid gap-2">
            <Label htmlFor="year-filter">Ab Jahr</Label>
            <Select
              value={year ?? 'all'}
              onValueChange={(value) => onYearChange(value === 'all' ? undefined : value)}
            >
              <SelectTrigger id="year-filter" className="w-full min-w-0">
                <SelectValue placeholder="Alle Jahre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Jahre</SelectItem>
                {years.map((enactmentYear) => (
                  <SelectItem key={enactmentYear} value={enactmentYear}>
                    {enactmentYear}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </div>
    </section>
  )
}
