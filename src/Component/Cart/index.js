import Header from '../Header'
import React, { useContext } from 'react'
import {CartContext} from "../../Context/CartContext"
import CartSummary from "../CartSummary"
import CartListView from "../CartListView"
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
 const showEmptyView = cartList.length === 0

 const onClickRemoveAllBtn = () => {
  removeAllCartItems()
 }

  return (
  <div>
    <Header />
    {/* <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="cart"
        className="cartImage"
      />
    </div> */}

    {showEmptyView ? (
      <EmptyCartView /> 
    ): (
      <div className='cart-container'>
      <div className='cart-content-container'>
        <h1 className='cart-heading'>My Cart</h1>
        <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
        <CartListView />
        <CartSummary />
      </div>
    </div>
  
    )}
   </div>
  )
}

export default Cart
