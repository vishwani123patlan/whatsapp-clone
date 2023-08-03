import React from 'react'
import connect from "../images/live-chat.png"
function WhatsappHome() {
  return (
    <div className='relative flex justify-center flex-row w-full mt-20'>
      <div className="flex flex-col text-center">
        <img src={connect} alt="" width={300} className='rounded-2xl text-center' />
        <h1 className='mt-1 text-3xl text-gray-600'>WhatsApp For Live Chat</h1>
        <p className='text-base text-gray-500'>Send and Recieve messages with encryption.</p>
        <p className='text-base text-gray-500'>Use this WhatsApp for better chat experience.</p>
      </div>
    </div>
  )
}

export default WhatsappHome