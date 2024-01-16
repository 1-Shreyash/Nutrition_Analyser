import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { db } from '../Firebase';
import {updateDoc,doc,onSnapshot} from "firebase/firestore"
import { UserAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const [Food, setFood] = useState([]);
  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);
  const {user}=UserAuth();
    const [Meals,setMeals]=useState([]);
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMeals(doc.data()?.meals);
        });
      }, [user?.email]);
    // const movid=doc(db,'users',`${user?.email}`);
    // const deletemovie=async(selected)=>{
    //   try{
    //    const result=Movies.filter((movie)=>movie.id!==selected)
    //    await updateDoc(movid,{
    //        watchList:result, 
    //    });
    //   }catch(error){
    //     console.log(error);
    //   }
    //   toast.error('Removed from Watchlist', {
    //     position: "top-center",
    //     autoClose: 15,
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     });
    // }
      

  const FetchData = async () => {
    var q = FoodQuantity.current.value + "g " + FoodName.current.value;
    console.log(q);
    const options = {
      method: "GET",
      url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
      params: {
        query: q,
        //   '1kg brisket with fries'
      },
      headers: {
        "X-RapidAPI-Key": "5a039eaa0dmsh0845f457c18724cp123e21jsn195f802a65ff",
        "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      let updatedData = [...Food, response.data];
      console.log(response.data);
      setFood(updatedData);
      localStorage.setItem("foodEat", JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("foodEat"));
    if (data) {
      setFood(data);
    }
  },[])

  return (
    <div className="w-full min-h-screen flex flex-col box-border items-center justify-center border-4 border-blue-900">
      <div className="m-6 text-5xl font-bold">FOOD ANALYSER :</div>
      <div className="flex flex-row p-4">
        <label htmlFor="cars">Add dish name:</label>
        <input type="text" className="border-2 mx-2" ref={FoodName} />
      </div>
      <div className="flex flex-row p-4 mx-2">
        <label htmlFor="cars">Specify quantity: </label>
        <input type="number" className="mx-2 border-2" ref={FoodQuantity} />
        <div>(in g)</div>
      </div>
      <button
        className="bg-black p-2 rounded-lg text-white"
        onClick={FetchData}
      >
        Submit
      </button>
      <table className="table">
        <thead>
          <tr>
            <th className="p-2">Food Name : </th>
            <th className="p-2">Calories : </th>
            <th className="p-2">Serving Size : </th>
            <th className="p-2">Sugar: </th>
            <th className="p-2">Fat : </th>
          </tr>
        </thead>
        <div>
        {Meals.map((item) => (
            <div
              className='flex flex-col space-y-2'
            >
              {item}

            </div>
          ))}
        </div>
        {/* <tbody className="p-4 mx-2 border-2 border-red-900">
          {Food.map((food, index) => {
            return (
              <tr key={index}>
                <td className="p-2">{food.name}</td>
                <td className="p-2">{food.calories}</td>
                <td className="p-2">{food.serving_size_g}</td>
                <td className="p-2">{food.sugar_g}</td>
                <td className="p-2">{food.fat_total_g}</td>
              </tr>
            );
          })}
        </tbody> */}
      </table>
    </div>
  );
};

export default Dashboard;
