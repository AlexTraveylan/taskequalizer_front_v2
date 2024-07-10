import { DisplayPossibleTasks } from "@/components/settings/display-p-tasks"
import { PossibleTaskForm } from "@/components/settings/possible-task-form"

export default function PossibleTasksPage() {
  return (
    <div className="flex flex-col gap-8">
      <DisplayPossibleTasks />
      <PossibleTaskForm />
    </div>
  )
}
