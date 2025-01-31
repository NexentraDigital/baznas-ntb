import React from 'react'

export default function PrimaryButton({children, className="", ...props}) {
  return (
    <button {...props} className={`bg-Primary-500 hover:bg-Primary-600 hover:shadow-lg text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ` + className}>
    {children}
    </button>
  )
}
