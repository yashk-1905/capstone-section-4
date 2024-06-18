import { useContext } from 'react';
import Button from '../button/button.component';
import './product-card-scss/product-card.styles.css'
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product
    const {addItemToCart} = useContext(CartDropdownContext);
    const addProductToCart = ()=>addItemToCart(product)
    return(
        <div className='product-card-container'>
            <img  src={imageUrl} alt={`${name}`}></img>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType = 'inverted' onClick = {addProductToCart}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;