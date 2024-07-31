import { taskUrl } from "@/lib/api-setting"
import { Task, TaskIn, taskSchema } from "@/lib/schema/task"
import { extractAuthTokenFromLocalStorage } from "./auth"

class TaskService {
  async createTask(taskIn: TaskIn): Promise<Task> {
    const response = await fetch(taskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(taskIn),
    })

    if (!response.ok) {
      throw new Error("Failed to create task")
    }

    const data = await response.json()
    const parsedData = taskSchema.parse(data)
    return parsedData
  }

  async getCurrentTask(): Promise<Task> {
    const response = await fetch(`${taskUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get current task")
    }

    const data = await response.json()

    const parsedData = taskSchema.parse(data)
    return parsedData
  }

  async updateTask(task_id: string): Promise<Task> {
    const response = await fetch(`${taskUrl}${task_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to update task")
    }

    const data = await response.json()
    const parsedData = taskSchema.parse(data)
    return parsedData
  }

  async deleteTask(task_id: string): Promise<boolean> {
    const response = await fetch(`${taskUrl}${task_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete task")
    }

    return true
  }

  async cleanInvalidTasks(): Promise<boolean> {
    const response = await fetch(`${taskUrl}clean`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to clean invalid tasks")
    }

    return true
  }
}

export const taskService = new TaskService()
