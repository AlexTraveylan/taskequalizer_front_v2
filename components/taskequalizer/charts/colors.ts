import { ChartConfig } from "@/components/ui/chart"

export const colors = ["var(--color-chrome)", "var(--color-safari)", "var(--color-firefox)", "var(--color-edge)", "var(--color-other)"]
export const chartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export const chartConfig = {
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
