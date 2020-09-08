import stripe
from flask import Flask, request
from flask import jsonify


app = Flask(__name__)

# development key
stripe.api_key = 'sk_test_51HNxK7AbF325ZdP8sgeW8exTLBOf2nTHci6p2znGs5pJNDPFeLioc6iKacW4tUvZZwUFwHnH12r260YmQlunO0Hu0095Qffm1E'
endpoint_secret = 'whsec_BvlBHNNtIcHWYAfFqY4HlZH9UD8V4FCQ'

@app.route('/secret')
def secret():
	intent = stripe.PaymentIntent.create(
	amount=699,
	currency='usd',
	# Verify your integration in this guide by including this parameter
	payment_method_types=["card"],
	metadata={'integration_check': 'accept_a_payment'},
	)
	print(type(intent['client_secret']))
	print(intent['client_secret'])
	return jsonify({'client_secret': intent['client_secret']})

@app.route("/stripe_webhook", methods=["POST"])
def stripe_webhook():

	payload = request.get_data(as_text=True)
	sig_header = request.headers.get('Stripe-Signature')
	event = None

	try:
		event = stripe.Webhook.construct_event(
		payload, sig_header, endpoint_secret
		)
	except ValueError as e:
		# Invalid payload
		return 'Invalid Payload', 400

			# Handle the event
	if event.type == 'payment_intent.succeeded':
		payment_intent = event.data.object # contains a stripe.PaymentIntent
		print('PaymentIntent was successful!')

		f = open("order_details.txt", "a+")

		f.write(payload)
		f.write('\n\n')

		f.close()

		#print(payload)
		# f.write()

	elif event.type == 'payment_method.attached':
		payment_method = event.data.object # contains a stripe.PaymentMethod
		print('PaymentMethod was attached to a Customer!')
	else:
		# Unexpected event type
		return 'Unexpected event type', 400

	return 'Success', 200
