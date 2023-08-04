import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import IconButton from '@mui/material/IconButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Avatar } from '@mui/material';

function ChatHead({name, profileUrl}) {
  const [user] = useAuthState(auth)
  return (
    <div className="h-16 bg-gray-100 p-2 flex justify-between items-center space-x-5">
    <div className='flex space-x-2 items-center'>
      {
        profileUrl ? (<img src={user?.photoURL} className='rounded-full' width={50} />) : (<Avatar sx={{ width: 50, height: 50 }}>{name?.[0]}</Avatar>)
      }
      <h2>{name}</h2>
    </div>
    <div className="flex items-center">
    <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <VideocamIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
      </IconButton>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <LocalPhoneIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
      </IconButton>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <SearchTwoToneIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
      </IconButton>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <MoreVertOutlinedIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
      </IconButton>
    </div>
  </div>
  )
}

export default ChatHead