import { taskUrl } from "@/lib/api-setting"
import { Task, TaskIn, taskSchema } from "@/lib/schema/task"

class TaskService {
  /**
   * Creates a new task.
   * @param taskIn The task input data.
   * @returns A promise that resolves to the created task, or undefined if the task creation fails.
   */
  async createTask(taskIn: TaskIn): Promise<Task | undefined> {
    const response = await fetch(taskUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskIn),
    })

    if (!response.ok) {
      console.error("Failed to create task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = taskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse task")
    }
  }

  /**
   * Retrieves a task by its ID.
   * @returns A Promise that resolves to the retrieved task, or undefined if the task is not found.
   */
  async getCurrentTask(): Promise<Task | undefined> {
    const response = await fetch(`${taskUrl}`, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("No current task found")
      return undefined
    }

    const data = await response.json()

    try {
      const parsedData = taskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse task")
      return undefined
    }
  }

  /**
   * Updates a task with the specified task ID.
   * @param task_id - The ID of the task to update.
   * @returns A Promise that resolves to the updated Task object, or undefined if the update fails.
   */
  async updateTask(task_id: string): Promise<Task | undefined> {
    const response = await fetch(`${taskUrl}${task_id}`, {
      method: "PUT",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to update task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = taskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse task")
    }
  }

  /**
   * Deletes a task with the specified task_id.
   * @param {string} task_id - The ID of the task to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the task is deleted successfully, false otherwise.
   */
  async deleteTask(task_id: string): Promise<boolean> {
    const response = await fetch(`${taskUrl}${task_id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to delete task")
      return false
    }

    return true
  }

  async cleanInvalidTasks(): Promise<void> {
    const response = await fetch(`${taskUrl}clean`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to clean invalid tasks")
    }

    console.log("Invalid tasks cleaned")
  }
}

export const taskService = new TaskService()
