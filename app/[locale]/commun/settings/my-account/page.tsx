"use client"

import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"

export default function MyAccountPage() {
  const query1 = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })
  const query3 = useQuery({ queryKey: ["invitations"], queryFn: memberService.whoIam })
  const t = useScopedI18n("my-account")

  if (query1.isLoading || query2.isLoading || query3.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError || query3.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data || !query3.data) {
    return <div>No data...</div>
  }

  const myProfile = query2.data.find((member) => member.id === query3.data?.member_id)

  if (!myProfile) {
    return <div>No data...</div>
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <h2>{myProfile.member_name}</h2>
      <h2>{query1.data.family_name}</h2>
      <h2 className="text-sm text-muted-foreground">Edit and Delete comming soon ...</h2>
    </div>
  )
}
