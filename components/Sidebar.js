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
import { useContext } from "react";
import { NavbarContext } from "./contexts/NavbarContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
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
          <motion.li className="sidebar-text">
            <MdExplore className="ml-3" size={17} />
            Explore
          </motion.li>
          {/* <motion.li onClick={handleSelected} className={`${selectedOption ? 'bg-gray-900 scale-110 z-30 shadow-md transition-all duration-0 ease-in-out text-slate-100' : ''} sidebar-text`}>
            <MdOutlineMan className="ml-3" size={19} />
            Men
          </motion.li> */}

          <motion.li className="sidebar-text">
            <MdOutlineMan className="ml-3" size={19} />
            Men
          </motion.li>
          <motion.li className="sidebar-text">
            <IoWoman className="ml-3" size={17} /> Women
          </motion.li>
          <motion.li className="sidebar-text">
            <FaChildReaching className="ml-3" size={17} />
            Children
          </motion.li>
          <motion.li className="sidebar-text">
            <RiShoppingBag4Fill className="ml-3" size={17} />
            Shop
          </motion.li>
          <motion.li className="sidebar-text">
            <RiContactsFill className="ml-3" size={17} />
            Contact
          </motion.li>
          <motion.li className="sidebar-text">
            <FaPersonCircleQuestion className="ml-3" size={17} />
            About
          </motion.li>
          <motion.li className="sidebar-text">
            <AiFillProduct className="ml-3" size={17} />
            Product
          </motion.li>
          <motion.li className="sidebar-text">
            <GrLogin className="ml-3" size={17} />
            Log In
          </motion.li>
          <motion.li className="sidebar-text">
            <FaUserPlus className="ml-3" size={17} />
            Signup
          </motion.li>
        </ul>
      </motion.aside>
    </AnimatePresence>
  );
}