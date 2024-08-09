import { cleanInvitationUrl, cleanInvitationWithEmailUrl, invitationUrl, validInvitationListUrl } from "@/lib/api-setting"
import { Invitation, invitationSchema, MessageResponse, messageResponseSchema, validListInvitationSchema } from "@/lib/schema/invitation"
import { SimpleMessage, simpleMessageSchema } from "../schema/auth"
import { extractAuthTokenFromLocalStorage } from "./auth"

class InvitationService {
  async createInvitation(): Promise<Invitation | SimpleMessage> {
    const response = await fetch(invitationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (response.status === 403) {
      const data = await response.json()
      const message = simpleMessageSchema.parse(data)
      return message
    }

    if (!response.ok) {
      throw new Error("Failed to create invitation")
    }

    const data = await response.json()
    const parsedData = invitationSchema.parse(data)
    return parsedData
  }

  async getValidInvitations(): Promise<Invitation[]> {
    const response = await fetch(validInvitationListUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get valid invitations")
    }

    const data = await response.json()
    const parsedData = validListInvitationSchema.parse(data)
    return parsedData.data
  }

  async create_invitation_with_email(email: string): Promise<Invitation | SimpleMessage> {
    const response = await fetch(cleanInvitationWithEmailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify({ email }),
    })

    if (response.status === 403) {
      const data = await response.json()
      const message = simpleMessageSchema.parse(data)
      return message
    }

    if (!response.ok) {
      throw new Error("Failed to create invitation")
    }

    const data = await response.json()
    const parsedData = invitationSchema.parse(data)
    return parsedData
  }

  async deleteInvitation(invitationId: string): Promise<MessageResponse> {
    const response = await fetch(`${invitationUrl}${invitationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete invitation")
    }

    const data = await response.json()

    const parsedData = messageResponseSchema.parse(data)
    return parsedData
  }

  async cleanInvalidInvitations(): Promise<MessageResponse> {
    const response = await fetch(cleanInvitationUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to clean invalid invitations")
    }

    const data = await response.json()

    const parsedData = messageResponseSchema.parse(data)
    return parsedData
  }
}

export const invitationService = new InvitationService()
