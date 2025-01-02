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
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 w-10/12 mx-auto max-md:gap-1 md:gap-10'>
        {homeProducts.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.index}>
            <div>
                <motion.div
                    initial={{scale: 1}}
                    whileHover={{scale: 1.07}}
                    transition={ {type: 'spring', duration: 0.4, ease: 'easeInOut', mass: 0.4, damping: 2}}
                >
                    <Image
                     src={product.image} alt={product.name} width={product.width} height={product.height} className='hover:shadow'/>
                </motion.div>
                <div className='py-3 w-[245px]'>
                    <p className='font-bold text-gray-700 cursor-pointer hover:opacity-55'>{product.name}</p>
                    <p className='text-sm font-medium text-gray-600'>{product.category}</p>
                    <div className='flex justify-between sm:w-[180px] lg:w-[220px] xl::w-full'>
                        <p className='font-extrabold text-lg text-orangey opacity-65 py-1'><span className='text-sm'>$</span>{product.price}</p>
                        <div className='flex items-center gap-2'>
                        <BsStarFill color='#ffb500' className=''/>
                        <p className='font-semibold opacity-70'>{product.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        ))}
    </div>
    <br/><br/>
    
    </section>
  )
}

export default FeaturedProducts;