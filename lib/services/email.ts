import { emailContactUrl } from "../api-setting"
import { SimpleMessage, simpleMessageSchema } from "../schema/auth"
import { extractAuthTokenFromLocalStorage } from "./auth"

class EmailService {
  async sendContactEmail(email: string, message: string): Promise<SimpleMessage> {
    const response = await fetch(emailContactUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify({ email, message }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    message = await response.json()
    return simpleMessageSchema.parse(message)
  }
}

export const emailService = new EmailService()
