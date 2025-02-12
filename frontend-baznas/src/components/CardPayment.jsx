import React from 'react'

export default function CardPayment({icon}) {
  return (
    <div className='h-16 md:h-20 lg:h-24 w-[8rem] md:w-40 lg:w-52 bg-Neutral-50 rounded-xl shadow-xl shadow-Primary-100 flex justify-center items-center'>
    <img src={icon} alt="" className='h-10 lg:h-12' />
    </div>
  )
}
