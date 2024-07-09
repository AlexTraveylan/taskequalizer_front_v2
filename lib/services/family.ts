import { familyMembersUrl, familyPossibleTasksUrl, familyUrl } from "@/lib/api-setting"
import { Family, FamilyIn, familySchema } from "@/lib/schema/family"
import { Member, memberSchema } from "@/lib/schema/member"
import { PossibleTask, possibleTaskSchema } from "@/lib/schema/possible-task"

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
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to fetch family")
      return
    }

    const data = await response.json()
    try {
      const parsedData = familySchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse family")
    }
  }

  /**
   * Retrieves the family members.
   * @returns A Promise that resolves to an array of Member objects, or undefined if the request fails.
   */
  async getFamilyMembers(): Promise<Member[] | undefined> {
    const response = await fetch(familyMembersUrl, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to fetch family members")
      return
    }

    const data = await response.json()
    try {
      const parsedData = memberSchema.array().parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse family members")
    }
  }

  /**
   * Retrieves the possible tasks for the family.
   * @returns A Promise that resolves to an array of PossibleTask objects, or undefined if the request fails.
   */
  async getFamilyPossibleTasks(): Promise<PossibleTask[] | undefined> {
    const response = await fetch(familyPossibleTasksUrl, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to fetch family possible tasks")
      return
    }

    const data = await response.json()
    try {
      const parsedData = possibleTaskSchema.array().parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse family possible tasks")
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(family),
    })

    if (!response.ok) {
      console.error("Failed to update family")
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
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to delete family")
      return false
    }

    return true
  }
}

export const familyService = new FamilyService()
