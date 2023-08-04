import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GroupsIcon from '@mui/icons-material/Groups';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Contact from './Contact';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from '../firebase';
import ProfileBar from './ProfileBar';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import NewChatModel from './NewChatModel';
import { useParams } from 'react-router-dom';

function Sidebar({friends}) {
  const [user] = useAuthState(auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfile, setShowProfile] = useState(false)
  const [addNewChat, setAddNewChat] = useState(false)
  const open = Boolean(anchorEl);

  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);

  const [chatSnapShot, isloading, error] = useCollection(userChatRef)

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

  const showProfileBar = () => {
    setShowProfile(true)
  }

  const creatNewChat = () =>{
    setAddNewChat(true)
  } 

  return (
    <>
    {
      showProfile ? (
          <ProfileBar setShowProfile={setShowProfile} />
      )  :
    <div className="flex flex-col w-5/12">
      <div className="h-16 bg-gray-200 p-2 flex justify-between items-center space-x-5">
        <div className='flex space-x-2 items-center w-40'>
          <img src={user?.photoURL} className='rounded-full cursor-pointer' width={50}  onClick={showProfileBar}/>
          <h2 className="truncate ...">{user?.displayName}</h2>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex space-x-1 items-center">
            <GroupsIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
            <AutorenewOutlinedIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
            <Tooltip title="Add new chat">
              <IconButton
                aria-label="more"
                id="add-button"
                onClick={creatNewChat}
              >
                <AddIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}}  />
              </IconButton>
            </Tooltip>
          </div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertOutlinedIcon className="text-gray-500 cursor-pointer" sx={{fontSize: 30}} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={signOut}>Log Out
          </MenuItem>
          </Menu>
        </div>
      </div>
      <div className='bg-white p-4 border-b-2 border-gray-100 hidden md:flex'>
        <div className='bg-gray-100 p-2 w-full space-x-1 rounded-2xl'>
          <SearchIcon className="text-gray-500" />
          <input className="md:inline flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink truncate w-8/12" type='text' placeholder='Search or start new chat' />
        </div>
      </div>
      <div className="overflow-y-auto h-screen">
        { chatSnapShot &&
          chatSnapShot?.docs.map(chat =>(
            <Contact 
              roomId={chat.id}
              name={chat.data().users[1]}
              email={chat.data().users[1]}
              photoUrl={""}
              timestamp={null}
            />))
        }
      </div>
    </div>
    }
    { addNewChat && <NewChatModel setAddNewChat={setAddNewChat} />}
    </>
  )
}

export default Sidebar