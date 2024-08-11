"use client"

import { emailService } from "@/lib/services/email"
import { useScopedI18n } from "@/locales/client"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

export const ForgetPasswordLink = ({ form }: { form: UseFormReturn<{ username: string; password: string }, any, undefined> }) => {
  const [isWaiting, setIsWaiting] = useState(false)
  const scopedT = useScopedI18n("forget-password-link")

  const beginMinuteTimer = async () => {
    setIsWaiting(true)
    const timer = setTimeout(() => {
      setIsWaiting(false)
    }, 30000)
    try {
      await emailService.sendResetPasswordRequest(form.getValues("username"))
      toast.success("Email sent")
    } catch (error) {
      toast.error("Error while sending email")
    }

    return timer
  }

  if (isWaiting) {
    return <div className="ml-auto inline-block text-sm">{scopedT("wait")}</div>
  }

  return (
    <div onClick={beginMinuteTimer} className="ml-auto inline-block text-sm underline cursor-pointer">
      {scopedT("forgetLabel")}
    </div>
  )
}
