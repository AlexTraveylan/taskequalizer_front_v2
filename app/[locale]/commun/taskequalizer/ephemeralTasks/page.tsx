"use client"

import { EphemeralTaskCardForm } from "@/components/taskequalizer/ephemeralTask/ephemeral-task-card-form"
import { InputSearch } from "@/components/ui/search-input"
import { ephemeralTasksService } from "@/lib/services/ephemeral-tasks"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function EphemeralTaskPage() {
  const { data, isError, isLoading } = useQuery({ queryKey: ["family"], queryFn: ephemeralTasksService.getAllEphemeralTasksForFamily })
  const [filterKey, setFilterKey] = useState<string>("")
  const scopedT = useScopedI18n("ephemeral-task-page")

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError) {
    return <>Error...</>
  }

  if (!data) {
    return <>No data...</>
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5 flex-wrap">
        <h1 className="text-3xl font-semibold">{scopedT("title")}</h1>
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
      <div className="flex flex-wrap gap-3 py-5">
        {data
          .filter((ephemeralTask) => ephemeralTask.ephemeral_task_name.toLowerCase().includes(filterKey.toLowerCase()))
          .map((ephemeralTask, index) => (
            <EphemeralTaskCardForm key={`${ephemeralTask.id}eTaskCard${index}`} ephemeralTask={ephemeralTask} />
          ))}
      </div>
    </div>
  )
}
