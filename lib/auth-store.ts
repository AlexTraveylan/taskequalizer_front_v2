import { create } from "zustand"

type IsAuth = {
  isAuth: boolean
  authState: (state: boolean) => void
}

export const useIsAuth = create<IsAuth>((set) => ({
  isAuth: false,
  authState: (state) => set({ isAuth: state }),
}))
