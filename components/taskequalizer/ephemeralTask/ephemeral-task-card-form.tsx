"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EphemeralTask } from "@/lib/schema/ephemeral-tasks"
import { ephemeralTasksService } from "@/lib/services/ephemeral-tasks"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import { toast } from "sonner"

export const EphemeralTaskCardForm = ({ ephemeralTask }: { ephemeralTask: EphemeralTask }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("ephemeral-task-card-form")

  const completMutation = useMutation({
    mutationFn: ephemeralTasksService.completeEphemeralTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ephemeralTasks"] })
      toast.info(scopedT("complete.success-message"))
    },
    onError: () => {
      toast.error(scopedT("complete.error-message"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: ephemeralTasksService.deleteEphemeralTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ephemeralTasks"] })
      toast.warning(scopedT("delete.success-message"))
    },
    onError: () => {
      toast.error(scopedT("delete.error-message"))
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
      <CardFooter className="justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="cursor-pointer text-destructive" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{scopedT("alert_delete_title")}</AlertDialogTitle>
              <AlertDialogDescription>{scopedT("alert_delete_description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{scopedT("alert_delete_cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMutation.mutate(ephemeralTask.id)} className="cursor-pointer">
                {scopedT("alert_delete_confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
