import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Textarea } from '#/components/ui/textarea'
import {
  createObligationSchema,
  type CreateObligationInput,
} from '#/lib/validators/obligation'
import {
  createObligationMutationOptions,
  obligationsQueryKey,
} from '#/queries/obligations'
import { type LegalAct } from '#/utils/Interfaces'
import { type CreateObligationDialogProps } from '#/utils/Types'

const statusLabels: Record<CreateObligationInput['status'], string> = {
  open: 'Offen',
  in_progress: 'In Bearbeitung',
  done: 'Erledigt',
}

function getDefaultValues(legalActs: LegalAct[]): CreateObligationInput {
  return {
    title: '',
    legalActTitleShort: legalActs[0]?.titleShort ?? 'BImSchG',
    description: '',
    status: 'open',
  }
}

export function CreateObligationDialog({ legalActs }: CreateObligationDialogProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<CreateObligationInput>({
    resolver: zodResolver(createObligationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: getDefaultValues(legalActs),
  })

  const { mutate, isPending, error: submitError } = useMutation({
    ...createObligationMutationOptions(),
    onSuccess: (updatedObligations) => {
      queryClient.setQueryData(obligationsQueryKey, updatedObligations)
      setOpen(false)
      form.reset(getDefaultValues(legalActs))
    },
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      form.reset(getDefaultValues(legalActs))
    }
  }

  function onSubmit(values: CreateObligationInput) {
    mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <PlusIcon />
          Neue Pflicht
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neue Pflicht erstellen</DialogTitle>
          <DialogDescription>
            Füllen Sie alle Felder aus, um eine neue Pflicht anzulegen.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-0 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. Emissionsüberwachung einrichten" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="legalActTitleShort"
              render={({ field }) => {
                const selectedAct = legalActs.find(
                  (act) => act.titleShort === field.value,
                )

                return (
                  <FormItem>
                    <FormLabel>Rechtsnorm</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full min-w-0">
                          <SelectValue placeholder="Rechtsnorm wählen">
                            {selectedAct?.titleShort}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        className="max-w-[var(--radix-select-trigger-width)]"
                      >
                        {legalActs.map((act) => (
                          <SelectItem
                            key={act.titleShort}
                            value={act.titleShort}
                            className="whitespace-normal"
                          >
                            <span className="flex flex-col gap-0.5 py-0.5">
                              <span className="font-medium">{act.titleShort}</span>
                              <span className="text-xs leading-snug text-muted-foreground">
                                {act.title}
                              </span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschreibung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Was muss erledigt werden?"
                      className="min-h-24 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue placeholder="Status wählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Object.keys(statusLabels) as CreateObligationInput['status'][]).map(
                        (status) => (
                          <SelectItem key={status} value={status}>
                            {statusLabels[status]}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError ? (
              <p className="text-sm text-destructive">{submitError.message}</p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Abbrechen
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Wird erstellt…' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
