"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useScopedI18n } from "@/locales/client"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

const SuccessfulPaymentPage: FC = () => {
  const scopedT = useScopedI18n("successful-payment")

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-center">{scopedT("title")}</CardTitle>
          <CardDescription className="text-center">{scopedT("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{scopedT("content")}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>{scopedT("footer")}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SuccessfulPaymentPage
