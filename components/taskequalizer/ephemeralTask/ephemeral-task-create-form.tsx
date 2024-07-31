import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EphemeralTaskInSchema, EphemeralTaskValuePossibles } from "@/lib/schema/ephemeral-tasks"
import { ephemeralTasksService } from "@/lib/services/ephemeral-tasks"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const EphemeralTaskCreateForm = ({ setIsFormOpen }: { setIsFormOpen: (value: boolean) => void }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("ephemeral-task-create-form")
  const form = useForm<z.infer<typeof EphemeralTaskInSchema>>({
    resolver: zodResolver(EphemeralTaskInSchema),
    defaultValues: {
      ephemeral_task_name: "",
      description: "",
      value: 1,
    },
  })

  const mutation = useMutation({
    mutationFn: ephemeralTasksService.createEphemeralTask,
    onSuccess: (data) => {
      if ("message" in data) {
        toast.error(data.message)
        setIsFormOpen(false)
        return
      }

      queryClient.invalidateQueries({ queryKey: ["ephemeralTasks"] })
      setIsFormOpen(false)
      toast.success(scopedT("create.success-message"))
    },
    onError: () => {
      toast.error(scopedT("create.error-message"))
    },
  })

  const onSubmit = async (formData: z.infer<typeof EphemeralTaskInSchema>) => {
    mutation.mutate(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ephemeral_task_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("ephemeral_task_name_field")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("description_field")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
            <FormItem>
              <Select onValueChange={(value) => form.setValue("value", parseInt(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={scopedT("value_field")} />
                </SelectTrigger>
                <SelectContent>
                  {EphemeralTaskValuePossibles.map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
            <Button type="submit" className="w-full">
              {scopedT("button_label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
