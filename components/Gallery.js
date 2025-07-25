import Image from 'next/image';
import React from 'react'


const Gallery = () => {

  return (
    <div className='w-11/12 mx-auto mt-10'>
      <p className='text-2xl font-medium mb-6'>Our Latest and Greatest</p>
      <div className='sm:h-[30vh] md:h-[65vh] overflow-hidden'>
      <video width="100%" height='auto' autoPlay loop muted>
        <source src='https://res.cloudinary.com/djpdesqrs/video/upload/v1747209856/Videos/xeiidpv6z9lpcbulxxdq.mp4' type='video/mp4'/>
      </video>
      </div>
      <br /><br/>
      <div className='grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
        <div  className='md:col-span-1 lg:col-span-2 max-lg:mx-auto'>
            <Image src='https://res.cloudinary.com/djpdesqrs/image/upload/v1737556487/close-up-futuristic-sneakers_uf9ds4.jpg' alt='blue-sneakers' width={450} height={600} className='object-cover hover:brightness-75 hover:cursor-pointer'/>
        </div>
        <div className='md:col-span-1 lg:col-span-2 max-lg:mx-auto'>
            <Image src='https://res.cloudinary.com/djpdesqrs/image/upload/v1737556419/orange-ai-trainers_sfat9w.jpg' alt='orange-trainers-ai' width={450} height={600} className='object-cover hover:brightness-75 hover:cursor-pointer'/>
        </div>
        <div className='md:col-span-2 lg:col-span-2 flex md:flex-row lg:flex-col justify-between'>
            <div><Image src='/assets/images/grid-1.jpg' alt='sneaker-1' className='hover:brightness-75 hover:cursor-pointer' width={1500} height={1000}/></div>
            <div><Image src='/assets/images/grid-2.jpg' alt='sneaker-2' className='hover:brightness-75 hover:cursor-pointer' width={1500} height={1000}/></div>
        </div>
      </div>
      <br /><br /><br /><br />
    </div>
  )
}

export default Gallery;
