import Image from 'next/image'
import { BiEnvelope } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { GrSend } from "react-icons/gr";

const Footer = () => {
  return (
    <div className='bg-bluedark text-slate-50 mt-10 py-6 w-[100vw]'>
    <footer className="footer bg-base-200 text-base-content max-md:px-10 py-10 flex justify-between max-sm:w-full md:w-11/12 lg:w-10/12 mx-auto max-md:flex-col">
    <nav className='flex flex-col space-y-6 max-lg:w-[250px] lg:w-[300px] items-start'>
    <p className="mb-0 flex"><Image src='/assets/images/nike-logo.png' alt='logo' width={32} height={30} className='mr-2'/>MELVEL</p>
    <p className='text-xs font-extralight leading-3 tracking-wide'>Upgrade your footwear collection with sneakers crafted for ultimate performance and style. For the Love of Sneakers, and the Passion for Fashion.</p>
    <div className='flex gap-3'>
      <div className='w-8 h-8 rounded-full bg-primary text-white place-content-center mxau'><BiEnvelope className='mx-auto' size={20}/></div>
      <div className='w-8 h-8 rounded-full bg-primary text-white place-content-center mxau'><FaFacebookF className='mx-auto' size={18}/></div>
      <div className='w-8 h-8 rounded-full bg-primary text-white place-content-center mxau'><BsTwitterX className='mx-auto' size={18}/></div>
      <div className='w-8 h-8 rounded-full bg-primary text-white place-content-center mxau'><IoLogoYoutube className='mx-auto' size={18}/></div>
    </div>
  </nav>
  <nav className='flex flex-col'>
    <p className="link-heading">Services</p>
    <div className='space-y-2 flex flex-col'>
    <a className="nav-links">Branding</a>
    <a className="nav-links">Design</a>
    <a className="nav-links">Marketing</a>
    <a className="nav-links">Advertisement</a>
    </div>
  </nav> 
  <nav className='flex flex-col'>
    <p className="link-heading">Our Links</p>
    <div className='space-y-2 flex flex-col'>
    <a className="nav-links">About Us</a>
    <a className="nav-links">Contact</a>
    <a className="nav-links">Jobs</a>
    <a className="nav-links">Press kit</a>
    </div>
  </nav>
  <nav className='flex flex-col gap-5'>
    <div>
      <p className='link-heading '>Newsletter</p>
      <div className='flex gap-5 items-center'>
        <input type='email' className='rounded-full bg-bluedark border border-slate-50 py-1 px-4 border-opacity-50 placeholder:text-sm placeholder:opacity-50' placeholder='goldendesigns@gmail.com'/>
        <a href='' className='rounded-full bg-transparent border border-slate-50 border-opacity-50 w-8 h-8 place-content-center place-items-center'><GrSend className='opacity-50' size={15}/></a>
      </div>
    </div>
    <div className='flex flex-col gap-3 w-fit'>
    <a className="nav-links">Terms of use</a>
    <a className="nav-links">Privacy policy</a>
    <a className="nav-links">Cookie policy</a>
  </div>
  </nav>
</footer>

{/*Copyrights */}
<footer className="footer text-base-content border-slate-500 border-opacity-40 border-t px-10 py-4 w-9/12 mx-auto">
  <div>
    <p className='max-md:text-sm md:text-base text-gray-600 text-center mt-6'>&copy; Copyrights Golden Designs & Dev</p>
  </div>
</footer>
    </div>
  )
}

export default Footer;