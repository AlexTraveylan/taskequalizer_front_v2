import { memberTaskUrl, memberUrl } from "@/lib/api-setting"
import { Member, WhoIam, memberSchema, whoIamSchema } from "@/lib/schema/member"
import { Task, taskSchema } from "@/lib/schema/task"

class MemberService {
  /**
   * Retrieves a member by ID.
   * @param member_id - The ID of the member to retrieve.
   * @returns A Promise that resolves to a Member object, or undefined if the request fails.
   */
  async getMember(member_id: string): Promise<Member | undefined> {
    const response = await fetch(`${memberUrl}${member_id}`, {
      method: "GET",
    })

    if (!response.ok) {
      console.error("Failed to get member")
      return
    }

    const data = await response.json()
    try {
      const parsedData = memberSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse member")
    }
  }

  /**
   * Retrieves the tasks for a specific member.
   * @param member_id - The ID of the member.
   * @returns A promise that resolves to an array of tasks, or undefined if there was an error.
   */
  async getMemberTasks(member_id: string): Promise<Task[] | undefined> {
    const response = await fetch(`${memberTaskUrl}${member_id}`, {
      method: "GET",
    })

    if (!response.ok) {
      console.error("Failed to get member tasks")
      return
    }

    const data = await response.json()
    try {
      const parsedData = taskSchema.array().parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse member tasks")
    }
  }

  async whoIam(): Promise<WhoIam | undefined> {
    const response = await fetch(memberUrl, {
      credentials: "include",
    })

    const data = await response.json()
    try {
      const parsedData = whoIamSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to get name")
    }
  }

  /**
   * Updates a member.
   * @param member - The member object to update.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  async updateMember(member: Member): Promise<boolean> {
    const response = await fetch(`${memberUrl}${member.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
      credentials: "include",
    })

    if (!response.ok) {
      console.error("Failed to update member")
      return false
    }

    return true
  }

  /**
   * Deletes a member with the specified ID.
   * @param member_id - The ID of the member to delete.
   * @returns A promise that resolves to a boolean indicating whether the member was successfully deleted.
   */
  async deleteMember(member_id: string): Promise<boolean> {
    const response = await fetch(`${memberUrl}${member_id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      console.error("Failed to delete member")
      return false
    }

    return true
  }
}

export const memberService = new MemberService()
