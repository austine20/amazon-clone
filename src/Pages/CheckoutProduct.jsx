import React from 'react';
import '../Styles/CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }
    return (
        <div className='Checkout__product'>
            <img className='Checkout__productImage' src={image} alt="" />

            <div className="Checkout__productInfo">
                <p className="Checkout__productTitle">
                    {title}
                </p>
                <p className="Checkout__productPrice">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="Checkout__productRating">
                    {Array(rating).fill().map((_, i) => {
                        return <p>⭐</p>
                    })}
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
