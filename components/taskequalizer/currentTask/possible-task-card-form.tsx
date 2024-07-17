"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PossibleTask } from "@/lib/schema/possible-task"
import { taskService } from "@/lib/services/task"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const PossibleTaskCardForm = ({ possibleTask }: { possibleTask: PossibleTask }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("possible-task-card-form")

  const mutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentTask"] })
      toast.info(scopedT("success-message"))
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  return (
    <Card className="min-w-[280px]">
      <CardHeader>
        <CardTitle>{possibleTask.possible_task_name}</CardTitle>
        <CardDescription>{possibleTask.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => mutation.mutate({ related_possible_task_id: possibleTask.id })}>Lancer la tache</Button>
      </CardContent>
    </Card>
  )
}
