import {
  familyMembersUrl,
  familyPossibleTaskDetailsUrl,
  familyPossibleTasksUrl,
  familyTasksUrl,
  familyUrl,
  tasksByDateByMemberUrl,
} from "@/lib/api-setting"
import {
  DataPossibleTasksDetails,
  dataPossibleTasksDetailsSchema,
  DataTasksByMembers,
  dataTasksByMembersSchema,
  Family,
  FamilyIn,
  familySchema,
  TasksByDateByMember,
  tasksByDateByMemberSchema,
} from "@/lib/schema/family"
import { Member, memberSchema } from "@/lib/schema/member"
import { PossibleTask, possibleTaskSchema } from "@/lib/schema/possible-task"
import { extractAuthTokenFromLocalStorage } from "./auth"

class FamilyService {
  async getFamily(): Promise<Family | undefined> {
    const response = await fetch(familyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch family")
    }

    const data = await response.json()
    const parsedData = familySchema.parse(data)
    return parsedData
  }

  async getFamilyMembers(): Promise<Member[]> {
    const response = await fetch(familyMembersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch family members")
    }

    const data = await response.json()
    const parsedData = memberSchema.array().parse(data)
    return parsedData
  }

  async getFamilyPossibleTasks(): Promise<PossibleTask[]> {
    const response = await fetch(familyPossibleTasksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch possible tasks")
    }

    const data = await response.json()
    const parsedData = possibleTaskSchema.array().parse(data)
    return parsedData
  }

  async getTasksByMembers(): Promise<DataTasksByMembers> {
    const response = await fetch(familyTasksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch tasks by members")
    }

    const data = await response.json()
    const parsedData = dataTasksByMembersSchema.parse(data)
    return parsedData
  }

  async getFamilyPossibleTaskDetails(): Promise<DataPossibleTasksDetails> {
    const response = await fetch(familyPossibleTaskDetailsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch family possible task details")
    }

    const data = await response.json()
    const parsedData = dataPossibleTasksDetailsSchema.parse(data)
    return parsedData
  }

  async getTasksByDateByMember(): Promise<TasksByDateByMember> {
    const response = await fetch(tasksByDateByMemberUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch tasks by date by member")
    }

    const data = await response.json()
    const parsedData = tasksByDateByMemberSchema.parse(data)
    return parsedData
  }

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
      throw new Error("Failed to update family")
    }

    return true
  }

  async deleteFamily(): Promise<boolean> {
    const response = await fetch(familyUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete family")
    }

    return true
  }
}

export const familyService = new FamilyService()
