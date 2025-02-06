import React from 'react'

export default function CardPayment({icon}) {
  return (
    <div className='h-16 w-40 bg-Neutral-50 rounded-xl shadow-xl shadow-Primary-100 flex justify-center items-center'>
    <img src={icon} alt="" className='h-12' />
    </div>
  )
}
