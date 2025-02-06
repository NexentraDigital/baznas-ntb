import React from 'react'

export default function IconLayanan({icon, className="", ...props}) {
  return (
    <div {...props} className={`bg-Primary-600 w-12 h-12 lg:h-20 lg:w-20 rounded-full flex justify-center items-center` + className}>
        <img src={icon} alt="" className='h-7 lg:h-12'/>
    </div>
  )
}
