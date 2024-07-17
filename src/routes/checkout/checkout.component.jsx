import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import "./checkout-scss/checkout.styles.css";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { SignInContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartDropdownContext);
  const { currentUser } = useContext(SignInContext);
  const navigate = useNavigate();

  return (
    <>
      {currentUser ? (
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
          {cartTotal == 0 ? (
            <span className="total-zero"> Cart is Empty </span>
          ) : (
            <span className="total"> Total: ${cartTotal}</span>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Checkout;
