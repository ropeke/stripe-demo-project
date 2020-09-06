import time
import stripe
from flask import Flask
from flask import jsonify


app = Flask(__name__)

# development key
stripe.api_key = 'sk_test_51HNxK7AbF325ZdP8sgeW8exTLBOf2nTHci6p2znGs5pJNDPFeLioc6iKacW4tUvZZwUFwHnH12r260YmQlunO0Hu0095Qffm1E'

@app.route('/time')
def get_current_time():
	return {'time': time.time()}


@app.route('/secret')
def secret():
  intent = stripe.PaymentIntent.create(
    amount=2999,
    currency='usd',
    # Verify your integration in this guide by including this parameter
    payment_method_types=["card"],
    metadata={'integration_check': 'accept_a_payment'},
  )
  print(type(intent['client_secret']))
  print(intent['client_secret'])
  return jsonify({'client_secret': intent['client_secret']})
