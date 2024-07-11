"use client"

import { chartConfig, colors } from "@/components/taskequalizer/charts/colors"
import { DonutChart } from "@/components/taskequalizer/charts/donus"
import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"

export default function DailyChartPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!data?.data) {
    return <div>No data...</div>
  }

  const nbTasksData = data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === new Date().getDay())
    return {
      member: member_name,
      nbTasksDone: todayTasks.length,
      fill: colors[index % colors.length],
    }
  })

  const durationTasksData = data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === new Date().getDay())
    const totalTimeTasks = todayTasks.reduce((acc, task) => acc + task.duration, 0)
    return {
      member: member_name,
      totalTimeTasks,
      fill: colors[index % colors.length],
    }
  })

  const totalTasksDone = nbTasksData.reduce((acc, { nbTasksDone }) => acc + nbTasksDone, 0)
  const totalDurationTasks = durationTasksData.reduce((acc, { totalTimeTasks }) => acc + totalTimeTasks, 0)

  return (
    <div className="flex flex-col gap-5">
      <DonutChart
        chartConfig={chartConfig}
        chartData={nbTasksData}
        dataKey="nbTasksDone"
        nameKey="member"
        title="Repartition des taches par nombre"
        description="Aujourd'hui"
        total={totalTasksDone}
        totalLabel="Taches effectués"
      />
      <DonutChart
        chartConfig={chartConfig}
        chartData={durationTasksData}
        dataKey="totalTimeTasks"
        nameKey="member"
        title="Repartition des taches par durée"
        description="Aujourd'hui"
        total={totalDurationTasks}
        totalLabel="Total (s)"
      />
    </div>
  )
}
