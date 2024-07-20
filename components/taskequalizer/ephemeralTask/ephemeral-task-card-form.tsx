"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EphemeralTask } from "@/lib/schema/ephemeral-tasks"
import { ephemeralTasksService } from "@/lib/services/ephemeral-tasks"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const EphemeralTaskCardForm = ({ ephemeralTask }: { ephemeralTask: EphemeralTask }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("ephemeral-task-card-form")

  const completMutation = useMutation({
    mutationFn: ephemeralTasksService.completeEphemeralTask,
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
        <CardTitle>{ephemeralTask.ephemeral_task_name}</CardTitle>
        <CardDescription>{ephemeralTask.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => completMutation.mutate(ephemeralTask.id)}>{scopedT("complete-etask-btn")}</Button>
      </CardContent>
    </Card>
  )
}
