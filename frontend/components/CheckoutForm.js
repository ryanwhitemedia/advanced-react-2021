import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function CheckoutForm() {
  return (
    <Elements stripe={stripeLib}>
      <Checkout />
    </Elements>
  );
}
