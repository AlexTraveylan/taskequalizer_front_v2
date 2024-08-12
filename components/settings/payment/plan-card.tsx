import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Ban, Check } from "lucide-react"

type PlanCardProps = {
  name: string
  description: string
  btnText?: string
  amount?: number
  reduction?: number
  features: string[]
  noFeatures?: string[]
  action?: () => void
}

type PriceLabelProps = {
  amount?: number
  reduction?: number
}

export function PriceLabel({ amount, reduction }: PriceLabelProps) {
  if (!amount) return <div>Free</div>

  if (!reduction) return <div>{amount} €</div>

  const formater = new Intl.NumberFormat("fr", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex items-end gap-1">
      <div>{formater.format(amount * (1 - reduction))}€</div>
      <div className="text-lg text-gray-400 line-through">{formater.format(amount)} €</div>
    </div>
  )
}

export function PlanCard({ name, description, btnText, amount, reduction, features, noFeatures, action }: PlanCardProps) {
  return (
    <Card className="flex min-h-[428px] w-[300px] flex-col rounded-3xl p-8">
      <h2 className="mb-5 text-xl font-medium">{name}</h2>

      <div className="mb-5 flex items-end text-5xl font-black">
        <PriceLabel amount={amount} reduction={reduction} />
      </div>
      <p className="mb-5">{description}</p>
      <ul className="mb-10 flex flex-col gap-y-2">
        {features.map((feature, i) => (
          <li key={`${i + 100}${feature}`} className="flex items-center gap-2">
            <Check className="text-green-800" strokeWidth={1.4} />
            <p>{feature}</p>
          </li>
        ))}
        {noFeatures?.map((feature, i) => (
          <li key={`${i + 1000}${feature}`} className="flex items-center gap-2">
            <Ban className="text-red-400" strokeWidth={1.4} />
            <p>{feature}</p>
          </li>
        ))}
      </ul>

      <Button onClick={action && action} disabled={!action} className="mt-auto">
        {btnText}
      </Button>
    </Card>
  )
}
