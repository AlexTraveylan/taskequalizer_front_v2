import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { invitationService } from "@/lib/services/invitation"
import { formatDateTime } from "@/lib/utils"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "../ui/badge"

export const ValidInvitations = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["validInvitations"], queryFn: invitationService.getValidInvitations })
  const locale = useCurrentLocale()
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("valid-invitations")

  const deleteMutation = useMutation({
    mutationFn: invitationService.deleteInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validInvitations"] })
      toast.warning(scopedT("delete.success-message"))
    },
    onError: () => {
      toast.error(scopedT("delete.error-message"))
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!data) {
    return <div>No data...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{scopedT("head.code")}</TableHead>
          <TableHead>{scopedT("head.isUsed")}</TableHead>
          <TableHead className="max-[450px]:hidden">{scopedT("head.expiration")}</TableHead>
          <TableHead>{scopedT("head.delete")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, code, is_used, expired_at }, index) => (
          <TableRow key={`${id}${index}`}>
            <TableCell>{code}</TableCell>
            <TableCell>{<Badge variant={is_used ? "success" : "destructive"}>{is_used ? scopedT("used") : scopedT("not-used")}</Badge>}</TableCell>
            <TableCell className="max-[450px]:hidden">{formatDateTime(expired_at, locale)}</TableCell>
            <TableCell>
              <Trash className="cursor-pointer text-destructive" onClick={() => deleteMutation.mutate(id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
