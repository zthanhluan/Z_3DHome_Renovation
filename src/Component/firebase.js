// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyDQqTL1YxNWbi8GTdXfQ8_-9n8tnXP68aY",
//   authDomain: "d-room-renovation.firebaseapp.com",
//   projectId: "d-room-renovation",
//   storageBucket: "d-room-renovation.appspot.com",
//   messagingSenderId: "563375257642",
//   appId: "1:563375257642:web:c1e7063e006ab58cfcab53",
//   measurementId: "G-K5RR1LHFV1"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDQqTL1YxNWbi8GTdXfQ8_-9n8tnXP68aY",
  authDomain: "d-room-renovation.firebaseapp.com",
  databaseURL: "https://d-room-renovation-default-rtdb.firebaseio.com",
  projectId: "d-room-renovation",
  storageBucket: "d-room-renovation.appspot.com",
  messagingSenderId: "563375257642",
  appId: "1:563375257642:web:c1e7063e006ab58cfcab53",
  measurementId: "G-K5RR1LHFV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// console.log(app); // where app is your Firebase initialization code


const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        resolve(result); // Resolve the Promise with the result
      })
      .catch((error) => {
        console.log(error);
        reject(error); // Reject the Promise with the error
      });
  });
};


export default app;
export { auth, db}; 