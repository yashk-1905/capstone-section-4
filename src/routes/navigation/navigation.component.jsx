//over here we are going to import the crown svg as component of react

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
// we are also now gonna import the style files 
import './navigation-scss/navigation.style.css'

import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
const Navigation = () => {
    return(
      <>
        <div className="navigation">
          <Link className="logo-container" to='/'>
            <CrwnLogo className="logo"></CrwnLogo>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to= '/shop'> 
              SHOP
            </Link>
            <Link className='nav-link' to = '/signIn'>
              SIGN IN
            </Link>
          </div>
        </div>     
          <Outlet></Outlet>
      </>
      // </div>
    )
  }

export default Navigation;