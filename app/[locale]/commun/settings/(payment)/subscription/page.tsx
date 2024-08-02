"use client"

import { Elements } from "@stripe/react-stripe-js"

import { CheckoutForm } from "@/components/settings/payment/checkout-form"
import { PlanCard } from "@/components/settings/payment/plan-card"
import { planService } from "@/lib/services/plans"
import { useScopedI18n } from "@/locales/client"
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
  const scopedT = useScopedI18n("subscription-page")

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
      <h1 className="text-3xl font-bold text-center">{scopedT("choose-plan")}</h1>
      <div className="flex gap-2 justify-center flex-wrap">
        <PlanCard
          name={scopedT("free")}
          description={scopedT("free-description")}
          btnText={scopedT("btn-text-free")}
          features={[
            `${data.FREE.max_members} ${scopedT("member")}`,
            `${data.FREE.max_possible_tasks} ${scopedT("task")}`,
            `${data.FREE.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
          ]}
          noFeatures={[scopedT("feature-support"), scopedT("feature-new")]}
        />
        <PlanCard
          name={scopedT("basic")}
          description={scopedT("basic-description")}
          btnText={scopedT("btn-text-basic")}
          features={[
            `${data.BASIC.max_members} ${scopedT("member")}`,
            `${data.BASIC.max_possible_tasks} ${scopedT("task")}`,
            `${data.BASIC.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
            scopedT("feature-support"),
            scopedT("feature-new"),
          ]}
          amount={data.BASIC.amount_cent / 100}
          reduction={data.BASIC.reduction}
          action={() => onSelectedPlan("BASIC")}
        />
        <PlanCard
          name={scopedT("premium")}
          description={scopedT("premium-description")}
          btnText={scopedT("btn-text-premium")}
          features={[
            `${data.PREMIUM.max_members} ${scopedT("member")}`,
            `${data.PREMIUM.max_possible_tasks} ${scopedT("task")}`,
            `${data.PREMIUM.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
            scopedT("feature-support"),
            scopedT("feature-support-more"),
            scopedT("feature-new"),
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
