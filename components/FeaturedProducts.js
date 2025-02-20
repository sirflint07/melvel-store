"use client"

import React, { useEffect, useRef } from 'react'
import { homeProducts } from '@/constants'
import Image from 'next/image'
import { BsStarFill } from 'react-icons/bs'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const FeaturedProducts = () => {
    const ref = useRef()
    const inView = useInView(ref, {})

    useEffect(() => {
        console.log(inView)
    }, [inView])

  return (
    <section className='mt-8 mx-auto'>
    <div className='text-center'>
        <h2 className='text-4xl font-bold text-gray-500'>Featured Products</h2>
        <p ref={ref} className={`${inView ? "opacity-100 transform transition-opacity duration-700 ease-in-out" : "opacity-0"} max-md:text-sm md:text-base tracking-wider font-normal mt-3 text-gray-800`}>Some new collections of amazing sneakers just for you.</p><br /><br />
    </div>
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 w-10/12 mx-auto max-md:gap-6 md:gap-16 max-md:w-8/12'>
        {homeProducts.filter((sneaker) => sneaker.isFeatured).map((product) =>  (
            <Link href={`/product/${product.slug}`} key={product.index}>
              <motion.div
                className="shadow-md rounded-lg overflow-hidden bg-white flex flex-col h-full pt4 px-2 pb-3 mx-auto"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: 'spring',
                  duration: 0.4,
                  ease: 'easeInOut',
                  mass: 0.4,
                  damping: 2,
                }}
              >
                {/* Product Image */}
                <div className="w-full max-md:h-fit max-md:pb-3 md:h-56 md:pb-0 mx-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    className="rounded-t-lg max-md:hidden md:visible"
                    width={product.width}
                    height={product.height}
                  />
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    className="rounded-t-lg max-md:visible md:hidden"
                    width={product.mobilewidth}
                    height={product.mobileheight}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  {/* Product Name */}
                  <p className="font-bold text-gray-800 text-lg hover:opacity-75 cursor-pointer">
                    {product.name}
                  </p>
                  {/* Product Category */}
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                  {/* Price and Rating */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-orange-500 font-extrabold text-lg">
                      <span className="text-sm">$</span>
                      {product.price}
                    </p>
                    <div className="flex items-center gap-1 lg:gap-0 justify-center">
                      {Array.from({length: product.rating}).map((_, index) => (
                        <BsStarFill color="#ffb500" key={index}/>
                      ))}
                      <span className="text-gray-700 font-semibold text-sm inline-block ml-2">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
                )
        )}
    </div>
    <br/><br/><br/>
    
    </section>
  )
}

export default FeaturedProducts;