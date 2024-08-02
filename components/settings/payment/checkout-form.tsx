import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useScopedI18n } from "@/locales/client"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

export const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const scopedT = useScopedI18n("checkout-form")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/commun/settings/payment-success`,
      },
    })

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{scopedT("form-title")}</CardTitle>
          <CardDescription>{scopedT("form-description")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={!stripe}>
            {scopedT("submit-button")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
