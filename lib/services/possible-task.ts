import { possibleTaskUrl } from "@/lib/api-setting"
import { PossibleTask, PossibleTaskIn, PossibleTaskInWithId, possibleTaskSchema } from "@/lib/schema/possible-task"
import { SimpleMessage, simpleMessageSchema } from "../schema/auth"
import { extractAuthTokenFromLocalStorage } from "./auth"

class PossibleTaskService {
  async createPossibleTask(possibleTask: PossibleTaskIn): Promise<PossibleTask | SimpleMessage> {
    const response = await fetch(possibleTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(possibleTask),
    })

    if (response.status === 403) {
      const data = await response.json()
      const message = simpleMessageSchema.parse(data)
      return message
    }

    if (!response.ok) {
      throw new Error("Failed to create possible task")
    }

    const data = await response.json()
    const parsedData = possibleTaskSchema.parse(data)
    return parsedData
  }

  async updatePossibleTask(possibleTask: PossibleTaskInWithId): Promise<PossibleTask> {
    const response = await fetch(`${possibleTaskUrl}${possibleTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(possibleTask),
    })

    if (!response.ok) {
      throw new Error("Failed to update possible task")
    }

    const data = await response.json()
    const parsedData = possibleTaskSchema.parse(data)
    return parsedData
  }

  async deletePossibleTask(possible_task_id: string): Promise<boolean> {
    const response = await fetch(`${possibleTaskUrl}${possible_task_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete possible task")
    }

    return true
  }
}

export const possibleTaskService = new PossibleTaskService()
