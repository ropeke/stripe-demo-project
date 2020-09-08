import React, { useState, useEffect } from 'react';

import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    var response = fetch('/secret').then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      var clientSecret = responseJson.client_secret;
      setClientSecret(clientSecret);

      // For Testing Purposes
      //console.log(clientSecret);
      //console.log(typeof(clientSecret));
    });
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    event.preventDefault();
    setProcessing(true);

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
      setError(`Payment failed ${result.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={processing || disabled || succeeded} id="submit" >
        <span id="button-text">
          {processing ? (
          <div className="spinner" id="spinner"></div>
            ) : ( "Pay" )}
              </span>
      </button>
    {/* Show any error that happens when processing the payment */}

      {error && ( <div className="card-error" role="alert"> {error}
          </div>
        )}
        {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
      Payment succeeded, see the result in your
      <a href={`https://dashboard.stripe.com/test/payments`}>
      {" "} Stripe dashboard.
      </a> Refresh the page to pay again.
    </p>
    </form>
    );
  }
