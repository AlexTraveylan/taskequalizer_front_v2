"use client"

import { Label, Pie, PieChart, Sector } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useScopedI18n } from "@/locales/client"
import { useMemo, useState } from "react"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { chartColors } from "./colors"

type DonutChartProps = {
  chartConfig: ChartConfig
  chartData: Record<string, any>[]
  dataKey: string
  nameKey: string
  title: string
  description: string
  total: number
  totalLabel: string
}

export const DonutChart = ({ chartConfig, chartData, dataKey, nameKey, title, description, total, totalLabel }: DonutChartProps) => {
  const id = `char-donut-${Math.random().toString(36).substring(7)}`
  const [activeName, setActiveName] = useState<string>(chartData[0].nameKey)

  const activeIndex = useMemo(() => chartData.findIndex((item) => item[nameKey] === activeName), [activeName])
  const names = chartData.map((item) => item[nameKey])

  const t = useScopedI18n("donut-chart")

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={activeName} onValueChange={setActiveName}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a value">
            <SelectValue placeholder={t("selector-label")} />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {names.map((key, index) => {
              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: chartColors[index],
                      }}
                    />
                    {key}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              label
              labelLine={false}
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {total.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          {totalLabel}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
