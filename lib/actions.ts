"use server"

import { cookies } from "next/headers"

export async function checkConnectionCookie() {
  const cookieStore = cookies()
  const auth_token = cookieStore.get("auth_token")

  return !!auth_token
}
