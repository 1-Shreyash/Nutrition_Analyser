import React, { useRef, useState } from "react";
import axios from "axios";
import { UserAuth } from "../Context/AuthContext";

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

  return (
    <div className="w-full text-xl min-h-screen flex flex-col box-border items-center justify-center ">
      <div className="m-6 text-5xl font-bold">Find your food</div>
      <div className="flex flex-col p-4">
        <label htmlFor="cars">Choose a dish:</label>
        <input
          type="text"
          className="border-2 mx-2 mt-1 px-2 py-1 rounded-md"
          ref={FoodName}
        />
      </div>
      <div className="flex flex-col p-4 mx-2">
        <label htmlFor="cars">Specify quantity (in grams): </label>
        <input
          type="number"
          className="mx-2 border-2 mt-1 px-2 py-1 rounded-md"
          ref={FoodQuantity}
        />
      </div>
      <button
        className="bg-black p-2 rounded-lg text-white"
        onClick={FetchData}
      >
        Submit
      </button>
      <table className="table mt-10">
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
        <tbody className="p-4 mx-2 border-t-2 border-zinc-600">
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
                    onClick={() => handleListChange(food, 2)}
                    className="flex origin-right px-2 py-1 bg-slate-800 rounded text-slate-200"
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
