"use client"

import { DisplayPossibleTasks } from "@/components/settings/display-p-tasks"
import { PossibleTaskForm } from "@/components/settings/possible-task-form"
import { taskEqualizerNavItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import { Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PossibleTasksPage() {
  const router = useRouter()
  const scopedT = useScopedI18n("possible-task-page")

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">{scopedT("title")}</h1>
      <div className="flex gap-3 cursor-pointer" onClick={() => router.push(taskEqualizerNavItems.currentTask.href)}>
        <Rocket />
        <span className="text-sm text-muted-foreground">{scopedT("begin")}</span>
      </div>
      <DisplayPossibleTasks />
      <PossibleTaskForm />
    </div>
  )
}
