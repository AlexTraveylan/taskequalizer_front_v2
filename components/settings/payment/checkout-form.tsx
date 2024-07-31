import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

export const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

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
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Add a new payment method to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={!stripe}>
            Pay
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
