// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// eslint-disable-next-line
const http =  "https://firebase.google.com/docs/web/setup#available-libraries"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWbXo58Qa-jrqlmX2BYJDPJn5PGF6-rIY",
  authDomain: "fir-crud-236b0.firebaseapp.com",
  projectId: "fir-crud-236b0",
  storageBucket: "fir-crud-236b0.appspot.com",
  messagingSenderId: "587843191751",
  appId: "1:587843191751:web:df4f7b81bdc788fd5a4fe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);