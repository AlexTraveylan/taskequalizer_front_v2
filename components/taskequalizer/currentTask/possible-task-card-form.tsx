"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PossibleTask } from "@/lib/schema/possible-task"
import { taskService } from "@/lib/services/task"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const PossibleTaskCardForm = ({ possibleTask }: { possibleTask: PossibleTask }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentTask"] })
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
