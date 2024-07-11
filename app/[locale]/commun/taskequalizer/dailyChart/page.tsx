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

  const chartData = data.data.map(({ member_name, tasks }, index) => {
    return {
      member: member_name,
      nbTasksDone: tasks.length,
      fill: colors[index % colors.length],
    }
  })

  const totalTasksDone = chartData.reduce((acc, { nbTasksDone }) => acc + nbTasksDone, 0)

  const title = "Repartition des taches par nombre"
  const description = "Aujourd'hui"
  const totalLabel = "Taches effectués"

  return (
    <div>
      <DonutChart
        chartConfig={chartConfig}
        chartData={chartData}
        dataKey="nbTasksDone"
        nameKey="member"
        title={title}
        description={description}
        total={totalTasksDone}
        totalLabel={totalLabel}
      />
    </div>
  )
}
