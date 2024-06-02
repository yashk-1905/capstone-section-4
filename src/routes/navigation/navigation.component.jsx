//over here we are going to use Link

import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
const Navigation = () => {
    return(
      // we are gonna use fragment here instead of div it's additional
      // <div>
      <>
        <div className="navigation">
          <Link className="logo-container" to='/'>
            <div>Logo</div>
          </Link>
          <div className="links-container">
            {/* in the to of the Link will come the path where the link should head us on to  over here /shop will send us to the Shop component rendered below the navigation bar instead of the categories */}
            <Link className="nav-link" to= '/shop'> 
              SHOP
            </Link>
          </div>
        </div>     
          <Outlet></Outlet>
      </>
      // </div>
    )
  }

export default Navigation;