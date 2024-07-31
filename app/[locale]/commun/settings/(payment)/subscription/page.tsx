"use client"

import { Elements } from "@stripe/react-stripe-js"

import { CheckoutForm } from "@/components/settings/payment/checkout-form"
import { PlanCard } from "@/components/settings/payment/plan-card"
import { planService } from "@/lib/services/plans"
import { loadStripe } from "@stripe/stripe-js"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function SubscriptionPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
  const { data, isError, isLoading } = useQuery({ queryKey: ["plansInformations"], queryFn: planService.getPlans })

  const onSelectedPlan = async (plan: "BASIC" | "PREMIUM") => {
    const checkoutSession = await planService.checkoutSession(plan)

    if (!checkoutSession) {
      return
    }

    setClientSecret(checkoutSession.client_secret)
    setIsFormVisible(true)
  }

  const options = {
    clientSecret: clientSecret || undefined,
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!data) {
    return <div>No data...</div>
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-center">Choose your plan</h1>
      <div className="flex gap-2 justify-center flex-wrap">
        <PlanCard
          name="Free"
          description="Free plan"
          btnText="Include"
          features={[
            `${data.FREE.max_members} membres`,
            `${data.FREE.max_possible_tasks} tâches possibles`,
            `${data.FREE.max_ephemeral_tasks} tâches éphémères`,
          ]}
          noFeatures={["Me soutenir", "Financer les nouveautés"]}
        />
        <PlanCard
          name="Basic"
          description="Basic plan"
          btnText="Upgrade"
          features={[
            `${data.BASIC.max_members} membres`,
            `${data.BASIC.max_possible_tasks} tâches possibles`,
            `${data.BASIC.max_ephemeral_tasks} tâches éphémères`,
            "Me soutenir",
            "Financer les nouveautés",
          ]}
          amount={data.BASIC.amount_cent / 100}
          reduction={data.BASIC.reduction}
          action={() => onSelectedPlan("BASIC")}
        />
        <PlanCard
          name="Premium"
          description="Premium plan"
          btnText="Upgrade"
          features={[
            `${data.PREMIUM.max_members} membres`,
            `${data.PREMIUM.max_possible_tasks} tâches possibles`,
            `${data.PREMIUM.max_ephemeral_tasks} tâches éphémères`,
            "Me soutenir",
            "Me soutenir encore plus",
            "Financer les nouveautés",
          ]}
          amount={data.PREMIUM.amount_cent / 100}
          reduction={data.PREMIUM.reduction}
          action={() => onSelectedPlan("PREMIUM")}
        />
      </div>

      {isFormVisible && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
