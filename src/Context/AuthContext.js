import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setuser] = useState({});
  const [Food, setFood] = useState([]);
  const [List, setList] = useState([]);

  const handleListChange = (food) => {
    let updatedData = [...List, food];
    setList(updatedData);
    console.log(updatedData);
  };

  function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      meals: [],
    });
    return;
  }
  function logOut() {
    return signOut(auth);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const stateUser = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });
    return () => {
      stateUser();
    };
  });
  return (
    <AuthContext.Provider
      value={{
        createUser,
        List,
        setList,
        user,
        logOut,
        logIn,
        Food,
        setFood,
        handleListChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
