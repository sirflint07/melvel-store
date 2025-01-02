"use client"

import Image from "next/image";
import data from '../constants/data.json';
import Rating from "./Rating";



const ReviewCard = () => {
    const { user } = data;


    return (
      <div className="w-11/12 grid lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 mb-8 mx-auto gap-6 sm:grid-cols-2">
          {user.map((rates, i) => (
            <div key={i} className='review-card'> {/* Unique key */}
              <div className="bg-blue-300 bg-opacity-10 float-left -mt-6 h-16 w-16 rounded-full p-2"></div>
              <div className="rounded-full bg-white w-[52px] h-[52px] border border-gray-700 overflow-clip relative -top-[18px] left-[6.2px] z-5">
                {/* Try using img tag for troubleshooting purposes */}
                <Image 
                  src={rates.profile} 
                  alt="customer-image" 
                  width={100} 
                  height={100} 
                  className="absolute"
                  objectFit='contain'
                />
              </div>
              <div className="clear-both"></div>
              <div className="max-sm:text-xxs sm:text-xs max-lg:text-xs lg:text-xs leading-3 max-lg:pb-4 lg:py-2 px-1 max-sm:h-[36%] max-md:h-[32%] md:h-[36%] lg:h-[48%] text-ellipsis">
                {rates.review}
              </div>
              <div className="border border-b border-gray-200 mb-4 border-opacity-60"></div>
              <div className="flex max-sm:flex-row sm:flex-row justify-between md:flex-row">
                <div className="">
                  <div className="font-bold text-gray-600 text-sm w-fit max-sm:text-xs">{rates.name}</div>
                  <div className="text-xs font-normal text-gray-400 w-fit max-md:text-xxs">{rates.role}</div>
                </div>
                <div className="max-lg:pt-3 sm:pt-4 size-24 max-md:size-16">
                  <Rating rating={Number(rates.ratings)} />
                </div>
              </div>
            </div>
            
          ))}
          
          
      </div>
    );
};

export default ReviewCard;