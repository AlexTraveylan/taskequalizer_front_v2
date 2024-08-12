"use client"

import { chartConfig, colors } from "@/components/taskequalizer/charts/colors"
import { DonutChart } from "@/components/taskequalizer/charts/donus"
import { MultipleBarChart } from "@/components/taskequalizer/charts/multipleBar"
import { Calendar } from "@/components/ui/calendar"
import { PossibleTask } from "@/lib/schema/possible-task"
import { familyService } from "@/lib/services/family"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function DailyChartPage() {
  const query1 = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })
  const query2 = useQuery({ queryKey: ["tasksDetails"], queryFn: familyService.getFamilyPossibleTaskDetails })
  const query3 = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query4 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })
  const t = useScopedI18n("daily-chart")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const locale = useCurrentLocale()

  if (query1.isLoading || query2.isLoading || query3.isLoading || query4.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError || query3.isError || query4.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data || !query3.data || !query4.data || !date) {
    return <div>No data...</div>
  }

  // Data for the donut chart

  const nbTasksData = query1.data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => {
      if (task.ended_at === null) {
        return false
      }
      return new Date(task.ended_at).getDay() === date.getDay()
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
      if (task.ended_at === null) {
        return false
      }
      return new Date(task.ended_at).getDay() === date.getDay()
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

  const possibleTasksRecord: Record<string, PossibleTask | { id: string; possible_task_name: string }> = query3.data.reduce(
    (acc, possibleTask) => {
      acc[possibleTask.id] = possibleTask
      return acc
    },
    {} as Record<string, PossibleTask>
  )
  possibleTasksRecord["ephemeral_task"] = { id: "ephemeral_task", possible_task_name: "Ephemeral" }

  // Prepare keys Charts with members name

  const membersList: string[] = query4.data.map((member) => member.member_name)

  // Data for the multiple bar chart

  const barNbTasksData = query2.data.data.map(({ p_task_id, members }) => {
    const pTask = possibleTasksRecord[p_task_id]
    const data: Record<any, any> = {}
    data["pTask"] = pTask.possible_task_name
    members.forEach(({ member_name, tasks }) => {
      const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === date.getDay())
      data[member_name] = todayTasks.length
    })
    return data
  })

  const barDurationTasksData = query2.data.data.map(({ p_task_id, members }) => {
    const pTask = possibleTasksRecord[p_task_id]
    const data: Record<any, any> = {}
    data["pTask"] = pTask.possible_task_name
    members.forEach(({ member_name, tasks }) => {
      const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === date.getDay())
      const totalTimeTasks = todayTasks.reduce((acc, task) => acc + Math.floor(task.duration / 60), 0)
      data[member_name] = totalTimeTasks
    })
    return data
  })

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold mb-3">{t("title")}</h1>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold mb-3">{t("date-choice")}</h2>
        <p>
          {t("chosenDay")} : {date.toLocaleDateString(locale)}
        </p>
        <Calendar mode="single" selected={date} onSelect={setDate} required />
      </div>

      <DonutChart
        chartConfig={chartConfig}
        chartData={nbTasksData}
        dataKey="nbTasksDone"
        nameKey="member"
        title={t("nb-tasks.title")}
        description={date.toLocaleDateString(locale)}
        total={totalTasksDone}
        totalLabel={t("nb-tasks.totalLabel")}
      />
      <DonutChart
        chartConfig={chartConfig}
        chartData={durationTasksData}
        dataKey="totalTimeTasks"
        nameKey="member"
        title={t("duration-tasks.title")}
        description={date.toLocaleDateString(locale)}
        total={totalDurationTasks}
        totalLabel={t("duration-tasks.totalLabel")}
      />
      <MultipleBarChart
        chartConfig={chartConfig}
        chartData={barNbTasksData}
        dataKey="pTask"
        nameKey={membersList}
        title={t("bar-nb-tasks.title")}
        description={date.toLocaleDateString(locale)}
      />
      <MultipleBarChart
        chartConfig={chartConfig}
        chartData={barDurationTasksData}
        dataKey="pTask"
        nameKey={membersList}
        title={t("bar-duration-tasks.title")}
        description={date.toLocaleDateString(locale)}
      />
    </div>
  )
}
