"use client"

import Image from 'next/image'
import { BsBag } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import Button from './Button';
import Link from 'next/link';
import { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import Sidebar from './Sidebar';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Store } from './contexts/AddToCart'; 
import { AuthContext } from './contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { dispatch } = useContext(Store);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const handleFullLogout = async () => {
    // Clear cart context
    dispatch({ type: 'CLEAR_CART' });
    // Perform auth logout
    await logout();
  };

  return (
    <>
      {/* Mobile Navigation */}
      <nav className='bg-[#fffefe] w-full fixed z-10 shadow-md md:shadow-sm shadow-blue-100 flex justify-between px-6 py-4 sm:visible lg:hidden mx-auto'>
        <Link href='/' className='mt-3'>
          <Image src='/assets/images/nike-logo.png' alt='logo' width={50} height={50}/>
        </Link>
        {isOpen ? (
          <div onClick={() => setIsOpen(!isOpen)} className='transition-all duration-500'>
            <FaXmark size={30} color='#0d92f4'/>
          </div>
        ) : (
          <div onClick={() => setIsOpen(!isOpen)} className='transition-all duration-500 border border-primary p-1 rounded-lg cursor-pointer'>
            <BiMenuAltRight size={30} color='#0d92f4'/>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && <Sidebar />}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className='w-full flex bg-white fixed z-10 shadow-sm shadow-blue-100 py-4 justify-between px-10 max-lg:hidden items-center'>
        <div className='mt-3 w-2/12'>
          <Link href='/'>
            <Image src='/assets/images/nike-logo.png' alt='logo' width={50} height={50}/>
          </Link>
        </div>
        
        <div>
          <ul className='inline-flex gap-5'>
            <li className='menu-btn'>Explore</li>
            <li className='menu-btn'>Men</li>
            <li className='menu-btn'>Women</li>
            <li className='menu-btn'>Children</li>
          </ul>
        </div>
        
        <ul className='flex items-center gap-4 w-6/12 justify-end'>
          <Link href='/cart' className='inline-flex items-center menu-btn'>
            Shop<span className='pl-1'><BsBag /></span>
          </Link>
          <li className='menu-btn'>Contact</li>
          <li className='menu-btn'>About</li>
          <Link href='/all-products' className='menu-btn mr-4'>Products</Link>
          
          <div className='space-x-3 inline-flex'>
            {!isAuthenticated ? (
              <>
                <Link href='/login'>
                  <Button title='Log In'/>
                </Link>
                <Link href='/signup'>
                  <Button title='Sign Up'/>
                </Link>
              </>
            ) : (
              <>
                {user?.username && (
                  <span className="text-primary font-medium">
                    Hi, {user.username}
                  </span>
                )}
                <button onClick={handleFullLogout}>
                  <Button title='Log Out'/>
                </button>
              </>
            )}
          </div>
        </ul>
      </nav>

      <motion.div 
        className='w-full h-2 bg-orangey fixed z-30' 
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      ></motion.div>
    </>
  )
}

export default Navbar;