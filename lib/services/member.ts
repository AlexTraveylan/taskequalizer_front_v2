import { memberTaskUrl, memberUrl } from "@/lib/api-setting"
import { Member, WhoIam, memberSchema, whoIamSchema } from "@/lib/schema/member"
import { Task, taskSchema } from "@/lib/schema/task"
import { extractAuthTokenFromLocalStorage } from "./auth"

class MemberService {
  /**
   * Retrieves a member by ID.
   * @param member_id - The ID of the member to retrieve.
   * @returns A Promise that resolves to a Member object
   */
  async getMember(member_id: string): Promise<Member> {
    const response = await fetch(`${memberUrl}${member_id}`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to get member")
    }

    const data = await response.json()
    const parsedData = memberSchema.parse(data)
    return parsedData
  }

  /**
   * Retrieves the tasks for a specific member.
   * @param member_id - The ID of the member.
   * @returns A promise that resolves to an array of tasks.
   */
  async getMemberTasks(member_id: string): Promise<Task[]> {
    const response = await fetch(`${memberTaskUrl}${member_id}`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to get member tasks")
    }

    const data = await response.json()
    const parsedData = taskSchema.array().parse(data)
    return parsedData
  }

  async whoIam(): Promise<WhoIam> {
    const response = await fetch(memberUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch whoIam")
    }

    const data = await response.json()
    const parsedData = whoIamSchema.parse(data)
    return parsedData
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
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(member),
    })

    if (!response.ok) {
      console.error("Failed to update member")
      return false
    }

    return true
  }

  async deleteMember(member_id: string): Promise<boolean> {
    const response = await fetch(`${memberUrl}${member_id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete member")
    }

    return true
  }
}

export const memberService = new MemberService()
