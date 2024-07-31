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
    const parsedData = familySettingsSchema.parse(data)
    return parsedData
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
    const parsedData = familySettingsSchema.parse(data)
    return parsedData
  }
}

export const familySettingsService = new EphemeralTasksService()
