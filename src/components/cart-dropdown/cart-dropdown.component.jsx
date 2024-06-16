import Button from '../button/button.component';
import './cart-dropdown-scss/cart-dropdown.styles.css';

const CartDropdown = () => {
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;