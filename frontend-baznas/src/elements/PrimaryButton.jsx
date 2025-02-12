import React from 'react'

export default function PrimaryButton({children, className="", ...props}) {
  return (
    <button {...props} className={`bg-Primary-600 hover:bg-Secondary-500 hover:shadow-lg text-white  py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ` + className}>
    {children}
    </button>
  )
}
