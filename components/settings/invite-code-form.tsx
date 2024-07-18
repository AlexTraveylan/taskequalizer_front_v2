"use client"

import { invitationService } from "@/lib/services/invitation"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

export const InviteCodeForm = () => {
  const [code, setCode] = useState<string>("")
  const scopedT = useScopedI18n("invite-code-form")
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: invitationService.createInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["validInvitations"] })
      if (data) {
        setCode(data.code)
        toast.success(scopedT("success-message"))
      }
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Input key="code_input" id="code_input" type="text" value={code} disabled />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCopy}>
            <Copy size={23} strokeWidth={1.3} />
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {!code && <Button onClick={() => createMutation.mutate()}>{scopedT("btn-label")}</Button>}
        <h2 className="text-sm text-muted-foreground">{scopedT("comming-soon")}</h2>
      </CardFooter>
    </Card>
  )
}
