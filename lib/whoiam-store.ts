import { create } from "zustand"
import { Member } from "./schema/member"
import { familyService } from "./services/family"
import { memberService } from "./services/member"

type clientMember = {
  clientMember: Member | null
  fetchClientMember: () => Promise<void>
  cleanClientMember: () => void
}

export const useClientMember = create<clientMember>((set) => ({
  clientMember: null,
  fetchClientMember: async () => {
    const mmyId = await memberService.whoIam()
    const members = await familyService.getFamilyMembers()
    const member = members.find((m) => m.id === mmyId.member_id)
    if (member) {
      set({ clientMember: member })
    } else {
      set({ clientMember: null })
    }
  },
  cleanClientMember: () => set({ clientMember: null }),
}))
