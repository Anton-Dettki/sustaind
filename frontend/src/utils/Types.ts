import type { LegalAct } from "./Interfaces"
import type { ReactNode } from "react"

export type CreateObligationDialogProps = {
    legalActs: LegalAct[]
  }

export type Jurisdiction = 'DE' | 'EU'

export type FilterBarProps = {
  jurisdiction?: Jurisdiction
  year?: string
  years: string[]
  onJurisdictionChange: (jurisdiction: Jurisdiction | undefined) => void
  onYearChange: (year: string | undefined) => void
  onClear: () => void
  showJurisdiction?: boolean
  showYear?: boolean
  className?: string
  children?: ReactNode
}

export type LegalActItemProps = {
  act: LegalAct
}

export type LegalActsSearch = {
  jurisdiction?: Jurisdiction
  year?: string
}

export type JurisdictionBadgeProps = {
  jurisdiction: string
  enactmentDate?: string
}