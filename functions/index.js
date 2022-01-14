const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51KH5cQC12ATKsSFIWut8kv4lVAT7829BiCMgVwVsI7xo7t5GutJsdjczmwk20BYgZx7NySljJQItvGuTvi62zKAn00BnSsY9ZI')

// creating an API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment recieved for this amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunit of the currency
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)

// example of an API endpoint
// http://localhost:5001/clone-6905e/us-central1/api).