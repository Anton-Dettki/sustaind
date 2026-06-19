import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { createObligation, fetchObligations, updateObligationStatus } from '#/lib/api/obligations'

export const obligationsQueryKey = ['obligations'] as const

export const obligationsQueryOptions = () =>
  queryOptions({
    queryKey: obligationsQueryKey,
    queryFn: fetchObligations,
  })

export const updateObligationStatusMutationOptions = () =>
  mutationOptions({
    mutationFn: ({ title, status }: { title: string; status: string }) =>
      updateObligationStatus(title, status),
  })

export const createObligationMutationOptions = () =>
  mutationOptions({
    mutationFn: ({ title, legalActTitleShort, description, status }: { title: string; legalActTitleShort: string; description: string; status: string }) =>
      createObligation(title, legalActTitleShort, description, status),
  })