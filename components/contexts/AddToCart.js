"use client";

import { createContext, useEffect, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      const exist = state.cartItems.find((i) => i.slug === newItem.slug);
      const cartItems = exist
        ? state.cartItems.map((i) =>
            i.slug === newItem.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.cartItems, newItem];

      return { ...state, cartItems };
    }

    case "REMOVE_ITEM": {
      const exist = state.cartItems.find((i) => i.slug === action.payload.slug);
      if (!exist) return state;

      const cartItems =
        exist.quantity <= 1
          ? state.cartItems.filter((i) => i.slug !== action.payload.slug)
          : state.cartItems.map((i) =>
              i.slug === action.payload.slug
                ? { ...i, quantity: i.quantity - 1 }
                : i
            );

      return { ...state, cartItems };
    }

    case "CLEAR_ITEM": {
      const cartItems = state.cartItems.filter(
        (i) => i.slug !== action.payload.slug
      );
      return { ...state, cartItems };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    () => {
      if (typeof window === "undefined") {
        return initialState;
      }
      try {
        const raw = localStorage.getItem("cart");
        // Handle both undefined string and invalid JSON
        if (raw && raw !== "undefined") {
          return { cartItems: JSON.parse(raw) };
        }
        return { cartItems: [] };
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cart"); // Clear corrupted data
        return { cartItems: [] };
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}