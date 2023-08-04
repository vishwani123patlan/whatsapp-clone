import './App.css';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from './firebase';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Chatbar from './components/Chatbar';
import { useCollection } from "react-firebase-hooks/firestore"
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import WhatsappHome from './components/WhatsappHome';


function App() {
  const [user, loading, error] = useAuthState(auth)
  const [realTimeUsers, isloading, haveerror] = useCollection(db.collection("users"));
  const [friends, setFriends] = useState(null)
  useEffect(() => {
    document.title = "Whatsapp Clone"
  }, []);
  useEffect(()=>{
    if(user){
      db.collection("users").doc(user?.email).set({
        email: user?.email,
        name: user?.displayName,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl: user?.photoURL,
        uuid: user?.uid
      })
    }
  }, [user, loading])

  useEffect(()=> {
    if (realTimeUsers){
      setFriends(realTimeUsers?.docs)
    }
  }, [realTimeUsers])
  if(!user) return <Login />
  if(loading) return <Login loading={true} />
  
  return (
    <div className="flex fixed w-full">
     <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/rooms/:roomId" element={<Chatbar />} />
        <Route path="/" element={<WhatsappHome />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
