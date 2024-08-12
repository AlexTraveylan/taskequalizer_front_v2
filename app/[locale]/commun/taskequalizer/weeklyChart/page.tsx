"use client"

import { chartConfig, colors } from "@/components/taskequalizer/charts/colors"
import { DonutChart } from "@/components/taskequalizer/charts/donus"
import { MultipleBarChart } from "@/components/taskequalizer/charts/multipleBar"
import { Calendar } from "@/components/ui/calendar"
import { PossibleTask } from "@/lib/schema/possible-task"
import { familyService } from "@/lib/services/family"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { addDays } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export default function WeeklyChartPage() {
  const scopedT = useScopedI18n("weekly-chart")
  const locale = useCurrentLocale()
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  const query1 = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })
  const query2 = useQuery({ queryKey: ["tasksDetails"], queryFn: familyService.getFamilyPossibleTaskDetails })
  const query3 = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query4 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })

  if (query1.isLoading || query2.isLoading || query3.isLoading || query4.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError || query3.isError || query4.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data || !query3.data || !query4.data) {
    return <div>No data...</div>
  }

  // Data for the donut chart

  const nbTasksData = query1.data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.created_at)
      return date?.to && taskDate.getDay() <= date.to.getDay() && date?.from && taskDate.getDay() >= date.from.getDay()
    })
    return {
      member: member_name,
      nbTasksDone: todayTasks.length,
      fill: colors[index % colors.length],
    }
  })

  // Data for the multiple bar chart

  const durationTasksData = query1.data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.created_at)
      return date?.to && taskDate.getDay() <= date.to.getDay() && date?.from && taskDate.getDay() >= date.from.getDay()
    })
    const totalTimeTasks = todayTasks.reduce((acc, task) => acc + Math.floor(task.duration / 60), 0)
    return {
      member: member_name,
      totalTimeTasks,
      fill: colors[index % colors.length],
    }
  })

  // Total values for donut charts

  const totalTasksDone = nbTasksData.reduce((acc, { nbTasksDone }) => acc + nbTasksDone, 0)
  const totalDurationTasks = durationTasksData.reduce((acc, { totalTimeTasks }) => acc + totalTimeTasks, 0)

  // Set possible tasks for multiple bar chart

  const possibleTasksRecord: Record<string, PossibleTask> = query3.data.reduce((acc, possibleTask) => {
    acc[possibleTask.id] = possibleTask
    return acc
  }, {} as Record<string, PossibleTask>)

  // Prepare keys Charts with members name

  const membersList: string[] = query4.data.map((member) => member.member_name)

  // Data for the multiple bar chart

  const barNbTasksData = query2.data.data.map(({ p_task_id, members }) => {
    const pTask = possibleTasksRecord[p_task_id]
    const data: Record<any, any> = {}
    data["pTask"] = pTask.possible_task_name
    members.forEach(({ member_name, tasks }) => {
      const todayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.created_at)
        return date?.to && taskDate.getDay() <= date.to.getDay() && date?.from && taskDate.getDay() >= date.from.getDay()
      })
      data[member_name] = todayTasks.length
    })
    return data
  })

  const barDurationTasksData = query2.data.data.map(({ p_task_id, members }) => {
    const pTask = possibleTasksRecord[p_task_id]
    const data: Record<any, any> = {}
    data["pTask"] = pTask.possible_task_name
    members.forEach(({ member_name, tasks }) => {
      const todayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.created_at)
        return date?.to && taskDate.getDay() <= date.to.getDay() && date?.from && taskDate.getDay() >= date.from.getDay()
      })
      const totalTimeTasks = todayTasks.reduce((acc, task) => acc + Math.floor(task.duration / 60), 0)
      data[member_name] = totalTimeTasks
    })
    return data
  })

  const description =
    date?.from && date?.to && `${scopedT("from")} ${date.from.toLocaleDateString(locale)} ${scopedT("to")} ${date.to.toLocaleDateString(locale)}`

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-3">{scopedT("title")}</h1>
      <div className="flex flex-col gap-5">
        <h2>{scopedT("period-choices")}</h2>
        {description && <p>{description}</p>}
        <Calendar mode="range" selected={date} onSelect={setDate} defaultMonth={date?.from} />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold mb-3">{scopedT("graph")}</h2>
        <DonutChart
          chartConfig={chartConfig}
          chartData={nbTasksData}
          dataKey="nbTasksDone"
          nameKey="member"
          title={scopedT("nb-tasks.title")}
          description={description ?? ""}
          total={totalTasksDone}
          totalLabel={scopedT("nb-tasks.totalLabel")}
        />
        <DonutChart
          chartConfig={chartConfig}
          chartData={durationTasksData}
          dataKey="totalTimeTasks"
          nameKey="member"
          title={scopedT("duration-tasks.title")}
          description={description ?? ""}
          total={totalDurationTasks}
          totalLabel={scopedT("duration-tasks.totalLabel")}
        />
        <MultipleBarChart
          chartConfig={chartConfig}
          chartData={barNbTasksData}
          dataKey="pTask"
          nameKey={membersList}
          title={scopedT("bar-nb-tasks.title")}
          description={description ?? ""}
        />
        <MultipleBarChart
          chartConfig={chartConfig}
          chartData={barDurationTasksData}
          dataKey="pTask"
          nameKey={membersList}
          title={scopedT("bar-duration-tasks.title")}
          description={description ?? ""}
        />
      </div>
    </div>
  )
}
