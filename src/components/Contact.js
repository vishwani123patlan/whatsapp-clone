import React from 'react'
import { Avatar } from '@mui/material'

function Contact() {
  return (
    <div className="flex justify-between items-center p-2 bg-white cursor-pointer hover:bg-slate-100 h-20 border-b-2 border-gray-100">
      <div className='flex items-center space-x-4'>
        <img src="https://source.unsplash.com/random/200x200" className='rounded-full' width={50} />
        <h2>Shubham Patel</h2>
      </div>
      <div>
        <p className="text-xs text-gray-400 mr-2">2:15 Am</p>
      </div>
    </div>
  )
}

export default Contact