"use client"

import { createContext, useReducer } from "react"

export const Store = createContext()
const initialState = {cart: {cartItems: []}}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find(item => item.slug === newItem.slug)
            const cartItems = existingItem ? state.cart.cartItems.map((item) => {
                if (item.slug === newItem.slug) {
                    return { ...item, quantity: item.quantity + 1 }
                    }
            }) :
            [...state.cart.cartItems, newItem]
            return { ...state, cart: {...state.cart, cartItems } }
        default:
            return state
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const value = {state, dispatch};
    return (
        <Store.Provider value={value}>
        {children}
        </Store.Provider>
    )
    
}