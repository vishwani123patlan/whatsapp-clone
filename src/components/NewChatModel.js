import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

function NewChatModel({setAddNewChat}) {
  const [user] = useAuthState(auth)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);

  const [chatSnapShot, isloading, error] = useCollection(userChatRef)

  const [formData, setFormData] = useState({"name": "", "email": ""})
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [nameHelperTextValue, setNameHelperTextValue] = useState("")
  const [emailHelperTextValue, setEmailHelperTextValue] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleClose = () => {
    setLoading(false)
    setFormData({"name": "", "email": ""})
    setAddNewChat(false);
  };

  const createNewChat = () =>{
    setNameError(false)
    setEmailError(false)
    setNameHelperTextValue("")
    setEmailHelperTextValue("")
    if(afterValidate()){
      setLoading(true)
      db.collection("users").doc(formData.email).set({
        email: formData?.email,
        name: formData?.name,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl: "",
        uuid: generateRandomHex(10)
      }).then(doc => {
        if(!chatAlreadyExists(formData.email) && user?.email !== formData.email){
          db.collection("chats").add({
            users: [user?.email, formData.email]
          })
        }
        handleClose()
      })
    }
  }

  const chatAlreadyExists = (recipentEmail) => {
    return !!chatSnapShot?.docs.find(chat => chat.data().users.find(user=> user === recipentEmail)?.length > 0);
  }

  function generateRandomHex(length) {
    let result = '';
    const characters = '0123456789ABCDEF';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }
  
  

  const afterValidate = () =>{
    var isValidate = false
    console.log(formData)
    if(formData.name === ""){
      setNameError(true)
      setNameHelperTextValue("please enter the name")
      isValidate = false
    }
    else{
      isValidate = true
    }
    if(formData.email === ""){
      setEmailError(true)
      setEmailHelperTextValue("please enter the email")
      isValidate = false
    }
    else if(!emailRegex.test(formData.email)){
      setEmailError(true)
      setEmailHelperTextValue("please enter the valid email format")
      isValidate = false
    }
    else{
      isValidate= true
    }
    return isValidate
  }

  //console.log(errorsField)

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth={true} open={true} onClose={handleClose}>
        <DialogTitle>Add New Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter name and email to create a chat.
          </DialogContentText>
          <TextField
            error={nameError}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {  setFormData({ ...formData, name: e.target.value }) }}
            helperText={nameError && nameHelperTextValue}
          />
          <TextField
            error={emailError}
            autoFocus
            margin="dense"
            id="my_email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
            helperText={emailError && emailHelperTextValue}
          />
        </DialogContent>
        <DialogActions style={{display: "flex", justifyContent: "center", padding: 10}}>
          {
            loading ? (<CircularProgress color='success' />) : (<><Button color='error' onClick={handleClose}>Cancel</Button>
            <Button color='success' onClick={createNewChat}>Create</Button></>)
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewChatModel