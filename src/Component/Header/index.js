import {Link, useNavigate} from "react-router-dom" // Inplace of withRouter using useNavigate method => to navigate the path from one path to another path 
import Cookies from "js-cookie"
import {CartContext} from "../../Context/CartContext"
import React, {useContext} from "react"

import "./index.css"

const Header = () => {
  const navigate = useNavigate();
  const {cartList} = useContext(CartContext)

   const onClickLogout = () => {
      // console.log("clicked")
    // console.log(history) = props   => // this history props are not work in latest versions , so to get props we use useNavigate to navigate the path directly without using any props..
    Cookies.remove("jwt_token")
    navigate("/login")
  }

 const renderCartItemCount = () => {

  const CartListCount = cartList.length 

  return (
    <>
      {CartListCount > 0 ? (
        <span className= "cart-count-badge">{CartListCount}</span>
      ) : null}
    </>
  )
      }
  

  return (
    // <nav >
    //   <ul className="nav-container">
    //     <li className="link"><Link to = "/">Home</Link></li>
    //     <li  className="link"><Link to = "/products">Products</Link></li>
    //     <li  className="link"><Link to = "/cart">Cart {renderCartItemCount()}</Link></li>
    //     <button type="button"  className="link" onClick = {onClickLogout}>Logout</button>
    //   </ul>
    // </nav>

    <nav className="nav-header">
    <div className="nav-content">
      <div className="nav-bar-mobile-logo-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
        </Link>

        <button type="button" className="nav-mobile-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="nav logout"
            className="nav-bar-image"
            onClick={onClickLogout}
          />
        </button>
      </div>

      <div className="nav-bar-large-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/cart" className="nav-link">
              Cart
              {renderCartItemCount()}
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
    <div className="nav-menu-mobile">
      <ul className="nav-menu-list-mobile">
        <li className="nav-menu-item-mobile">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              alt="nav home"
              className="nav-bar-image"
            />
          </Link>
        </li>

        <li className="nav-menu-item-mobile">
          <Link to="/products" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
              alt="nav products"
              className="nav-bar-image"
            />
          </Link>
        </li>
        <li className="nav-menu-item-mobile">
          <Link to="/cart" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav cart"
              className="nav-bar-image"
            />
            {renderCartItemCount()}
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  
  )
}
    
  
  export default Header
  