import React from 'react'

export default function IconLayanan({icon, className="", ...props}) {
  return (
    <div {...props} className={`bg-Primary-500 w-16 h-16 rounded-full flex justify-center items-center` + className}>
        <img src={icon} alt="" className='h-10'/>
    </div>
  )
}
