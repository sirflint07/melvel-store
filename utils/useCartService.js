"use client"
import { useState } from 'react';

export const useCartService = () => {
  // Cart state
  const [cart, setCart] = useState({
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 10, // Default shipping price
    totalPrice: 0,
  });

  // Helper function to calculate prices
  const calculatePrices = (items) => {
    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = itemsPrice * 0.1; // Example tax rate: 10%
    const totalPrice = itemsPrice + taxPrice + cart.shippingPrice;

    return { itemsPrice, taxPrice, totalPrice };
  };

  // Add an item to the cart
  const addToCart = (product, size, color) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      let updatedItems = [...prevCart.items];

      if (existingItemIndex >= 0) {
        // If the item exists, increase the quantity
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // If the item doesn't exist, add it
        updatedItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity: 1,
        });
      }

      // Recalculate prices
      const { itemsPrice, taxPrice, totalPrice } = calculatePrices(updatedItems);

      return { ...prevCart, items: updatedItems, itemsPrice, taxPrice, totalPrice };
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => !(item.id === productId && item.size === size && item.color === color)
      );

      // Recalculate prices
      const { itemsPrice, taxPrice, totalPrice } = calculatePrices(updatedItems);

      return { ...prevCart, items: updatedItems, itemsPrice, taxPrice, totalPrice };
    });
  };

  // Update the quantity of a cart item
  const updateQuantity = (productId, size, color, quantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );

      // Recalculate prices
      const { itemsPrice, taxPrice, totalPrice } = calculatePrices(updatedItems);

      return { ...prevCart, items: updatedItems, itemsPrice, taxPrice, totalPrice };
    });
  };

  // Clear the cart
  const clearCart = () => {
    setCart({
      items: [],
      itemsPrice: 0,
      taxPrice: 0,
      shippingPrice: 10,
      totalPrice: 0,
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
