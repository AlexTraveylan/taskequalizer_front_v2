import { invitationUrl } from "@/lib/api-setting"
import { Invitation, invitationSchema } from "@/lib/schema/invitation"

class InvitationService {
  /**
   * Creates an invitation.
   * @returns A Promise that resolves to an instance of Invitation if successful, otherwise undefined.
   */
  async createInvitation(): Promise<Invitation | undefined> {
    const response = await fetch(invitationUrl, {
      method: "GET",
      credentials: "include",
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
}

export const invitationService = new InvitationService()
