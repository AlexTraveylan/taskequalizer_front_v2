import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { invitationService } from "@/lib/services/invitation"
import { formatDateTime } from "@/lib/utils"
import { useCurrentLocale } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import { Badge } from "../ui/badge"

export const ValidInvitations = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["validInvitations"], queryFn: invitationService.getValidInvitations })
  const locale = useCurrentLocale()

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
          <TableHead>Code</TableHead>
          <TableHead>isUsed</TableHead>
          <TableHead className="max-[450px]:hidden">Expiration</TableHead>
          <TableHead>delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, code, is_used, expired_at }, index) => (
          <TableRow key={`${id}${index}`}>
            <TableCell>{code}</TableCell>
            <TableCell>{<Badge variant={is_used ? "success" : "destructive"}>{is_used ? "used" : "not used"}</Badge>}</TableCell>
            <TableCell className="max-[450px]:hidden">{formatDateTime(expired_at, locale)}</TableCell>
            <TableCell>
              <Trash className="cursor-pointer text-destructive" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
