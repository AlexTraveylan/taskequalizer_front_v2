"use client"

import { InviteCodeForm } from "@/components/settings/invite-code-form"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Member } from "@/lib/schema/member"
import { familyService } from "@/lib/services/family"
import { formatDateTime } from "@/lib/utils"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"

export default function InformationsPage() {
  const query1 = useQuery({ queryKey: ["members"], queryFn: familyService.getFamilyMembers })
  const query2 = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query3 = useQuery({ queryKey: ["tasksByMembers"], queryFn: familyService.getTasksByMembers })
  const t = useScopedI18n("informations")
  const locale = useCurrentLocale()

  if (query1.isLoading || query2.isLoading || query3.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError || query3.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data || !query3.data) {
    return <div>No data...</div>
  }

  const membersMap: Record<string, Member> = query1.data.reduce((acc, member) => {
    acc[member.member_name] = member
    return acc
  }, {} as Record<string, Member>)

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-wrap gap-5 items-center">
        <h1 className="text-3xl font-semibold">{query2.data.family_name}</h1>
        <h2 className="text-sm text-muted-foreground">Edit and Delete comming soon ...</h2>
      </div>
      <Table>
        <TableCaption>{t("caption")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("memberName")}</TableHead>
            <TableHead className="max-[450px]:hidden">{t("createdAt")}</TableHead>
            <TableHead>{t("nbTasks")}</TableHead>
            <TableHead>{t("totalTime")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query3.data.data.map(({ member_name, tasks }, index) => {
            const totalTimeTasks = tasks.reduce((acc, task) => acc + task.duration, 0)
            return (
              <TableRow key={`${member_name}${index}`}>
                <TableCell>{member_name}</TableCell>
                <TableCell className="max-[450px]:hidden">{formatDateTime(membersMap[member_name].created_at, locale)}</TableCell>
                <TableCell>{tasks.length}</TableCell>
                <TableCell>{totalTimeTasks}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <InviteCodeForm />
      <h2 className="text-sm text-muted-foreground">Display here valid invitations list, soon ...</h2>
    </div>
  )
}
