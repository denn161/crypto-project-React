
import { initializeApp} from "firebase/app";
import {getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBKdzIPle9kxmc2HbC5IMrTR8xn-15QXoE",
  authDomain: "crypto-hunter-1728b.firebaseapp.com",
  projectId: "crypto-hunter-1728b",
  storageBucket: "crypto-hunter-1728b.appspot.com",
  messagingSenderId: "324697794475",
  appId: "1:324697794475:web:a6270d806004e45b6114ee"
};

const app = initializeApp(firebaseConfig);


const auth =getAuth(app)

const db=getFirestore(app)

export {auth,db}