import { z } from 'zod'

export const obligationStatusSchema = z.enum(['open', 'in_progress', 'done'])

export const createObligationSchema = z.object({
  title: z.string().trim().min(1, 'Titel ist benötigt'),
  legalActTitleShort: z.string().min(1, 'Rechtsnorm ist benötigt'),
  description: z.string().trim().min(1, 'Beschreibung ist benötigt'),
  status: obligationStatusSchema,
})