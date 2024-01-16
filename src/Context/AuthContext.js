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

  const handleListChange = (food, flag) => {
    if (flag === 1) {
      const fooddata = {
        name: food.recipe.label,
        calories: food.recipe.calories,
        carbs: food.recipe.digest[1].total,
        fat: food.recipe.digest[0].total,
        protein: food.recipe.digest[2].total,
        sodium: food.recipe.digest[4].total,
      };

      let updatedData = [...List, fooddata];
      setList(updatedData);
      localStorage.setItem("selectedFood", JSON.stringify(updatedData));
      console.log(updatedData);
    } else if (flag === 2) {
      const fooddata = {
        name: food.name,
        calories: food.calories,
        carbs: food.carbohydrates_total_g,
        fat: food.fat_total_g,
        protein: food.protein_g,
        sodium: food.sodium_mg,
      };

      let updatedData = [...List, fooddata];
      setList(updatedData);
      localStorage.setItem("selectedFood", JSON.stringify(updatedData));
      console.log(updatedData);
    }
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("selectedFood"));
    if (data) {
      setList(data);
    }
  }, []);

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
