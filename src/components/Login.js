import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from '@mui/material';
import { auth, googleAuthProvider } from '../firebase';
function Login({loading}) {
  console.log(loading)
  const googleSignIn = () => {
    auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <div className="flex flex-col justify-center items-center bg-slate-50 p-5 mt-10 m-auto w-5/12 shadow-lg rounded">
      <WhatsAppIcon className="text-green-500" sx={{ fontSize: 500 }} />
      <div>
        { loading ? (<h1></h1>) : (
          <Button 
          onClick={googleSignIn}
          variant='contained' 
          color='success' >Login With Google</Button>
        )}
        
      </div>
    </div>
  )
}

export default Login