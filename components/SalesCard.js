import React from 'react'

const SalesCard = () => {
  return (
    <section>
       <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="plan-card">
      <div className="max-w-fit mx-auto">
        <div className="bg-orangey px-3 py-1 rounded-full flex w-fit justify-between gap-4 items-center">
            <div className="bg-white w-[9px] h-[9px] rounded-full"></div>
            <p className="font-semibold text-xs text-white">Starter</p>
            <div className="bg-white w-[9px] h-[9px] rounded-full"></div>
        </div>
      </div>
       
        </div>
      </div>
    </section>
  )
}

export default SalesCard