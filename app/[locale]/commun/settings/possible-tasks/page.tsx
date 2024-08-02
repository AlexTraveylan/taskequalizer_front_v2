"use client"

import { DisplayPossibleTasks } from "@/components/settings/display-p-tasks"
import { PossibleTaskForm } from "@/components/settings/possible-task-form"
import { taskEqualizerNavItems } from "@/lib/app-types"
import { Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PossibleTasksPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8">
      <Rocket className="cursor-pointer" onClick={() => router.push(taskEqualizerNavItems.currentTask.href)} />
      <DisplayPossibleTasks />
      <PossibleTaskForm />
    </div>
  )
}
