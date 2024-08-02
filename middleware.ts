// middleware.ts
import { languages } from "@/lib/app-types"
import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest } from "next/server"

const I18nMiddleware = createI18nMiddleware({
  locales: languages,
  defaultLocale: "en",
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|static|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
}
