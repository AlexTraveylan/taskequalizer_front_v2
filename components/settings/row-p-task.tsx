"use client"

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TableCell, TableRow } from "@/components/ui/table"
import { PossibleTask, possibleTaskInSchema } from "@/lib/schema/possible-task"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SquareArrowOutUpRight, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const RowPossibleTask = ({ p_task }: { p_task: PossibleTask }) => {
  const queryClient = useQueryClient()
  const scopedT = useScopedI18n("row-p-task")

  const form = useForm<z.infer<typeof possibleTaskInSchema>>({
    resolver: zodResolver(possibleTaskInSchema),
    defaultValues: {
      possible_task_name: p_task.possible_task_name,
      description: p_task.description,
    },
  })

  const onUpdate = async (formData: z.infer<typeof possibleTaskInSchema>) => {
    updateMutation.mutate({ id: p_task.id, ...formData })
  }

  const deleteMutation = useMutation({
    mutationFn: possibleTaskService.deletePossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
      toast.warning(scopedT("delete.success-message"))
    },
    onError: () => {
      toast.error(scopedT("delete.error-message"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: possibleTaskService.updatePossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
      toast.success(scopedT("update.success-message"))
    },
    onError: () => {
      toast.error(scopedT("update.error-message"))
    },
  })

  return (
    <TableRow>
      <TableCell className="font-medium">{p_task.possible_task_name}</TableCell>
      <TableCell className="hidden md:table-cell">{p_task.description}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <SquareArrowOutUpRight className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onUpdate)}>
                <DialogHeader>
                  <DialogTitle>{scopedT("dialog_edit")}</DialogTitle>
                  <DialogDescription>{scopedT("dialog_description")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="possible_task_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{scopedT("dialog_name_label")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessageI18n />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{scopedT("dialog_description_label")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessageI18n />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">{scopedT("dialog_button_label")}</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="cursor-pointer text-destructive" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{scopedT("alert_delete_title")}</AlertDialogTitle>
              <AlertDialogDescription>{scopedT("alert_delete_description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{scopedT("alert_delete_cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMutation.mutate(p_task.id)} className="cursor-pointer">
                {scopedT("alert_delete_confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
