import { useContext, useState } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation-scss/navigation.style.css'

import { Link, Outlet } from "react-router-dom";
import { SignInContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';
const Navigation = () => {
    const {currentUser, setShowNav, showNav} = useContext(SignInContext);
    console.log(currentUser);
    const {isCartOpen} = useContext(CartDropdownContext);
    const signUserOut = () =>  {
      signOutUser();
      setShowNav(false);
    }

    return(
      <>
        {/* <div className="navigation"> */}
        <div className={`${showNav ?'navigation':'navigation-hidden'}`}>
          <Link className="logo-container" to='/home'>
            <CrwnLogo className="logo"></CrwnLogo>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to= '/shop'> 
              SHOP
            </Link>
            {
              currentUser ? (
                <span 
                  className='nav-link' 
                  onClick={signUserOut}
                  >
                <Link className='nav-link' to = '/'>
                  SIGN OUT
                </Link>
                </span>
              ) :(  
                <Link className='nav-link' to = '/'>
                  SIGN IN
                </Link>
              )
            }
              <CartIcon></CartIcon>
          </div>
            {
              isCartOpen && <CartDropdown></CartDropdown>
            }          
        </div>     
          <Outlet></Outlet>
      </>
    )
  }

export default Navigation;