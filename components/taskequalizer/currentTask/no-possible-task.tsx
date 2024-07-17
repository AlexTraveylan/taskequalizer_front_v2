import { settingsNavItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

export default function NoPossibleTask() {
  const scopedT = useScopedI18n("no-possible-task")

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-semibold">{scopedT("title")}</h1>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        href={settingsNavItems["possibleTasks"].href}
      >
        {scopedT("go-create")}
      </Link>
    </div>
  )
}
