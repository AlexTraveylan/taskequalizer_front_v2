"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { colors } from "./colors"

type MultipleBarCharttProps = {
  chartConfig: ChartConfig
  chartData: Record<string, any>[]
  dataKey: string
  nameKey: string[]
  title: string
  description: string
}

export function MultipleBarChart({ chartConfig, chartData, dataKey, nameKey, title, description }: MultipleBarCharttProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={dataKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            {nameKey.map((nkey, index) => (
              <Bar key={nkey} dataKey={nkey} fill={colors[index]} radius={4} />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
