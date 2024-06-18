import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import "./checkout-scss/checkout.styles.css";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartDropdownContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div>
          <span>Product</span>
        </div>
        <div>
          <span>Description</span>
        </div>
        <div>
          <span>Quantity</span>
        </div>
        <div>
          <span>Price</span>
        </div>
        <div>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        // const {id,quantity,name} = item;
        return <CheckoutItem key={item.id} cartItem={item}></CheckoutItem>;
      })}
      <span className="total"> Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
