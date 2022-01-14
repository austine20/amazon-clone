import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import axios from './axios';
import { db } from '../firebase';

function Payment() {
    const[{basket, user}, dispatch] = useStateValue();
    const history = useHistory();  
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
       //we generate the client secret here to enable payment with stripe
       const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                // Stripe expects the total in a currency subunits(e.g. kobo, cents, pence etc) so we multiply by 100]
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
       }
       getClientSecret();
    }, [basket]);
    console.log('client secret is >>>', clientSecret)
    const handleSubmit = async (e) => {
        //stripes functionalities goes in here
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            db
            .collection('users').doc(user?.uid)
            .collection('orders').doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = e => {
        //listen for changes in the CardElement
        //and display any errors as the customer types in their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }
    return (
        <div className='Payment'>
            <div className="Payment__container">
                <h1>
                    Checkout (
                    <Link to='/checkout'>
                        {basket?.length} item
                    </Link>
                    )
                </h1>
                <div className="Payment__section">
                    <div className="Payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="Payment__address">
                        <p>{user?.email}</p>
                        <p>111, React Haven</p>
                        <p>Lagos Nigeria</p>
                    </div>
                </div>

                <div className="Payment__section">
                    <div className="Payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="Payment__item">
                        {basket.map(item => (
                                <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="Payment__section">
                    <div className="Payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="Payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="Payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                   <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeperator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                    {
                                        processing ? <p>Processing</p> : 'Buy Now'
                                    }
                                </span>
                            </button>
                            </div>
                            {/* {for errors} */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
