import { familySettingsUrl } from "../api-setting"
import { FamilySettings, FamilySettingsIn, familySettingsSchema } from "../schema/family-setings"
import { extractAuthTokenFromLocalStorage } from "./auth"

class EphemeralTasksService {
  async getFamilySettings(): Promise<FamilySettings> {
    const response = await fetch(familySettingsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get family settings")
    }

    const data = await response.json()
    try {
      const parsedData = familySettingsSchema.parse(data)
      return parsedData
    } catch (error) {
      throw new Error("Failed to parse family settings")
    }
  }

  async updateLocale(locale: FamilySettingsIn): Promise<FamilySettings> {
    const response = await fetch(familySettingsUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: extractAuthTokenFromLocalStorage(),
      },
      body: JSON.stringify(locale),
    })

    if (!response.ok) {
      throw new Error("Failed to update locale")
    }

    const data = await response.json()
    try {
      const parsedData = familySettingsSchema.parse(data)
      return parsedData
    } catch (error) {
      throw new Error("Failed to parse family settings")
    }
  }
}

export const familySettingsService = new EphemeralTasksService()
