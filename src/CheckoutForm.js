import React, { useState, useEffect } from 'react';

import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    var response = fetch('/secret').then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      var clientSecret = responseJson.client_secret;
      setClientSecret(clientSecret);
      console.log(clientSecret);
      console.log(typeof(clientSecret));
      // Call stripe.confirmCardPayment() with the client secret.
    });
  }, []);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    console.log(clientSecret);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <CardSection />
    <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
