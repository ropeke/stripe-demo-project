import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51HNxK7AbF325ZdP8Eo6OKQvUZHnvxpA1Dow6ProE0u4MOZZdva8wk1U09ayXNGsGFg2ltlL3CzyjJUGOR5fEwLzE0087mksy9w");

function App() {
  //const [currentTime, setCurrentTime] = useState(0);./

  //var response = fetch('/secret').then(function(response) {
  //  return response.json();
  //}).then(function(responseJson) {
  //  var clientSecret = responseJson.client_secret;
    // Call stripe.confirmCardPayment() with the client secret.
  //});

  return (

    <div className="App">

    <header className="App-header">

    <div className="Checkout">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>

    ... no changes in this part ...

     <p>The current time is 9:11.</p>
    </header>
    </div>
  );
}

export default App;
