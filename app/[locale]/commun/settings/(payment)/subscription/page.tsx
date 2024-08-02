"use client"

import { Elements } from "@stripe/react-stripe-js"

import { CheckoutForm } from "@/components/settings/payment/checkout-form"
import { PlanCard } from "@/components/settings/payment/plan-card"
import { familySettingsService } from "@/lib/services/family-settings"
import { planService } from "@/lib/services/plans"
import { useScopedI18n } from "@/locales/client"
import { loadStripe } from "@stripe/stripe-js"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function SubscriptionPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
  const query1 = useQuery({ queryKey: ["plansInformations"], queryFn: planService.getPlans })
  const query2 = useQuery({ queryKey: ["familySettings"], queryFn: familySettingsService.getFamilySettings })
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

  if (query1.isLoading || query2.isLoading) {
    return <div>Loading...</div>
  }

  if (query1.isError || query2.isError) {
    return <div>Error...</div>
  }

  if (!query1.data || !query2.data) {
    return <div>No data...</div>
  }

  const handleReturn = () => {
    setIsFormVisible(false)
    setClientSecret(null)
  }

  if (isFormVisible && clientSecret) {
    return (
      <div className="flex flex-col gap-5">
        <ArrowLeft className="cursor-pointer" onClick={() => handleReturn()} />
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    )
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
            `${query1.data.FREE.max_members} ${scopedT("member")}`,
            `${query1.data.FREE.max_possible_tasks} ${scopedT("task")}`,
            `${query1.data.FREE.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
          ]}
          noFeatures={[scopedT("feature-support"), scopedT("feature-new")]}
        />
        <PlanCard
          name={scopedT("basic")}
          description={scopedT("basic-description")}
          btnText={
            query2.data.subscription_plan === "BASIC" || query2.data.subscription_plan === "PREMIUM"
              ? scopedT("btn-text-basic-on")
              : scopedT("btn-text-basic")
          }
          features={[
            `${query1.data.BASIC.max_members} ${scopedT("member")}`,
            `${query1.data.BASIC.max_possible_tasks} ${scopedT("task")}`,
            `${query1.data.BASIC.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
            scopedT("feature-support"),
            scopedT("feature-new"),
          ]}
          amount={query1.data.BASIC.amount_cent / 100}
          reduction={query1.data.BASIC.reduction}
          action={
            query2.data.subscription_plan === "BASIC" || query2.data.subscription_plan === "PREMIUM" ? undefined : () => onSelectedPlan("BASIC")
          }
        />
        <PlanCard
          name={scopedT("premium")}
          description={scopedT("premium-description")}
          btnText={query2.data.subscription_plan === "PREMIUM" ? scopedT("btn-text-basic-on") : scopedT("btn-text-premium")}
          features={[
            `${query1.data.PREMIUM.max_members} ${scopedT("member")}`,
            `${query1.data.PREMIUM.max_possible_tasks} ${scopedT("task")}`,
            `${query1.data.PREMIUM.max_ephemeral_tasks} ${scopedT("ephemeral")}`,
            scopedT("feature-support"),
            scopedT("feature-support-more"),
            scopedT("feature-new"),
          ]}
          amount={query1.data.PREMIUM.amount_cent / 100}
          reduction={query1.data.PREMIUM.reduction}
          action={query2.data.subscription_plan === "PREMIUM" ? undefined : () => onSelectedPlan("PREMIUM")}
        />
      </div>
    </div>
  )
}
