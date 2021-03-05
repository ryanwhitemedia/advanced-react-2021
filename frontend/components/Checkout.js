import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

export default function Checkout() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. Stop form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);

    // 2. Start page transition
    nProgress.start();

    // 3. Create payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log({ error });
    if (error) {
      setError(error);
    }
    // 4. Handle Stripe error from stripe

    // 5. Send success token from step 3 to keystone server via custom mutation

    // 6. Change the page to view the order

    // 7. Close cart/

    // 8. Turn loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement></CardElement>
      <SickButton>Checkout</SickButton>
    </CheckoutFormStyles>
  );
}
