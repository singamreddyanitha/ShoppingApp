import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CartProviderContext} from "../Context/CartContext"
// import React, { useState } from "react";
import LoginForm from "../Component/LoginForm";
import Home from "../Component/Home"
import NotFound from "../Component/NotFound";
import Products from "../Component/Products";
import Cart from "../Component/Cart";
import ProtectedRoute from "../Component/ProtectedRoute";
import ProductItemDetails from "../Component/ProductItemDetails"


const ParentComponent = () => {
  // const [cartList, setCartList] = useState([])
  // const addCartItem = product => {
  //   // check if the product is already in the cart 
  //   const productExist = cartList.find(item => item.id === product.id)
  //   if(productExist) {
  //     setCartList((prevState) =>{
  //       const updatedProduct = prevState.map(each => {
  //         if(product.id === each.id) {
  //           const updatedQuantity = each.quantity + product.quantity 

  //           return {...each, quantity: updatedQuantity}
  //         }
  //         return each 
  //       }) 
  //       return updatedProduct 
  //     })
  //   } else {
  //       // if product not present in cart, adding a new product to the cart 
  //       setCartList((prevState) => [...prevState, product])
  //   }
      
  // }

  // const removeAllCartItems = () => {
  //   setCartList([])
  // }

  // const deleteCartItem = id => {
  //   const updatedCartList = cartList.filter(eachCartItem => eachCartItem.id !== id)
  //   setCartList(updatedCartList)
  // }

  // const decrementCartItemQuantity = id => {
  //    const productObject = cartList.find(eachCartItem => eachCartItem.id === id) 
  //    if(productObject.quantity > 1) {
  //       setCartList(prevState => {
  //         const updatedQuantity = prevState.map(eachCartItem =>  {
  //           if(id === eachCartItem.id) {
  //             const newQuantity = eachCartItem.quantity - 1 
  //             return {...eachCartItem, quantity: newQuantity}
  //           }

  //           return eachCartItem
  //         })
  //         return updatedQuantity
  //       })
  //    } else {
  //          deleteCartItem(id)
  //    }
  // }

  // const incrementCartItemQuantity = id => {
  //   setCartList((prevState) => {
  //     const updatedQuantity = prevState.map(eachCartItem=> {
  //     if(eachCartItem.id === id) {
  //       const newQuantity = eachCartItem.quantity + 1 

  //       return {...eachCartItem, quantity: newQuantity}
  //     }

  //     return eachCartItem
  //   })
  //   return updatedQuantity
  // });
  // }
  
  return (
    <div>
    <Router>
    <CartProviderContext>

    {/* // <CartProviderContext
    // value = {{
    //   cartList,
    //   addCartItem,
    //   deleteCartItem,
    //   incrementCartItemQuantity,
    //   decrementCartItemQuantity,
    //   removeAllCartItems,
    // }}
    > */}
    <Routes>
    <Route exact path="/login" element={<LoginForm />} />
      <Route  element = {<ProtectedRoute/>}>
        <Route exact path="/" element={<Home />} />
        <Route exact path ="/products" element = {<Products />} /> 
        <Route exact path = "/cart" element = {<Cart />} />
        <Route exact path = "/products/:id" element = {<ProductItemDetails />} />   
      </Route>
      
      <Route path = "/not-found" element = {<NotFound/>} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
    </CartProviderContext>
  </Router>
  </div>
  )
}
  

export default ParentComponent;
