import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown-scss/cart-dropdown.styles.css';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const {cartItems, isCartOpen, setIsCartOpen} = useContext(CartDropdownContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('checkout');
        setIsCartOpen(!isCartOpen)
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((item) => {
                        return <CartItem key={item.id} cartItem={item}></CartItem>
                    })
                }
            </div>
            {/* <Link to='/checkout-page'> */}
                {/* <Button>GO TO CHECKOUT</Button> */}
            {/* </Link> */}
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;