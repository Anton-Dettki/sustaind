import { queryOptions } from '@tanstack/react-query'
import { fetchLegalActs } from '#/lib/api/legal-acts'

export const legalActsQueryOptions = () =>
  queryOptions({
    queryKey: ['legal-acts'],
    queryFn: fetchLegalActs,
  })