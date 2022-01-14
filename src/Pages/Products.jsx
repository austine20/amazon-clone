import React from 'react';
import '../Styles/Products.css';
import { useStateValue } from './StateProvider';

function Products({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }
    return (
        <div className='product'>
            <div className="Product__info">
                <p>{title}</p>
                <p className="Product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="Product__rating">
                   {Array(rating).fill().map((_, i) => {
                      return <p>⭐</p>
                   })}
                </div>
            </div>

            <img className='Product__image' src={image} alt="" />

            <button className="Product__button" onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Products
