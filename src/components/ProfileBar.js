import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GroupsIcon from '@mui/icons-material/Groups';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function ProfileBar({setShowProfile}) {
  const [user] = useAuthState(auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () =>{
    setAnchorEl(null);
    auth.signOut();
  }
  const hideProfilePar = () =>{
    setShowProfile(false)
  }
  return (
    <div className="flex flex-col w-5/12 bg-gray-100 transition-transform duration-1000 ease-in  translate-x-0">
      <div className="bg-green-700 p-2 flex justify-start items-center space-x-5 h-24">
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={hideProfilePar}
          >
            <ArrowBackIcon className="text-white cursor-pointer" sx={{fontSize: 25}} />
          </IconButton>
          <h3 className='text-xl text-white font-medium tracking-wider'> Profile</h3>
      </div>
      <div className="overflow-y-auto h-screen">
        <div className='h-60 flex justify-center items-center'>
          <img src={user?.photoURL} alt="" width={200} height={200} />
        </div>
        <div className='h-20 flex flex-col justify-evenly pl-3 bg-white'>
          <p className='text-green-700'>Your name</p>
          <h3 className='text-medium text-black'>{user?.displayName}</h3>
        </div>
        <div className='h-20 flex flex-col justify-evenly pl-3'>
          <p className='text-gray-700'>This is not your user name.</p>
        </div>
        <div className='h-20 flex flex-col justify-evenly pl-3 bg-white'>
          <p className='text-green-700'>About</p>
          <h3 className='text-medium text-black'>{user?.email}</h3>
        </div>
      </div>

    </div>
  )
}

export default ProfileBar