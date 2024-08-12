"use client"

import { CurrentTaskForm } from "@/components/taskequalizer/currentTask/current-task"
import NoPossibleTask from "@/components/taskequalizer/currentTask/no-possible-task"
import { PossibleTaskCardForm } from "@/components/taskequalizer/currentTask/possible-task-card-form"
import { InputSearch } from "@/components/ui/search-input"
import { settingsNavItems } from "@/lib/app-types"
import { familyService } from "@/lib/services/family"
import { taskService } from "@/lib/services/task"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CurrentTaskPage() {
  const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query2 = useQuery({ queryKey: ["currentTask"], queryFn: taskService.getCurrentTask })
  const [filterKey, setFilterKey] = useState<string>("")
  const scopedT = useScopedI18n("current-task-page")

  if (!query.data) {
    return <></>
  }

  if (query2.data) {
    return <CurrentTaskForm currentTask={query2.data} />
  }

  if (query.data.length === 0) {
    return <NoPossibleTask />
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5 flex-wrap">
        <h1 className="text-3xl font-semibold">{scopedT("title_begin_task")}</h1>
        <InputSearch
          placeholder={scopedT("search_label")}
          onChange={(e) => {
            e.preventDefault()
            setFilterKey(e.currentTarget.value)
          }}
          value={filterKey}
          className="w-[280px]"
        />
      </div>
      <Link href={settingsNavItems["possibleTasks"].href} className="flex gap-3">
        <Settings />
        <span className="text-sm text-muted-foreground">{scopedT("configuration-link-label")}</span>
      </Link>
      <div className="flex flex-wrap gap-3 py-5">
        {query.data
          .filter((possibleTask) => possibleTask.possible_task_name.toLowerCase().includes(filterKey.toLowerCase()))
          .map((possibleTask, index) => (
            <PossibleTaskCardForm key={`${possibleTask.id}pTaskCard${index}`} possibleTask={possibleTask} />
          ))}
      </div>
    </div>
  )
}
