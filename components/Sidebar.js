"use client";

import { useState } from "react";
import { BsChevronBarRight } from "react-icons/bs";
import { FaChildReaching } from "react-icons/fa6";
import { MdOutlineMan } from "react-icons/md";
import { IoWoman } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdLogOut } from "react-icons/io";

export default function Sidebar() {
  
  const [selectedOption, setselectedOption] = useState(false)
  const handleSelected = () => {
    setselectedOption(!selectedOption)
  }

  const sideBarMenuVariants = {
    close: {
      scale: 0,
      scaleZ: 0,
    },
    show: {
      scaleZ: 1,
      transition: {
        duration: 0.3,
        type: "spring",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{
          duration: 0.2,
          type: "spring",
          ease: "easeOut",
          damping: 15,
          times: [0.1, 0.2],
        }}
        className="h-screen flex flex-col z-10 lg:hidden max-sm:w-[55vw] w-[35vw] bg-gray-50 shadow py-4 fixed top-[62px] right-0 pr-3 md:pr-7">
        <div
          className="border border-gray-600 rounded-full p-2 w-fit ml-6 cursor-pointer hover:bg-zinc-100 hover:scale-90"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsChevronBarRight />
        </div>
        <ul className="mt-4">
          <a href="/" className="inline hover:bg-gray-500">
            <li 
            variants={sideBarMenuVariants} 
            initial='close'
            animate='show'
            whileHover={{scaleZ: 1}}
            className="sidebar-text">
              <FaHome className="ml-3" size={17} />
              Home
            </li>
          </a>
          <motion.a className="sidebar-text">
            <MdExplore className="ml-3" size={17} />
            Explore
          </motion.a>
          <motion.a className="sidebar-text">
            <MdOutlineMan className="ml-3" size={19} />
            Men
          </motion.a>
          <motion.a className="sidebar-text">
            <IoWoman className="ml-3" size={17} /> Women
          </motion.a>
          <motion.a className="sidebar-text">
            <FaChildReaching className="ml-3" size={17} />
            Children
          </motion.a>
          <motion.a className="sidebar-text" href="/cart">
            <RiShoppingBag4Fill className="ml-3" size={17} />
            Cart
          </motion.a>
          <motion.a className="sidebar-text">
            <RiContactsFill className="ml-3" size={17} />
            Contact
          </motion.a>
          <motion.a className="sidebar-text">
            <FaPersonCircleQuestion className="ml-3" size={17} />
            About
          </motion.a>
          <motion.a href='/all-products' className="sidebar-text">
            <AiFillProduct className="ml-3" size={17} />
            Product
          </motion.a>
          <motion.a className="sidebar-text" href="/login">
            <GrLogin className="ml-3" size={17} />
            Log In
          </motion.a>
          <motion.a className="sidebar-text" href="/signup">
            <FaUserPlus className="ml-3" size={17} />
            Signup
          </motion.a>
          <motion.a className="sidebar-text" href="/signup">
            <IoMdLogOut className="ml-3" size={17} />
            Logout
          </motion.a>
        </ul>
      </motion.aside>
    </AnimatePresence>
  );
}