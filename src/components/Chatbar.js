import React from 'react'
import WhatsappHome from './WhatsappHome';
import ChatHead from './ChatHead';

function Chatbar({currentChat}) {
  if(currentChat) return <WhatsappHome />
  return (
    <div className='h-screen w-full'>
      <ChatHead />
      
    </div>
  )
}

export default Chatbar