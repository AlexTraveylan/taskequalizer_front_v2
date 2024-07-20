"use client"

import { EphemeralTaskCardForm } from "@/components/taskequalizer/ephemeralTask/ephemeral-task-card-form"
import { EphemeralTaskCreateForm } from "@/components/taskequalizer/ephemeralTask/ephemeral-task-create-form"
import { InputSearch } from "@/components/ui/search-input"
import { ephemeralTasksService } from "@/lib/services/ephemeral-tasks"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { CircleMinus, CirclePlus } from "lucide-react"
import { useState } from "react"

export default function EphemeralTaskPage() {
  const { data, isError, isLoading } = useQuery({ queryKey: ["ephemeralTasks"], queryFn: ephemeralTasksService.getAllEphemeralTasksForFamily })
  const [filterKey, setFilterKey] = useState<string>("")
  const scopedT = useScopedI18n("ephemeral-task-page")
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

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
      {isFormOpen ? (
        <div className="items-center flex flex-col gap-2">
          <h2 className="text-sm text-muted-foreground">{scopedT("close_form_label")}</h2>
          <CircleMinus className="cursor-pointer mb-3" size={30} strokeWidth={1.3} onClick={() => setIsFormOpen(false)} />
          <EphemeralTaskCreateForm setIsFormOpen={setIsFormOpen} />
        </div>
      ) : (
        <div className="items-center flex flex-col gap-2">
          <h2 className="text-sm text-muted-foreground">{scopedT("open_form_label")}</h2>
          <CirclePlus className="cursor-pointer" size={30} strokeWidth={1.3} onClick={() => setIsFormOpen(true)} />
        </div>
      )}
      <div className="flex flex-wrap gap-3 py-5">
        {data
          .filter((ephemeralTask) => ephemeralTask.member === null)
          .filter((ephemeralTask) => ephemeralTask.ephemeral_task_name.toLowerCase().includes(filterKey.toLowerCase()))
          .map((ephemeralTask, index) => (
            <EphemeralTaskCardForm key={`${ephemeralTask.id}eTaskCard${index}`} ephemeralTask={ephemeralTask} />
          ))}
      </div>
    </div>
  )
}
