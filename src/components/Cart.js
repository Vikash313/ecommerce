import React, { createContext, useReducer, useEffect } from "react";
import ContextCart from "./ContextCart";
import { products } from "./product";
import { reducer } from './reducer'

export const CartContext = createContext();

const initialState = {
    items:products,
    totalAmount: 0,
    totalItem: 0,
}
const Cart = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
// remove single Item
    const removeItem = (id) => {
        return dispatch({
            type:"REMOVE_ITEM",
            payload: id,
        })
    }
// remove all item
const clearCart = () => {
    return dispatch({
        type:"CLEAR_CART"
    })
}

// increment item
const increment = (id) => {
    return dispatch({
        type:"INCREMENT",
        payload:id,
    })
}

// decrement item
const decrement = (id) => {
    return dispatch({
        type:"DECREMENT",
        payload:id,
    })
}

useEffect(() => {
    dispatch({
        type:"GET_TOTAL",
    });
}, [state.items]);

  return (
    <CartContext.Provider value={{ ...state,removeItem,clearCart,increment, decrement}}>
      <ContextCart />
    </CartContext.Provider>
  );
};

export default Cart;
