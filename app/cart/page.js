'use client';

import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CiCircleRemove } from 'react-icons/ci';
import { Store } from '@/components/contexts/AddToCart';
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';

function Cart() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { state, dispatch } = useContext(Store);
  const { cartItems } = state;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkoutHandler = async() => {
    try {
      const response = await fetch('http://localhost:4000/api/checkout',
        {method: 'GET', credentials: 'include'}
      );
      const { authenticated } = await response.json();
      if (!authenticated) {
        toast.error('Please log in to proceed to checkout', {
          autoClose: 3000,
          onClose: () => {
            setIsRedirecting(true);
            router.push('/login');
          }
        });
        return;
      } else {
        setIsRedirecting(true);
        router.push('/shipping');
      }
    } 
    catch (error) {
      return false;
    }
};
  
  

  return (
    <div className="min-h-screen bg-gray-50">
    {isRedirecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        </div>
      )}
      <Head>
        <title>My Cart</title>
      </Head>

      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">TrendHive</h1>
          <nav className="space-x-4 text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/collection">Collection</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="space-x-4 text-gray-700">
            <i className="fas fa-search"></i>
            <i className="fas fa-shopping-cart"></i>
          </div>
        </header>

       
        <div className="bg-white p-4 rounded-md shadow mb-4">
          <nav className="text-gray-500 text-sm">
            <Link href="/" className="hover:underline">Home</Link> &gt;{' '}
            <span className="hover:underline">Cart</span>
          </nav>
        </div>

        <h2 className="text-2xl font-bold mb-4">My Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 bg-gray-100 rounded-lg shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-2 13H5L3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 16h.01M8 16h.01M9 20a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
                </svg>
                <p className="text-lg font-semibold text-gray-700">Your cart is empty!</p>
                <p className="text-gray-500 mb-4">Start adding items to fill it up.</p>
                <Link
                  href="/"
                  className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition"
                >
                  🛒 Go Shopping
                </Link>
              </div>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.slug}
                  className="bg-white w-[80vw] md:w-[65vw] lg:w-[45vw] xl:w-[50vw] p-4 rounded-md shadow flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mx-auto"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Size: {item.size} <span className="ml-4">Color: {item.color}</span>
                    </p>
                    <p className="text-gray-500 text-sm">Stock: {item.countInStock}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                        className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                      >
                        –
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => {
                            if (item.countInStock < item.quantity + 1) {
                            return window.alert('Sorry, product is out of stock');
                        } else {
                            dispatch({ type: 'ADD_ITEM', payload: item })
                        }

                            }}
                        className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                    {/* Remove Item */}
                    <button
                      onClick={() => dispatch({ type: 'CLEAR_ITEM', payload: item })}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <CiCircleRemove size={20} />
                    </button>
                  </div>
                  {/* Price */}
                  <div className="mt-4 md:mt-0">
                    <p className="font-semibold">Price: ${item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <input
              type="text"
              placeholder="Discount code"
              className="w-full p-2 border rounded-md mb-4"
            />
            <button 
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            onClick={() => checkoutHandler()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
