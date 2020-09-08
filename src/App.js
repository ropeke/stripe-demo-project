import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51HNxK7AbF325ZdP8Eo6OKQvUZHnvxpA1Dow6ProE0u4MOZZdva8wk1U09ayXNGsGFg2ltlL3CzyjJUGOR5fEwLzE0087mksy9w");

function App() {

  return (

    <div className="App">

    <header className="App-header">

    <div className="Checkout">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
    </header>
    </div>
  );
}

export default App;
