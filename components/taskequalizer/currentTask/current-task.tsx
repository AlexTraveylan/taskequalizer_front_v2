"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from "@/lib/schema/task"
import { familyService } from "@/lib/services/family"
import { taskService } from "@/lib/services/task"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const CurrentTaskForm = ({ currentTask }: { currentTask: Task }) => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const scopedT = useScopedI18n("current-task")

  if (!query.data) {
    return <></>
  }

  const updateMutation = useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["currentTask"] })
    },
  })

  const currentPossibleTask = query.data.find((possibleTask) => possibleTask.id === currentTask.related_possible_task)

  const now = new Date()
  const task_stated_at = new Date(currentTask.created_at)
  const diff = now.getTime() - task_stated_at.getTime()

  const [second, setSecond] = useState(Math.floor(diff / 1000))
  const minutes = Math.floor(second / 60)
  const hours = Math.floor(minutes / 60)
  const formatedTime = `${hours} h ${minutes % 60} min ${second % 60} s`

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((second) => second + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">{scopedT("title")}</h1>
      <Card className="w-[280px]">
        <CardHeader>
          <CardTitle>{currentPossibleTask?.possible_task_name}</CardTitle>
          <CardDescription>{currentPossibleTask?.description}</CardDescription>
        </CardHeader>
        <CardContent>{formatedTime}</CardContent>
        <CardFooter>
          <Button onClick={() => updateMutation.mutate(currentTask.id)}>{scopedT("finish-btn")}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
