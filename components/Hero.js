"use client"

import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import CardImage from "./CardImage";
import data from '../constants/data.json'

const Hero = () => {
  const {data: customers, products, statistics, shoeImages } = data
  
  return (
    <section className='w-11/12 mx-auto z-0 lg:mb-28'>
    <div className="max-md:hidden md:visible"><br /><br /><br /><br /></div>

    <div className="max-md:visible md:hidden"><br /><br /><br /><br /></div>
      <p className=' font-normal text-sm tracking-wider text-gray-400 mb-0'>Our new luxurious collections</p>
      <div className='hero-text'>

{/** TYPE ANIMATION */}
<p className='text-gray-500'>
<TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Quality Sneaker Designs',
        5000, // wait 1s before replacing "Mice" with "Hamsters"
        '',
      ]}
      wrapper="span"
      speed={50}
      //style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
      cursor= {false}
    />
    </p>

<div className="">
    <span className='text-orangey'>
    <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                '',
                200, // wait 1s before replacing "Mice" with "Hamsters"
                'From The Future',
                2000,
                ''
            ]}
            wrapper="span"
            speed={50}
            //style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
            />
    </span>
</div>
      </div>
      <a href="/store"><button className='cta-btn mt-6 text-white inline-flex items-center'>Shop Now <span className="pl-2"><BsArrowRightCircleFill size={18}/></span></button></a>
      <div>
      <p className="mt-3 text-gray-500 text-xs tracking-wider subpixel-antialiased">Unique traction pattern offers super charged traction. Run Faster, Jump Higher, Look Cooler.</p>
      <br /><br />
      </div>

      {/* Mission statement & Main Image*/}
      <div className=" max-sm:flex max-sm:flex-col sm:grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 md:gap-5 lg:gap-6 mt-10 gap-3">
      <div className="plan-card">
      <div className="max-w-fit mx-auto">
        <div className="ball-text">
            <div className="ball"></div>
            <p className="ont-light text-xxs md:text-xs text-white">Objective</p>
            <div className="ball"></div>
            
        </div>
            <p className="text-xs md:text-xs px-3 py-3 lg:text-justify leading-5 md:leading-4 font-thin">Our mission is to inspire movement and self-expression through innovative, high-quality sneakers. We aim to deliver unparalleled comfort, style, and performance, empowering individuals to step confidently in every walk of life. <span className="max-sm:hidden">With a passion for both design and function, we strive to create footwear that not only enhances your journey but also reflects your unique identity. At the heart of our brand, we are committed to quality craftsmanship, sustainability, and elevating the sneaker culture worldwide.</span></p>
      </div>
        </div>

        <div className="plan-card">
      <div className="max-w-fit mx-auto">
        <div className="ball-text">
            <div className="ball"></div>
            <p className="font-light text-xxs md:text-xs text-white">Target</p>
            <div className="ball"></div>
            
        </div>
            <p className="text-xs md:text-xs px-3 py-3 lg:text-justify leading-5 md:leading-4 font-thin">Our target market is fashion-forward individuals and sneaker enthusiasts who value both style and performance in their footwear. We cater to a diverse audience, from trendsetters and athletes to everyday consumers, seeking comfortable, durable, and innovative designs. <span className="max-sm:hidden">Whether you are hitting the streets or the gym, our sneakers are designed for those who embrace individuality, prioritize quality, and lead an active lifestyle. We aim to connect with customers who appreciate craftsmanship and stay ahead of evolving trends.</span></p>
      </div>
        </div>
              <div className="lg:col-span-6 lg:place-self-end md:col-span-4 col-span-2 sm:place-self-center px-3 py-5 md:py-1 lg:py-0 max-sm:mx-auto max-sm:w-[97vw]">
                <CardImage />
              </div>
        
      </div>
      <div className="flex lg:-mt-8 xl:-mt-20 max-sm:mx-auto max-lg:justify-center">
        <div className="flex max-sm:gap-8 gap-8 mt-3 md:mt-5 lg:mt-8 ">
          {statistics.map((stat, i) => (
            <div key={i} className="mx-auto lg:mx-0">
              <p className="text-xl md:text-3xl font-bold text-gray-700 lg:mt-6">{stat.label}</p>
              <p className="text-xs lg:text-base text-slate-400">{stat.value}</p>
            </div>
          ))}
        </div>
        <div>

        </div>
      </div>
      <br /><br />
    </section>
  )
}

export default Hero