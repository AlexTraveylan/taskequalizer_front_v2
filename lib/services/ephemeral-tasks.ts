import { ephemeralTaskUrl } from "../api-setting"
import { SimpleMessage, simpleMessageSchema } from "../schema/auth"
import { EphemeralTask, EphemeralTaskIn, ephemeralTaskSchema, ephemeralTasksListSchema } from "../schema/ephemeral-tasks"
import { extractAuthTokenFromLocalStorage } from "./auth"

class EphemeralTasksService {
  async getAllEphemeralTasksForFamily(): Promise<EphemeralTask[] | undefined> {
    const response = await fetch(ephemeralTaskUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to get all ephemeral tasks")
      return
    }

    const data = await response.json()
    try {
      const parsedData = ephemeralTasksListSchema.parse(data)
      return parsedData.data
    } catch (error) {
      console.error("Failed to parse ephemeral tasks")
    }
  }

  async createEphemeralTask(eTaskIn: EphemeralTaskIn): Promise<EphemeralTask | undefined> {
    const response = await fetch(ephemeralTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(eTaskIn),
    })

    if (!response.ok) {
      console.error("Failed to create ephemeral task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = ephemeralTaskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse ephemeral task")
    }
  }

  async completeEphemeralTask(eTaskId: string): Promise<EphemeralTask | undefined> {
    const response = await fetch(`${ephemeralTaskUrl}/${eTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to complete ephemeral task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = ephemeralTaskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse ephemeral task")
    }
  }

  async deleteEphemeralTask(eTaskId: string): Promise<SimpleMessage | undefined> {
    const response = await fetch(`${ephemeralTaskUrl}/${eTaskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to delete ephemeral task")
      return
    }

    const data = await response.json()

    try {
      const parsedData = simpleMessageSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse simple message")
    }
  }
}
