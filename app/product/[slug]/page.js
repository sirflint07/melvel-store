'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { FaChevronLeft, FaCartShopping } from 'react-icons/fa6';
import { useAnimationControls, motion, MotionConfig } from 'framer-motion';
import { BsStarFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { homeProducts, shoeSizes, shoeColors } from '@/constants';
import { Store } from '@/components/contexts/AddToCart';
import { CiCircleRemove } from 'react-icons/ci';

const slideVariants = {
  slide: { x: [0, 350, 0] },
  slideX: { x: [0, -350, 0] },
};

function ProductPage({ params }) {
  const controls = useAnimationControls();
  const { slug } = params;
  const product = homeProducts.find(item => item.slug === slug);
  if (!product) notFound();

  const [loveColor, setLoveColor] = useState(false);
  const [sizeChoice, setSizeChoice] = useState(null);
  const [colorChoice, setColorChoice] = useState('Black');

  const { state, dispatch } = useContext(Store);
  const existItem = state.cartItems.find(item => item.slug === product.slug);
  const currentQty = existItem ? existItem.quantity : 0;

  const addToCartHandler = () => {
    const nextQty = currentQty + 1;
    if (product.countInStock < nextQty) {
      return window.alert('Sorry, product is out of stock');
    }
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCartHandler = () => {
    if (currentQty > 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: product });
    }
  };

  const handleClear = () => dispatch({ type: 'CLEAR_ITEM', payload: product });
  const handleLoveChange = () => setLoveColor(prev => !prev);
  const handleSizeChange = size => setSizeChoice(size);
  const handleColorChange = color => setColorChoice(color);
  const handleSlide = () => controls.start('slide');
  const handleSlideLeft = () => controls.start('slideX');

  // Animation config
  const transition = { duration: 5, ease: 'backInOut' };

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 flex flex-col items-center mt-10">
        {/* Back + Cart Icon */}
        <div className="flex justify-between w-full lg:w-10/12 mb-8">
          <Link href="/" className="flex items-center text-gray-400">
            <FaChevronLeft size={20} /> <span className="ml-2">Back</span>
          </Link>
          <Link href="/cart" className="relative text-gray-700">
            {state.cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {state.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
            <FaCartShopping size={24} />
          </Link>
        </div>

        {/* Image Slider */}
        <div className="flex items-center w-full lg:w-10/12 mb-6">
          <FaChevronCircleLeft
            onClick={handleSlideLeft}
            size={24}
            className="hidden md:block cursor-pointer"
          />
          <div className="mx-4 flex-1 bg-blue-50 rounded-2xl h-60 md:h-80 overflow-hidden">
            <MotionConfig transition={transition}>
              <motion.div
                variants={slideVariants}
                animate={controls}
                className="flex justify-center items-center h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </motion.div>
            </MotionConfig>
          </div>
          <FaChevronCircleRight
            onClick={handleSlide}
            size={24}
            className="hidden md:block cursor-pointer"
          />
        </div>

        {/* Divider */}
        <hr className="w-full lg:w-10/12 border-gray-300 opacity-30 mb-6" />

        {/* Details Section */}
        <div className="w-full lg:w-10/12 space-y-6">
          {/* Title, Rating, Price */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
                {product.name}
              </h1>
              <div className="flex items-center mt-2">
                {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                  <BsStarFill key={i} color="#ffb500" />
                ))}
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
              <p className="mt-1 text-xl font-semibold">${product.price}</p>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <button
                onClick={handleLoveChange}
                className="p-2 rounded-full border border-gray-300"
              >
                <FaHeart color={loveColor ? '#FF0000' : '#cecece'} />
              </button>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={addToCartHandler}
                  className="px-4 py-2"
                >
                  +
                </button>
                <span className="px-4 py-2">{currentQty}</span>
                <button
                  onClick={removeFromCartHandler}
                  className="px-4 py-2"
                >
                  –
                </button>
                <button
                  onClick={handleClear}
                  className="px-3 py-2 text-red-500"
                >
                  <CiCircleRemove size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Sizes</p>
            <div className="flex flex-wrap gap-3">
              {shoeSizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSizeChange(s.size)}
                  className={`px-4 py-2 border rounded ${
                    sizeChoice === s.size
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:ring-2 hover:ring-blue-600'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Color</p>
            <div className="flex flex-wrap gap-3">
              {shoeColors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleColorChange(c.color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    colorChoice === c.color
                      ? 'ring-2 ring-blue-600 hover:animate-pulse'
                      : 'ring-0'
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Description</p>
            <p className="text-gray-700 text-sm">
              {product.description}
            </p>
          </div>

          {/* Proceed to Cart */}
          <Link
            href="/cart"
            className="block text-center bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Proceed to Cart
          </Link>
        </div>
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(ProductPage), {
  ssr: false,
});
