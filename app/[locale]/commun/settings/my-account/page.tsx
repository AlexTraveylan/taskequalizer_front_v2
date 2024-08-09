"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/lib/app-types"
import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const profileFormSchema = z.object({
  username: z
    .string()
    .max(25, {
      message: "registerSchema.username.max",
    })
    .optional(),
  email: z
    .union([
      z.string().email({ message: "contact.form.validation.email" }).optional(),
      z.string().refine((value) => value === "" || value === null),
    ])
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function MyAccountPage() {
  const queryClient = useQueryClient()
  const { cleanClientMember, fetchClientMember, clientMember } = useClientMember()
  const router = useRouter()
  const query1 = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const scopedT = useScopedI18n("my-account")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const deleteMutation = useMutation({
    mutationFn: memberService.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      localStorage.removeItem("auth_token")
      cleanClientMember()
      toast.warning(scopedT("delete.success-message"))
      router.push(navItems["Home"].href)
    },
    onError: () => {
      toast.error(scopedT("delete.error-message"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: memberService.updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      if (form.getValues("email")) {
        toast.info(scopedT("email.succes-message"))
      } else {
        toast.info(scopedT("username.succes-message"))
      }
      fetchClientMember()
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  if (query1.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError) {
    return <div>Error...</div>
  }

  if (!query1.data) {
    return <div>No data...</div>
  }

  if (!clientMember) {
    return <div>No data...</div>
  }

  function onSubmit(data: ProfileFormValues) {
    if (!clientMember) {
      return
    }

    let member_name: string
    let email: string | null

    if (data.username === "" || !data.username) {
      member_name = clientMember.member_name
    } else {
      member_name = data.username
    }

    if (data.email === "" || !data.email) {
      email = clientMember.email
    } else {
      email = data.email
    }

    updateMutation.mutate({ member_name, email })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{scopedT("title")}</h1>
      <div>
        <p className="text-sm font-medium leading-none">{clientMember.member_name}</p>
        <p className="text-sm text-muted-foreground">{clientMember.email ?? scopedT("email.not-set")}</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{scopedT("username.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={scopedT("username.placeholder")} {...field} />
                </FormControl>
                <FormMessageI18n />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{scopedT("email.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={scopedT("email.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{scopedT("email.description")}</FormDescription>
                <FormMessageI18n />
              </FormItem>
            )}
          />
          <Button type="submit">{scopedT("update-btn")}</Button>
        </form>
      </Form>
      <Separator />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>{scopedT("delete.btn-label")}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{scopedT("delete.alert.title")}</AlertDialogTitle>
            <AlertDialogDescription>{scopedT("delete.alert.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{scopedT("delete.alert.cancel-btn-label")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMutation.mutate(clientMember.id)}>
              {scopedT("delete.alert.confirm-btn-label")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
