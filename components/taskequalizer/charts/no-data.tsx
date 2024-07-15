"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { navItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

type NoDataProps = {
  title: string
  description: string
}

export const NoData = ({ title, description }: NoDataProps) => {
  const t = useScopedI18n("no-data")

  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h2>{t("no-data-text")}</h2>
          <div className="flex flex-col gap-3">
            <h2>{t("do-you-want-create-data")}</h2>
            <Link href={navItems["Application"].href}>{t("link-text")}</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
