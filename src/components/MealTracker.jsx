import React, { useRef, useState } from "react";
import axios from "axios";
import { UserAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MealTracker = () => {
  const [Food, setFood] = useState([]);
  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);
  const { handleListChange } = UserAuth();
  

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
      setFood(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  toast.success('Succesfully Added', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })     
  return (
    <div className="w-full min-h-screen flex flex-col box-border items-center justify-center border-4 border-blue-900">
      <div className="m-6 text-5xl font-bold">FOOD ANALYSER :</div>
      <div className="flex flex-row p-4">
        <label htmlFor="cars">Choose a dish:</label>
        <input type="text" className="border-2 mx-2" ref={FoodName} />
      </div>
      <div className="flex flex-row p-4 mx-2">
        <label htmlFor="cars">Specify quantity : </label>
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
            <th className="p-2">Food Name</th>
            <th className="p-2">Calories</th>
            <th className="p-2">Carbs</th>
            <th className="p-2">Protein</th>
            <th className="p-2">Sugar</th>
            <th className="p-2">Fat</th>
            <th className="p-2">Serving Size</th>
          </tr>
        </thead>
        <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  />
        <tbody className="p-4 mx-2 border-2 border-red-900">
          {Food.map((food, index) => {
            return (
              <tr key={index}>
                <td className="p-2">{food.name}</td>
                <td className="p-2">{food.calories}</td>
                <td className="p-2">{food.carbohydrates_total_g}</td>
                <td className="p-2">{food.protein_g}</td>
                <td className="p-2">{food.sugar_g}</td>
                <td className="p-2">{food.fat_total_g}</td>
                <td className="p-2">{food.serving_size_g}</td>
                <td>
                  <button
                    onClick={()=>{handleListChange(food,2)}}
                    className="flex origin-right  px-2 py-1 bg-amber-300 rounded"
                  >
                    Add to List
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MealTracker;