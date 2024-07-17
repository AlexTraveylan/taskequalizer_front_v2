"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { possibleTaskInSchema } from "@/lib/schema/possible-task"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const PossibleTaskForm = () => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("possible-task-form")
  const form = useForm<z.infer<typeof possibleTaskInSchema>>({
    resolver: zodResolver(possibleTaskInSchema),
    defaultValues: {
      possible_task_name: "",
      description: "",
    },
  })

  const onSubmit = async (formData: z.infer<typeof possibleTaskInSchema>) => {
    mutation.mutate(formData)
  }

  const mutation = useMutation({
    mutationFn: possibleTaskService.createPossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
      toast.success(scopedT("success-message"))
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

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
              name="possible_task_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("task_name_field")}</FormLabel>
                  <FormControl>
                    <Input placeholder={scopedT("placeholder_name")} {...field} />
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
            <Button type="submit" className="w-full">
              {scopedT("button_label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
