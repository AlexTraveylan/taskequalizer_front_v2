"use client"

import { chartConfig, colors } from "@/components/taskequalizer/charts/colors"
import { DonutChart } from "@/components/taskequalizer/charts/donus"
import { MultipleBarChart } from "@/components/taskequalizer/charts/multipleBar"
import { familyService } from "@/lib/services/family"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"

export default function DailyChartPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })
  const t = useScopedI18n("daily-chart")

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!data?.data) {
    return <div>No data...</div>
  }

  // Data for the donut chart

  const nbTasksData = data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === new Date().getDay())
    return {
      member: member_name,
      nbTasksDone: todayTasks.length,
      fill: colors[index % colors.length],
    }
  })

  // Data for the multiple bar chart

  const durationTasksData = data.data.map(({ member_name, tasks }, index) => {
    const todayTasks = tasks.filter((task) => new Date(task.created_at).getDay() === new Date().getDay())
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

  // Data for the multiple bar chart

  const barData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

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
        chartData={barData}
        dataKey="month"
        nameKey={["desktop", "mobile"]}
        title="Monthly Distribution"
        description="This year"
      />
    </div>
  )
}
