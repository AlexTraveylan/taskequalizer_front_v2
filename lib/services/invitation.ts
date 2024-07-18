import { cleanInvitationUrl, invitationUrl, validInvitationListUrl } from "@/lib/api-setting"
import { Invitation, invitationSchema, MessageResponse, messageResponseSchema, validListInvitationSchema } from "@/lib/schema/invitation"
import { extractAuthTokenFromLocalStorage } from "./auth"

class InvitationService {
  /**
   * Creates an invitation.
   * @returns A Promise that resolves to an instance of Invitation if successful, otherwise undefined.
   */
  async createInvitation(): Promise<Invitation | undefined> {
    const response = await fetch(invitationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch invitation")
      return
    }

    const data = await response.json()
    try {
      const parsedData = invitationSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse invitation")
    }
  }

  async getValidInvitations(): Promise<Invitation[] | undefined> {
    const response = await fetch(validInvitationListUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch invitations")
      return
    }

    const data = await response.json()
    try {
      const parsedData = validListInvitationSchema.parse(data)
      return parsedData.data
    } catch (error) {
      console.error("Failed to parse invitations")
    }
  }

  async deleteInvitation(invitationId: string): Promise<MessageResponse | undefined> {
    const response = await fetch(`${invitationUrl}${invitationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to delete invitation")
      return
    }

    const data = await response.json()

    try {
      const parsedData = messageResponseSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse message response")
    }
  }

  async cleanInvitations(): Promise<MessageResponse | undefined> {
    const response = await fetch(cleanInvitationUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      console.error("Failed to clean invitations")
      return
    }

    const data = await response.json()

    try {
      const parsedData = messageResponseSchema.parse(data)
      return parsedData
    } catch (error) {
      console.error("Failed to parse message response")
    }
  }
}

export const invitationService = new InvitationService()
