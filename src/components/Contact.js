import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

function Contact({roomId, name, photoUrl, timestamp}) {
  console.log(name)
  const [sideuserData, setSideuserData] = useState(null)
  useEffect(() => {
    if(name){
      db.collection("users").doc(name).onSnapshot((user)=>{
        setSideuserData(user.data())
      })
    }
  },[name])
  
  return (
    <Link to={`rooms/${roomId}`}>
      <div className="flex justify-between items-center p-2 bg-white cursor-pointer hover:bg-slate-100 h-18 border-b-2 border-gray-100">
        <div className='flex items-center space-x-4'>
          { photoUrl ? <img src={photoUrl} className='rounded-full' width={50} height={50} /> : <Avatar sx={{ width: 50, height: 50 }}>{sideuserData?.name?.[0]}</Avatar> }
          <h2>{sideuserData?.name}</h2>
        </div>
        <div>
          <p className="text-xs text-gray-400 mr-2">{new Date(timestamp?.toDate()).toLocaleTimeString(undefined,{hour: 'numeric', minute: 'numeric', hour12: true})}</p>
        </div>
      </div>
    </Link>
  )
}

export default Contact