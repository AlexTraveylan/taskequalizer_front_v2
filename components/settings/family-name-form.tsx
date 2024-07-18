import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { familyInSchema } from "@/lib/schema/family"
import { familyService } from "@/lib/services/family"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { DialogClose, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"

export const FamilyNameForm = ({ familyName }: { familyName: string }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("family-name-form")
  const form = useForm<z.infer<typeof familyInSchema>>({
    resolver: zodResolver(familyInSchema),
    defaultValues: {
      family_name: familyName,
    },
  })

  const mutation = useMutation({
    mutationFn: familyService.updateFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family"] })
      toast.success(scopedT("success-message"))
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  const onSubmit = async (formData: z.infer<typeof familyInSchema>) => {
    mutation.mutate(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="family_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{scopedT("task_name_field")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessageI18n />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              {scopedT("button_label")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}
