"use client"

import { AreaInteractiveChart } from "@/components/taskequalizer/charts/area-chart"
import { chartConfig, colors } from "@/components/taskequalizer/charts/colors"
import { DonutChart } from "@/components/taskequalizer/charts/donus"
import { MultipleBarChart } from "@/components/taskequalizer/charts/multipleBar"
import { PossibleTask } from "@/lib/schema/possible-task"
import { familyService } from "@/lib/services/family"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"

export default function DailyChartPage() {
  const query1 = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })
  const query2 = useQuery({ queryKey: ["tasksDetails"], queryFn: familyService.getFamilyPossibleTaskDetails })
  const query3 = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query4 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })
  const t = useScopedI18n("ranking")

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
    return {
      member: member_name,
      nbTasksDone: tasks.length,
      fill: colors[index % colors.length],
    }
  })

  // Data for the multiple bar chart

  const durationTasksData = query1.data.data.map(({ member_name, tasks }, index) => {
    const totalTimeTasks = tasks.reduce((acc, task) => acc + Math.floor(task.duration / 60), 0)
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
      data[member_name] = tasks.length
    })
    return data
  })

  const barDurationTasksData = query2.data.data.map(({ p_task_id, members }) => {
    const pTask = possibleTasksRecord[p_task_id]
    const data: Record<any, any> = {}
    data["pTask"] = pTask.possible_task_name
    members.forEach(({ member_name, tasks }) => {
      const totalTimeTasks = tasks.reduce((acc, task) => acc + Math.floor(task.duration / 60), 0)
      data[member_name] = totalTimeTasks
    })
    return data
  })

  return (
    <div className="flex flex-col gap-5">
      <DonutChart
        chartConfig={chartConfig}
        chartData={nbTasksData}
        dataKey="nbTasksDone"
        nameKey="member"
        title={t("nb-tasks.title")}
        description={t("nb-tasks.description")}
        total={totalTasksDone}
        totalLabel={t("nb-tasks.totalLabel")}
      />
      <DonutChart
        chartConfig={chartConfig}
        chartData={durationTasksData}
        dataKey="totalTimeTasks"
        nameKey="member"
        title={t("duration-tasks.title")}
        description={t("duration-tasks.description")}
        total={totalDurationTasks}
        totalLabel={t("duration-tasks.totalLabel")}
      />
      <MultipleBarChart
        chartConfig={chartConfig}
        chartData={barNbTasksData}
        dataKey="pTask"
        nameKey={membersList}
        title={t("bar-nb-tasks.title")}
        description={t("bar-nb-tasks.description")}
      />
      <MultipleBarChart
        chartConfig={chartConfig}
        chartData={barDurationTasksData}
        dataKey="pTask"
        nameKey={membersList}
        title={t("bar-duration-tasks.title")}
        description={t("bar-duration-tasks.description")}
      />
      <AreaInteractiveChart />
    </div>
  )
}
