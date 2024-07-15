import { familyMembersUrl, familyPossibleTaskDetailsUrl, familyPossibleTasksUrl, familyTasksUrl, familyUrl } from "@/lib/api-setting"
import {
  DataPossibleTasksDetails,
  dataPossibleTasksDetailsSchema,
  DataTasksByMembers,
  dataTasksByMembersSchema,
  Family,
  FamilyIn,
  familySchema,
} from "@/lib/schema/family"
import { Member, memberSchema } from "@/lib/schema/member"
import { PossibleTask, possibleTaskSchema } from "@/lib/schema/possible-task"
import { extractAuthTokenFromLocalStorage } from "./auth"

/**
 * Represents a service for managing family-related operations.
 */
class FamilyService {
  /**
   * Retrieves the family information.
   * @returns A Promise that resolves to a Family object, or undefined if the request fails.
   */
  async getFamily(): Promise<Family | undefined> {
    const response = await fetch(familyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to fetch family")
      return
    }

    const data = await response.json()
    try {
      const parsedData = familySchema.parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse family")
    }
  }

  /**
   * Retrieves the family members.
   * @returns A Promise that resolves to an array of Member objects, or undefined if the request fails.
   */
  async getFamilyMembers(): Promise<Member[] | undefined> {
    const response = await fetch(familyMembersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to fetch family members")
      return
    }

    const data = await response.json()
    try {
      const parsedData = memberSchema.array().parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse family members")
    }
  }

  /**
   * Retrieves the possible tasks for the family.
   * @returns A Promise that resolves to an array of PossibleTask objects, or undefined if the request fails.
   */
  async getFamilyPossibleTasks(): Promise<PossibleTask[] | undefined> {
    const response = await fetch(familyPossibleTasksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to fetch family possible tasks")
      return
    }

    const data = await response.json()
    try {
      const parsedData = possibleTaskSchema.array().parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse family possible tasks")
    }
  }

  async getTasksByMembers(): Promise<DataTasksByMembers | undefined> {
    const response = await fetch(familyTasksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to fetch tasks by members")
      return
    }

    const data = await response.json()
    try {
      const parsedData = dataTasksByMembersSchema.parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse tasks by members")
    }
  }

  async getFamilyPossibleTaskDetails(): Promise<DataPossibleTasksDetails | undefined> {
    const response = await fetch(familyPossibleTaskDetailsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to fetch family possible task details")
      return
    }

    const data = await response.json()
    try {
      const parsedData = dataPossibleTasksDetailsSchema.parse(data)
      return parsedData
    } catch (error) {
      console.log("Failed to parse family possible task details")
    }
  }

  /**
   * Updates a family.
   * @param family - The family object to update.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  async updateFamily(family: FamilyIn): Promise<boolean> {
    const response = await fetch(familyUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(family),
    })

    if (!response.ok) {
      console.log("Failed to update family")
      return false
    }

    return true
  }

  /**
   * Deletes the family.
   * @returns A promise that resolves to a boolean indicating whether the deletion was successful.
   */
  async deleteFamily(): Promise<boolean> {
    const response = await fetch(familyUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.log("Failed to delete family")
      return false
    }

    return true
  }
}

export const familyService = new FamilyService()
