"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { familyService } from "@/lib/services/family"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { RowPossibleTask } from "./row-p-task"

export const DisplayPossibleTasks = () => {
  const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const scopedT = useScopedI18n("display-p-task")

  if (!query.data) {
    return <></>
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{scopedT("name_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{scopedT("description_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{scopedT("update_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{scopedT("delete_label")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.data.map((possibleTask, index) => (
              <>
                <RowPossibleTask key={`${index}_${possibleTask.id}`} p_task={possibleTask} />
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
