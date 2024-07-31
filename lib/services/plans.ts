import { checkoutSessionUrl, plansInformationUrl } from "../api-setting"
import { CheckoutSession, checkoutSessionSchema, Plans, plansSchema } from "../schema/plans"
import { extractAuthTokenFromLocalStorage } from "./auth"

class PlanService {
  async getPlans(): Promise<Plans> {
    const response = await fetch(`${plansInformationUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Failed to get plans")
      throw new Error("Failed to get plans")
    }

    const data = await response.json()
    try {
      const parsedData = plansSchema.parse(data)
      return parsedData
    } catch (error) {
      throw new Error("Failed to parse plans")
    }
  }

  async checkoutSession(plan: "BASIC" | "PREMIUM"): Promise<CheckoutSession> {
    const response = await fetch(`${checkoutSessionUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify({ souscription_plan: plan }),
    })

    if (!response.ok) {
      console.error("Failed to get plans")
      throw new Error("Failed to get plans")
    }

    const data = await response.json()
    try {
      const parsedData = checkoutSessionSchema.parse(data)
      return parsedData
    } catch (error) {
      throw new Error("Failed to parse plans")
    }
  }
}

export const planService = new PlanService()
