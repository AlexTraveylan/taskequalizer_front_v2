import { ephemeralTaskUrl } from "../api-setting"
import { SimpleMessage, simpleMessageSchema } from "../schema/auth"
import { EphemeralTask, EphemeralTaskIn, ephemeralTaskSchema, ephemeralTasksListSchema } from "../schema/ephemeral-tasks"
import { extractAuthTokenFromLocalStorage } from "./auth"

class EphemeralTasksService {
  async getAllEphemeralTasksForFamily(): Promise<EphemeralTask[]> {
    const response = await fetch(ephemeralTaskUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch ephemeral tasks")
    }

    const data = await response.json()
    const parsedData = ephemeralTasksListSchema.parse(data)
    return parsedData.data
  }

  async createEphemeralTask(eTaskIn: EphemeralTaskIn): Promise<EphemeralTask | SimpleMessage> {
    const response = await fetch(ephemeralTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(eTaskIn),
    })

    // When plan's limit is reached
    if (response.status === 403) {
      const data = await response.json()
      const message = simpleMessageSchema.parse(data)
      return message
    }

    // other errors
    if (!response.ok) {
      throw new Error("Failed to create ephemeral task")
    }

    const data = await response.json()
    const parsedData = ephemeralTaskSchema.parse(data)

    return parsedData
  }

  async completeEphemeralTask(eTaskId: string): Promise<EphemeralTask> {
    const response = await fetch(`${ephemeralTaskUrl}${eTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to complete ephemeral task")
    }

    const data = await response.json()
    const parsedData = ephemeralTaskSchema.parse(data)
    return parsedData
  }

  async deleteEphemeralTask(eTaskId: string): Promise<SimpleMessage> {
    const response = await fetch(`${ephemeralTaskUrl}${eTaskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete ephemeral task")
    }

    const data = await response.json()
    const parsedData = simpleMessageSchema.parse(data)

    return parsedData
  }
}

export const ephemeralTasksService = new EphemeralTasksService()
