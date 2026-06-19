import { queryOptions } from '@tanstack/react-query'
import { fetchObligations } from '#/lib/api/obligations'

export const obligationsQueryOptions = () =>
  queryOptions({
    queryKey: ['obligations'],
    queryFn: fetchObligations,
  })