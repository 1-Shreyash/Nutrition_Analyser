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
    <div className="w-full text-xl flex flex-col box-border items-center justify-center mt-28">
      <div className="m-6 text-3xl lg:text-5xl font-bold">Find your food</div>
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
      </button><div className="overflow-x-auto">
  <table className="hidden lg:table min-w-full table-auto mt-10 mx-2">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 text-left">Food Name</th>
        <th className="p-2 text-left">Calories</th>
        <th className="p-2 text-left">Carbs</th>
        <th className="p-2 text-left">Protein</th>
        <th className="p-2 text-left">Sugar</th>
        <th className="p-2 text-left">Fat</th>
        <th className="p-2 text-left">Serving Size</th>
        <th className="p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white border-t-2 border-zinc-600">
      {Food.map((food, index) => (
        <tr key={index} className="border-b">
          <td className="p-2">{food.name}</td>
          <td className="p-2">{food.calories}</td>
          <td className="p-2">{food.carbohydrates_total_g}</td>
          <td className="p-2">{food.protein_g}</td>
          <td className="p-2">{food.sugar_g}</td>
          <td className="p-2">{food.fat_total_g}</td>
          <td className="p-2">{food.serving_size_g}</td>
          <td className="p-2">
            <button
              onClick={() => handleListChange(food, 2)}
              className="px-2 py-1 bg-slate-800 rounded text-slate-200"
            >
              Add to List
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Vertical layout for small screens */}
  <div className="lg:hidden flex flex-col gap-4 mt-10 mx-2">
    {Food.map((food, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-md shadow-md p-4"
      >
        <div className="mb-2">
          <span className="font-bold">Food Name: </span>{food.name}
        </div>
        <div className="mb-2">
          <span className="font-bold">Calories: </span>{food.calories}
        </div>
        <div className="mb-2">
          <span className="font-bold">Carbs: </span>{food.carbohydrates_total_g}g
        </div>
        <div className="mb-2">
          <span className="font-bold">Protein: </span>{food.protein_g}g
        </div>
        <div className="mb-2">
          <span className="font-bold">Sugar: </span>{food.sugar_g}g
        </div>
        <div className="mb-2">
          <span className="font-bold">Fat: </span>{food.fat_total_g}g
        </div>
        <div className="mb-2">
          <span className="font-bold">Serving Size: </span>{food.serving_size_g}g
        </div>
        <button
          onClick={() => handleListChange(food, 2)}
          className="w-full mt-4 px-4 py-2 bg-slate-800 text-slate-200 rounded-md"
        >
          Add to List
        </button>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default MealTracker;
