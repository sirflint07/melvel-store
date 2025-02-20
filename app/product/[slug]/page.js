"use client"

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useAnimationControls, motion, MotionConfig } from 'framer-motion';
import { BsStarFill } from 'react-icons/bs';
import { FaHeart } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { homeProducts, shoeSizes, shoeColors } from '../../../constants/index';
import { Store } from '@/components/contexts/AddToCart';


const ProductPage = ({params}) => {

  const controls = useAnimationControls()
  const {slug} = params
  const product = homeProducts.find((item) => item.slug === slug)
  const [loveColor, setloveColor] = useState(false)
  const handleLoveChange = () => {
    setloveColor(!loveColor)
  }
  const  slideVariants = {
    slide: {
      x: [0, 350, 0]
    },
    slideX: {
      x: [0, -350,0]
    }
  }

  const handleSlide = () => {
    controls.start('slide')
  }
  const handleSlideLeft = () => {
    controls.start('slideX')
  }

    
if (!product) {
  notFound();
}

const [sizeChoice, setSIzeChoice] = useState(null)

// function to store and handle size choice
const handleSizeChange = (size, i) => {
  setSIzeChoice(size)
}

// handling of color choice
const [colorChoice, setColorChoice] = useState("Black");
const handleShoeChoice = (color) => {
    setColorChoice(color)
}

const { state, dispatch } = useContext(Store)
  const addToCartHandler = () => {
    dispatch({type: 'ADD_ITEM', payload: {...product, quantity: 1}})
  }

  return (
    <section>
      <div className='mt-20 sm:w-[95vw] md:w-10/12 lg:w-11/12 mx-auto flex items-center flex-col'>
      <div>
      <br /><br/>
      </div>
      <div className='flex justify-between md:w-9/12 mx-auto mb-8 max-md:w-[80vw]'>
        <div className='flex items-center'><a className='flex items-center' href='/'><FaChevronLeft className='text-gray-400' size={20}/><span className='pl-2 text-base font-semibold text-gray-400'>Back</span></a></div>
        <div className='bg-slate-100 relative rounded-full h-10 w-10 content-center place-content-center'>
        <span className='bg-red-600 w-4 h-4 rounded-full absolute -top-2 -right-1 flex justify-center items-center text-xs text-white'>1</span>
        <FaCartShopping className='mx-auto' size={20}/>
        </div>
      </div>
      <div className='flex justify-between items-center w-10/12 max-lg:gap-6 lg:gap-2'>
      <FaChevronCircleLeft onClick={handleSlideLeft} size={21} className='max-md:hidden md:visible'/>
        <div className='max-md:mx-auto bg-blue-50 max-md:w-[80vw] md:w-[70vw] max-sm:h-[30vh] h-[40vh] rounded-2xl place-content-center place-items-center'>
        <MotionConfig
        transition= {{
        duration: 5, ease: 'backInOut'
      }}
        >
        <motion.div
        variants={slideVariants}
        animate={controls} 
        className='flex flex-col items-center'>
          <div>
          <Image src={product.image} alt='image' width={250} height={250} className='object-contain z-10'/>
          </div>
          <div className='h-2 w-20 blur-md bg-black rounded-full -mt-2 z-0 opacity-10'></div>
          </motion.div>
          </MotionConfig>
        </div>
        <FaChevronCircleRight onClick={handleSlide} size={21} className='max-md:hidden md:visible'/>
      </div>
    </div>

    <div 
    className='max-md:w-[75vw] md:w-[60vw] lg:w-[65vw] border border-bluedark mb-5 mt-10 border-opacity-10 mx-auto'></div>
    <section className='max-md:w-[80vw] md:w-[60vw] lg:w-[65vw] mx-auto py-3'>
    <div 
    className='flex justify-between mx-auto'>
      <div>
        <p className='md:text-2xl font-bold text-blue-950 max-md:text-base'>{product.name}</p>
          <div className='flex mt-2 items-center max-sm:pt-2'>
          {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
            <BsStarFill key={index} color="#ffb500" />
          ))}
          <p className="font-semibold opacity-70 ml-2">(<span className='italic px-[2px]'>{product.rating}</span>)</p>
          </div>
          <p className='text-lg font-normal tracking-wider mt-1'>${product.price}</p>
        </div>
        <div className='flex flex-col items-end'>
            <div
            className='w-10 h-10 rounded-full border border-gray-300 border-opacity-75 flex items-center justify-center group '>
              <FaHeart size={20} 
              className='cursor-pointer' 
              color={loveColor ? '#cecece' : '#FF0000'}
              onClick={handleLoveChange}/>
            </div>
            <div className='border border-gray-300 border-opacity-80 flex justify-evenly rounded-xl mt-4 items-center'>
                <div
                 onClick={addToCartHandler}
                className='md:py-3 md:px-5 font-medium text-lg max-md:py-2 max-md:px-3'
                >
                +
                </div>
                <div className='md:py-3 md:px-5 text-base max-md:py-2 max-md:px-3'>
                5
                </div>
                <div 
                className='md:py-3 md:px-5 font-medium max-md:text-sm md:text-lg max-md:py-2 max-md:px-3'>
                -
                <span className='-ml-1'>-
                </span>
                </div>
            </div>
        </div>
    </div>
      <div className='py-4'>
          <p className='pb-4 font-semibold text-gray-500'>Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            {shoeSizes.map((shoe, index) => (
              <button
              onClick={() => handleSizeChange(shoe.size, index)}
              key={index} className={`sizes-btn ${sizeChoice === shoe.size ? 'bg-bluedark text-slate-200 shadow-sm' : ''}`}>{shoe.size}</button>
            ))}
          </div>
      </div>
      <div className='pt-4'>
          <p className='pb-2 font-semibold text-gray-500'>Color</p>
          <div className='flex gap-3 flex-wrap'>
            {
              shoeColors.map((shoe, index) => (
                <button 
                key={index}
                onClick={() => handleShoeChoice(shoe.color)}
                className={`${shoe.hex} rounded-full px-5 py-5 hover:ring-1 hover:ring-blue-400 hover:ring-offset-4 ${colorChoice === shoe.color ? 'ring-blue-400 ring-1 ring-offset-4' : ''} `}>
                </button>
              ))
            }
          </div>
      </div>

      <div>
        <p className='font-semibold text-lg pt-3 text-gray-500 '>Description</p>
        <p className='text-sm pt-2 max-md:text-justify md:text-pretty'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etpt dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
      </div>
      <a
      href='/cart' 
      className='bg-primary py-3 rounded-xl mt-8 w-full text-slate-100 font-medium text-lg inline-block text-center hover:bg-blue-700'>
      Proceed to Cart
      </a>
      <br/><br/>
    </section>
    </section>
    
  )
}

export default ProductPage;