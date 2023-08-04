import React, { useEffect, useState } from 'react'
import WhatsappHome from './WhatsappHome';
import ChatHead from './ChatHead';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

function Chatbar({currentChat}) {
  const { roomId } = useParams()
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    if(roomId){
      db.collection("chats").doc(roomId).onSnapshot((chat)=> {
        db.collection("users").doc(chat.data().users[1]).onSnapshot((user)=>{
          setUserData(user.data())
        })
      })
    } 
  },[roomId])
  return (
    <div className='h-screen w-full'>
      <ChatHead name={userData?.name} profileUrl={userData?.photoUrl} />
      <Chat />
    </div>
  )
}

export default Chatbar