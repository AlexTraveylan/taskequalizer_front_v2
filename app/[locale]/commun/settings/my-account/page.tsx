"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useScopedI18n } from "@/locales/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "registerSchema.username.min",
    })
    .max(25, {
      message: "registerSchema.username.max",
    }),
  email: z.string().email({ message: "contact.form.validation.email" }).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function MyAccountPage() {
  const queryClient = useQueryClient()
  const query1 = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })
  const query3 = useQuery({ queryKey: ["whoIam"], queryFn: memberService.whoIam })
  const scopedT = useScopedI18n("my-account")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
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
    },
    onError: () => {
      toast.error(scopedT("error-message"))
    },
  })

  if (query1.isLoading || query2.isLoading || query3.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError || query3.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data || !query3.data) {
    return <div>No data...</div>
  }

  const myProfile = query2?.data?.find((member) => member.id === query3.data?.member_id)

  if (!myProfile) {
    return <div>No data...</div>
  }

  form.setValue("username", myProfile.member_name)
  form.setValue("email", myProfile.email ?? undefined)

  function onSubmit(data: ProfileFormValues) {
    console.log(data)
    updateMutation.mutate({ member_name: data.username, email: data.email })
  }

  return (
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{scopedT("update-btn")}</Button>
      </form>
    </Form>
  )
}
