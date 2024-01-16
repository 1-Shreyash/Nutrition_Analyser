import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzx-3d7DzT2esv39YFz0AGEVTK5BuUBCM",
  authDomain: "nutrition-analyser.firebaseapp.com",
  projectId: "nutrition-analyser",
  storageBucket: "nutrition-analyser.appspot.com",
  messagingSenderId: "842931638502",
  appId: "1:842931638502:web:0e62f9fe88fd9fdc1f2b27"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);