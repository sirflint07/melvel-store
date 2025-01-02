// 'use client'

// import { useState } from 'react'
// import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'

// const initialItems = [
//   {
//     id: 1,
//     name: 'Premium Wireless Headphones',
//     price: 299.99,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
//     quantity: 1
//   },
//   {
//     id: 2,
//     name: 'Smart Watch Series X',
//     price: 399.99,
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
//     quantity: 1
//   }
// ]

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState(initialItems)

//   const updateQuantity = (id, change) => {
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     )
//   }

//   const removeItem = (id) => {
//     setCartItems(items => items.filter(item => item.id !== id))
//   }

//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//   const shipping = 15.00
//   const total = subtotal + shipping

//   return (
//     <>
//     <br/><br/>
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <ShoppingCart className="w-8 h-8" />
//             Shopping Cart
//           </h1>
//           <span className="text-gray-500">{cartItems.length} items</span>
//         </div>

//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6 space-y-6">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-gray-200 last:border-0">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
//                   <p className="text-lg font-medium text-gray-900 mt-1">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => updateQuantity(item.id, -1)}
//                     className="p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <Minus className="w-5 h-5" />
//                   </button>
//                   <span className="w-10 text-center font-medium">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(item.id, 1)}
//                     className="p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-medium text-gray-900">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => removeItem(item.id)}
//                     className="text-red-500 hover:text-red-600 flex items-center gap-1 mt-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-gray-50 p-6 rounded-b-lg">
//             <div className="space-y-2">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Shipping</span>
//                 <span>${shipping.toFixed(2)}</span>
//               </div>
//               <div className="h-px bg-gray-200 my-4"></div>
//               <div className="flex justify-between text-lg font-semibold">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//             <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }



"use client"

import Head from 'next/head';
import { useState } from 'react';

const Cart = () => {
    const [quantities, setQuantities] = useState(Array(5).fill(2));

    const handleQuantityChange = (index, delta) => {
        const newQuantities = [...quantities];
        newQuantities[index] = Math.max(1, newQuantities[index] + delta);
        setQuantities(newQuantities);
    };

    return (
        <div className="min-h-screen">
          <Head>
              <title>My Cart</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
          </Head>
          <div className="container mx-auto p-4">
              <header className="flex justify-between items-center py-4">
                  <h1 className="text-3xl font-bold">TrendHive</h1>
                  <nav className="space-x-4">
                      <a href="#" className="text-gray-700">Home</a>
                      <a href="#" className="text-gray-700">Collection</a>
                      <a href="#" className="text-gray-700">About Us</a>
                      <a href="#" className="text-gray-700">Contact</a>
                  </nav>
                  <div className="space-x-4">
                      <i className="fas fa-search text-gray-700"></i>
                      <i className="fas fa-shopping-cart text-gray-700"></i>
                  </div>
              </header>
              <div className="bg-white p-4 rounded-md shadow-md mb-4">
                  <nav className="text-gray-500 text-sm">
                      <a href="#" className="hover:underline">Home</a> &gt; <a href="#" className="hover:underline">Cart</a>
                  </nav>
              </div>
              <h2 className="text-2xl font-bold mb-4">My Cart</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                      {Array(5).fill().map((_, index) => (
                          <div key={index} className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4">
                              <img src={`https://placehold.co/100x100?text=Image${index+1}`} alt={`Product image ${index+1}`} className="w-24 h-24 rounded-md"/>
                              <div className="flex-1">
                                  <h3 className="text-lg font-semibold">Asher’s V-Neck Sweater</h3>
                                  <p className="text-gray-500">Size: XXL <span className="ml-4">Color: Black</span></p>
                                  <p className="text-gray-500">Stock Available: 21</p>
                              </div>
                              <div className="text-right">
                                  <p className="text-lg font-semibold">Price: 240$</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                      <button onClick={() => handleQuantityChange(index, -1)} className="px-2 py-1 border rounded-md">-</button>
                                      <span>{quantities[index]}</span>
                                      <button onClick={() => handleQuantityChange(index, 1)} className="px-2 py-1 border rounded-md">+</button>
                                      <button className="text-red-500"><i className="fas fa-trash"></i></button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-md">
                      <h3 className="text-lg font-semibold mb-4">Summary Order</h3>
                      <div className="flex justify-between mb-4">
                          <span>Subtotal</span>
                          <span className="font-semibold">240$</span>
                      </div>
                      <input type="text" placeholder="Add Discount Code" className="w-full p-2 border rounded-md mb-4"/>
                      <button className="w-full bg-primary text-white py-2 rounded-md font-semibold">Buy Now (5)</button>
                  </div>
              </div>
          </div>
        </div>
    );
};

export default Cart;