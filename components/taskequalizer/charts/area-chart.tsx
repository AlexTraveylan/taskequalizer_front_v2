"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { familyService } from "@/lib/services/family"
import { generatePastDates } from "@/lib/utils"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { chartColors, colors } from "./colors"

export function AreaInteractiveChart() {
  const [timeRange, setTimeRange] = React.useState<string>("7d")
  const locale = useCurrentLocale()
  const scopedT = useScopedI18n("area-interactive-chart")

  const { data, isError, isLoading } = useQuery({ queryKey: ["tasksByDateByMember"], queryFn: familyService.getTasksByDateByMember })
  const query = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })

  if (isLoading || query.isLoading) {
    return <div>Loading...</div>
  }

  if (isError || query.isError) {
    return <div>Error...</div>
  }

  if (!data || !query.data) {
    return <div>No data...</div>
  }

  const chartConfig: ChartConfig = {
    chrome: {
      label: "Chrome",
      color: chartColors[0],
    },
    safari: {
      label: "Safari",
      color: chartColors[1],
    },
    firefox: {
      label: "Firefox",
      color: chartColors[2],
    },
    edge: {
      label: "Edge",
      color: chartColors[3],
    },
    other: {
      label: "Other",
      color: chartColors[4],
    },
  } satisfies ChartConfig

  for (const member of query.data) {
    chartConfig[member.member_name] = {
      label: member.member_name,
      color: chartColors[query.data.indexOf(member)],
    }
  }

  const chartData = Object.entries(data).map(([date, members]) => {
    const itemData: Record<string, string | number> = { date }

    for (const [member_name, durationTasks] of Object.entries(members)) {
      const totalDuration = durationTasks.reduce((acc, task) => acc + task.duration, 0)
      itemData[member_name] = totalDuration
    }

    for (const member of query.data) {
      if (!itemData[member.member_name]) {
        itemData[member.member_name] = 0
      }
    }

    return itemData
  })

  const dates: string[] = generatePastDates(90)

  for (const date of dates) {
    const found = chartData.find((item) => item.date === date)
    if (!found) {
      const itemData: Record<string, string | number> = { date }
      for (const member of query.data) {
        itemData[member.member_name] = 0
      }
      chartData.push(itemData)
    }
  }

  const filteredData = chartData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((item) => {
      const date = new Date(item.date)
      const now = new Date()
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      now.setDate(now.getDate() - daysToSubtract)
      return date >= now
    })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{scopedT("card.title")}</CardTitle>
          <CardDescription>{scopedT("card.description")}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              {scopedT("3months")}
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              {scopedT("30days")}
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              {scopedT("7days")}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              {query.data.map((member, index) => (
                <linearGradient id={`fill${member.member_name}`} x1="0" y1="0" x2="0" y2="1" key={`linear${index}${member.id}`}>
                  <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[index]} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString(locale, {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {query.data.map((member, index) => (
              <Area
                dataKey={member.member_name}
                type="natural"
                fill={`url(#fill${member.member_name})`}
                stackId="a"
                stroke={colors[index]}
                key={`area${index}${member.member_name}`}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
