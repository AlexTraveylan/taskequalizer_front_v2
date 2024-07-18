"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { colors } from "./colors"
import { NoData } from "./no-data"

type MultipleBarCharttProps = {
  chartConfig: ChartConfig
  chartData: Record<string, any>[]
  dataKey: string
  nameKey: string[]
  title: string
  description: string
}

export function MultipleBarChart({ chartConfig, chartData, dataKey, nameKey, title, description }: MultipleBarCharttProps) {
  const lenData = chartData.reduce((acc, item) => {
    for (const key of nameKey) {
      acc += item[key]
    }
    return acc
  }, 0)

  if (lenData === 0) {
    return <NoData title={title} description={description} />
  }

  const chartDataCleaned = chartData.filter((item) => {
    let total = 0
    for (const key of nameKey) {
      total += item[key]
    }
    return total > 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartDataCleaned}
            margin={{
              top: 30,
              bottom: 48,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={dataKey} angle={-80} tickLine={false} tickMargin={35} axisLine={false} tickFormatter={(value) => value.slice(0, 12)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            {nameKey.map((nkey, index) => (
              <Bar key={nkey} dataKey={nkey} fill={colors[index]} radius={4}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
