import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "your-key",
  projectId: "your-key",
  storageBucket: "your-key",
  messagingSenderId: "your-key",
  appId: "your-key",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db, firebase };
