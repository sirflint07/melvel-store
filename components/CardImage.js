"use client"

import { motion, useAnimationControls, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useAnimate } from 'framer-motion'
import data from '../constants/data.json'

const CardImage = () => {

    const ref = useRef()
    const inView = useInView(ref, {})

    useEffect(() => {
    }, [inView])

    const controls = useAnimationControls()
    const handleAnimation = () => {
        
                    
    }
    const {data: customers, products, statistics, shoeImages } = data

    const bigShoeVariants = {
        initial: {
            x: '100vw',
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1, type: 'spring', stiffness: 100, mass: 3, damping: 12
            }
        }
    }

    const heroShoeVariants = {
        initial: {
            rotate: 0
        },
        flip: {
            rotate:  180
        }
    }

    const smallShoeCardVariantsDiv = {
        initial: {
            x: '100vw',
        },
        animate: {
            x: 0,
            transition: {
                duration: 1, delay: 0.2, type: 'spring', mass: 3, damping: 12, ease: 'easeInOut', staggerChildren: 0.4, when: 'beforeChildren'
            }
        }
    }

    const smallShoeCardVariants = {
        initial: {
            x: '100vw',
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 100,
            transition: {
                duration: 1, delay: 0, type: 'spring', mass: 3, damping: 12, ease: 'easeIn'
            }
        }
    }

    const [imgUrl, setImgUrl] = useState('/assets/images/sneaker-hero-1.png')
    
  return (
    <div className='flex flex-col'>
        <motion.div
        variants={bigShoeVariants}
        initial='initial'
        animate='animate'
        whileHover={{rotate: 20, transition: {
            duration: 2, ease: "easeIn"
        }}}

                className="mx-auto max-sm:mt-0 md:-mt-2 lg:-mt-8 max-sm:mb-16 md:mb-0">
                {/* <Image src='assets/images/circle.svg' alt='circle' width={1000} height={1000} className='z-0'/> */}
                
                <Image ref={ref} src={imgUrl} alt="hero-image" height={300} width={300} className="object-cover z-3"/>
            
        </motion.div>

    {/*small shoes click buttons */}
    <motion.div
    variants={smallShoeCardVariantsDiv}
    initial='initial'
    animate='animate'
     className='flex justify-evenly items-center max-sm:gap-8 md:gap-12 lg:gap-10 xl:gap-12 2xl:gap-16 sm:mt-10 md:mt-10 max-sm:w-11/12 max-sm:mx-auto max-sm:pr-3'>
        {shoeImages.map((shoe) => (
            <motion.div
            variants={smallShoeCardVariants} 
            key={shoe.index} className={`${shoe.imgUrl === imgUrl ? 'border-orangey border-2' : 'border-gray-400' } w-18 h-18 border  rounded-full p-4 cursor-pointer sm:mt-8 md:mt-0 animate-pulse`} onClick={ () => {
                if (shoe.imgUrl !== imgUrl ) {
                    setImgUrl(shoe.imgUrl)
                    controls.start('animate')
                }
                
            }}>
            <Image src={shoe.imgUrl} alt='shoe' className='object-cover' width={shoe.width} height={shoe.height}/>
            </motion.div>
        ))}
    </motion.div>
    </div>
  )
}

export default CardImage
