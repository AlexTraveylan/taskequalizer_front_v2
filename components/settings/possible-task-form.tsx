"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const PossibleTaskForm = () => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("possible-task-form")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const possible_task_name = form.get("possible_task_name") as string
    const description = form.get("description") as string

    if (!possible_task_name || !description) {
      return
    }
    mutation.mutate({ possible_task_name, description })
  }

  const mutation = useMutation({
    mutationFn: possibleTaskService.createPossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="possible_task_name">{scopedT("task_name_field")}</Label>
              <Input
                key="possible_task_name"
                id="possible_task_name"
                name="possible_task_name"
                type="text"
                placeholder={scopedT("placeholder_name")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{scopedT("description_field")}</Label>
              <Input key="possible_task_description" id="description" name="description" type="text" required />
            </div>
            <Button type="submit" className="w-full">
              {scopedT("button_label")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
