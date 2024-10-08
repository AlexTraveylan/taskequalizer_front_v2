"use client"

import { taskEqualizerNavItems } from "@/lib/app-types"
import { cn } from "@/lib/utils"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TaskEqualizerLayout({ children }: { children: React.ReactNode }) {
  const t = useScopedI18n("taskequalizer")
  const pathname = usePathname()
  const locale = useCurrentLocale()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 md:p-10">
        <div className="grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{t("taskequalizer")}</h1>
        </div>
        <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm" x-chunk="dashboard-04-chunk-0">
            {Object.values(taskEqualizerNavItems).map((item, index) => {
              return (
                <Link
                  href={item.href}
                  key={`${index}${item.i18nKey}`}
                  className={cn(
                    "flex flex-col justify-center h-7 p-4 rounded-full transition-colors hover:text-primary",
                    pathname?.startsWith(`/${locale}${item.href}`) || (index === 0 && pathname === "/")
                      ? "bg-muted font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
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
