// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlFhnlQjx_atoxLE7y9-DBIJGynIwyzV0",
  authDomain: "whatsapp-clone-892af.firebaseapp.com",
  projectId: "whatsapp-clone-892af",
  storageBucket: "whatsapp-clone-892af.appspot.com",
  messagingSenderId: "1067088713503",
  appId: "1:1067088713503:web:322ee5bf5cea2f0a57822a",
  measurementId: "G-LYVRVH0YPK"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app() ;

const auth = firebase.auth()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


const db = app.firestore();

const storage = firebase.storage();

export {db, storage, auth, googleAuthProvider}