import { useContext } from 'react';
import './checkout-item-scss/checkout-item.styles.css';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';


const CheckoutItem = ({cartItem}) => {
    const {name,imageUrl,quantity,price} = cartItem;
    const {removeCartItem, reduceCartItem, addItemToCart} = useContext(CartDropdownContext);
    
    const removeCartItemHandler = () => {
        removeCartItem(cartItem);
    }
    
    const reduceCartItemHandler = () => {
        reduceCartItem(cartItem);
    }
    
    const addCartItemHandler = () => {
        addItemToCart(cartItem);
    }
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={reduceCartItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addCartItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeCartItemHandler}>&#x2715;</div>
        </div>
    )
}

export  default CheckoutItem;