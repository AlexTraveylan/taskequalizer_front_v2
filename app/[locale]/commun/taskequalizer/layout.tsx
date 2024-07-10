"use client"

import { taskEqualizerNavItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

export default function TaskEqualizerLayout({ children }: { children: React.ReactNode }) {
  const t = useScopedI18n("taskequalizer")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{t("taskequalizer")}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            {Object.values(taskEqualizerNavItems).map((item, index) => {
              return (
                <Link href={item.href} key={`${index}${item.i18nKey}`}>
                  {t(item.i18nKey)}
                </Link>
              )
            })}
          </nav>
          {children}
        </div>
      </main>
    </div>
  )
}
