"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { invitationService } from "@/lib/services/invitation"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Copy } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

const InvitationWithEmailSchema = z.object({
  email: z.string().email({ message: "invitation.email" }).optional(),
})

type InvitationWithEmail = z.infer<typeof InvitationWithEmailSchema>

export const InviteCodeForm = () => {
  const [code, setCode] = useState<string>("")
  const scopedT = useScopedI18n("invite-code-form")
  const queryClient = useQueryClient()
  const form = useForm<InvitationWithEmail>({
    resolver: zodResolver(InvitationWithEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: InvitationWithEmail) {
    if (data.email) {
      createWithEmailMutation.mutate(data.email)
    } else {
      createMutation.mutate()
    }
  }

  const createWithEmailMutation = useMutation({
    mutationFn: invitationService.create_invitation_with_email,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["validInvitations"] })

      if ("message" in data) {
        toast.error(data.message)
        return
      }

      setCode(data.code)
      toast.success(scopedT("success-message"))
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  const createMutation = useMutation({
    mutationFn: invitationService.createInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["validInvitations"] })

      if ("message" in data) {
        toast.error(data.message)
        return
      }

      setCode(data.code)
      toast.success(scopedT("success-message"))
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{scopedT("title")}</CardTitle>
            <CardDescription>{scopedT("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("email.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={scopedT("email.placeholder")} {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {!code && <Button type="submit">{scopedT("btn-label")}</Button>}
            <div className="relative">
              <Input key="code_input" id="code_input" type="text" value={code} disabled />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCopy}>
                <Copy size={23} strokeWidth={1.3} />
              </span>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
