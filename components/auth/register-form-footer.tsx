"use client"

import { CardFooter } from "@/components/ui/card"
import { footerSupportItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

export const RegisterFormFooter = () => {
  const scopedT = useScopedI18n("register-card")

  return (
    <CardFooter>
      <div className="text-center text-sm text-muted-foreground">
        {scopedT("accept1")}{" "}
        <Link href={footerSupportItems["TermsOfUse"].href} className="underline underline-offset-4 hover:text-primary">
          {scopedT("accept2")}
        </Link>{" "}
        {scopedT("accept3")}{" "}
        <Link href={footerSupportItems["PrivacyPolicy"].href} className="underline underline-offset-4 hover:text-primary">
          {scopedT("accept4")}
        </Link>
        .
      </div>
    </CardFooter>
  )
}
