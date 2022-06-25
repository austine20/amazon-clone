import React from 'react';
import '../Styles/Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const[{basket, user}, dispatch] = useStateValue();
    return (
        <div className='checkout'>
            <div className="Checkout__left">
                <img
                className='Checkout__ad'
                src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt=""
                />

                <div>
                    <p className='Checkout__bar'>Hello, {user?.email}</p>
                    <h2 className="Checkout__title">
                        Your Shopping Basket
                    </h2>
                    {basket.map((item, index)=> (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className="Checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
