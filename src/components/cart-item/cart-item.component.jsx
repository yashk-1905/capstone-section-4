import './cart-tem-scss/cart-item.styles.css';

const CartItem = ({cartItem}) => {
    const {name, imageUrl,price,quantity} = cartItem;
    return(
        <div className='cart-item-container'>
            <img src={`${imageUrl}`} alt={`${name}`}></img>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
                <span className='total'>Total: ${quantity * price}</span>
            </div>
        </div>
    )
}

export default CartItem;