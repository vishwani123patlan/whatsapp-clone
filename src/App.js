import './App.css';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from './firebase';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chatbar from './components/Chatbar';
import ProfileBar from './components/ProfileBar';
function App() {
  const [user, loading, error] = useAuthState(auth)
  // const [isLogin, SetIsLogin] = useState(false)
  // const [isLoding, SetIsLoading] = useState(false)
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
  if(!user) return <Login />
  if(loading) return <Login loading={true} />
  
  return (
    <div className="flex fixed w-full">
      <Sidebar />
      <Chatbar />
    </div>
  );
}

export default App;
