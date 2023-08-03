// import React from "react"

// const CartContext = React.createContext({
//     cartList: [],
//     addCartItem: () => {},
//     deleteCartItem: () => {},
//     decrementCartItemQuantity: () => {},
//     incrementCartItemQuantity: () => {}
// })

// export default CartContext

import { createContext, useState } from "react";

export const CartContext = createContext();


export const CartProviderContext = ({children}) => {
    const [cartList, setCartList] = useState([]);

     const addCartItem = product => {
    // check if the product is already in the cart 
    const productExist = cartList.find(item => item.id === product.id)
    if(productExist) {
      setCartList((prevState) =>{
        const updatedProduct = prevState.map(each => {
          if(product.id === each.id) {
            const updatedQuantity = each.quantity + product.quantity 

            return {...each, quantity: updatedQuantity}
          }
          return each 
        }) 
        return updatedProduct 
      })
    } else {
        // if product not present in cart, adding a new product to the cart 
        setCartList((prevState) => [...prevState, product])
    }
      
  }

    const deleteCartItem = id => {
        const updatedCartList = cartList.filter(eachCartItem => eachCartItem.id !== id)
        setCartList(updatedCartList)
    }

const decrementCartItemQuantity = id => {
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id) 
    if(productObject.quantity > 1) {
       setCartList(prevState => {
         const updatedQuantity = prevState.map(eachCartItem =>  {
           if(id === eachCartItem.id) {
             const newQuantity = eachCartItem.quantity - 1 
             return {...eachCartItem, quantity: newQuantity}
           }

           return eachCartItem
         })
         return updatedQuantity
       })
    } else {
          deleteCartItem(id)
    }
 }

const incrementCartItemQuantity = id => {
          setCartList((prevState) => {
            const updatedQuantity =  prevState.map(eachCartItem=> {
            if(eachCartItem.id === id) {
              const  newQuantity = eachCartItem.quantity + 1 
      
              return {...eachCartItem, quantity: newQuantity}
            }
      
            return eachCartItem
          }) 
          return updatedQuantity
        })
    }

    const removeAllCartItems = () => {
          setCartList([])
        }


const value = {cartList, addCartItem, deleteCartItem, incrementCartItemQuantity, decrementCartItemQuantity, removeAllCartItems}

    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
};
