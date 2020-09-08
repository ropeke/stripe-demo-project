This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Rotimi`s Stripe Demo Implementation

Welcome to Rotimi`s Demo Project - please follow the listed instructions to test the integration built using Stripes PaymentIntent module.

# Instructions
1. First git clone this repository's URL into your workspace
2. In the main project folder, run `npm install` to install the packages needed to support the server
3. Jump into the `flask_backend` folder, and then run two steps in order to setup your virtual environment (1) `python -m venv venv` (2) `venv\scripts\activate`
4. Make sure you have the all of the necessary python packages in order to run your server, please run (1) `pip install flask python-dotenv` in order to run the server from your machine and (2) `pip install stripe`, to make sure you leverage Stripe's server-side API calls
5. Navigate back to the main project folder and type out `npm run-script start-server`
6. In another tab (w/o virtual environment running), type out `npm start`
7. Test away!
