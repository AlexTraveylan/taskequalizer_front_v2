import { possibleTaskUrl } from "@/lib/api-setting"
import { PossibleTask, PossibleTaskIn, PossibleTaskInWithId, possibleTaskSchema } from "@/lib/schema/possible-task"

class PossibleTaskService {
  /**
   * Retrieves the possible tasks for the family.
   * @returns A Promise that resolves to an array of PossibleTask objects, or undefined if the request fails.
   */
  async createPossibleTask(possibleTask: PossibleTaskIn): Promise<PossibleTask | undefined> {
    const response = await fetch(possibleTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(possibleTask),
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to create possible task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = possibleTaskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse possible task")
    }
  }

  /**
   * Updates a possible task.
   * @param possibleTask - The updated possible task object.
   * @returns A Promise that resolves to the updated PossibleTask object, or undefined if the update fails.
   */
  async updatePossibleTask(possibleTask: PossibleTaskInWithId): Promise<PossibleTask | undefined> {
    const response = await fetch(`${possibleTaskUrl}${possibleTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(possibleTask),
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to update possible task")
      return
    }

    const data = await response.json()
    try {
      const parsedData = possibleTaskSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse possible task")
    }
  }

  /**
   * Deletes a possible task by its ID.
   * @param possible_task_id - The ID of the possible task to delete.
   * @returns A Promise that resolves to a boolean indicating whether the deletion was successful.
   */
  async deletePossibleTask(possible_task_id: string): Promise<boolean> {
    const response = await fetch(`${possibleTaskUrl}${possible_task_id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to delete possible task")
      return false
    }

    return true
  }
}

export const possibleTaskService = new PossibleTaskService()
