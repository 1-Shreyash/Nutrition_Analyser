import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import { User } from "@auth0/auth0-react";
import { UserAuth } from "../Context/AuthContext";

const MealPlanner = () => {
  // const [Food, setFood] = useState([]);
  const { Food, setFood } = UserAuth();

  const [formData, setFormData] = useState({
    cuisineType: "",
    mealType: "",
    health: "",
    dishType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);

  //Food
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

  const giveRecipe = async () => {
    const options = {
      method: "GET",
      url: "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2",
      params: {
        type: "public",
        co2EmissionsClass: "A+",
        "field[0]": "uri",
        beta: "true",
        random: "true",
        "cuisineType[0]": formData.cuisineType,
        "mealType[0]": formData.mealType,
        "health[0]": formData.health,
        "dishType[0]": formData.dishType,
      },
      headers: {
        "Accept-Language": "en",
        "X-RapidAPI-Key": "6c0d0afbcemsh6f72cb828b7adc2p1ca4c3jsn05848e41c10b",
        "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      let updatedData = [response.data.hits];
      // console.log(response.data.hits);
      setFood(updatedData);
      localStorage.setItem("foodEat", JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("foodEat"));
    if (data) {
      setFood(data);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col box-border items-center justify-center border-4 border-blue-900">
      <div className="m-6 text-5xl font-bold">Meal Planner:</div>
      <div className="flex flex-row p-4">
        <label className="mb-2 text-lg">Cuisine:</label>
        <select
          className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
          name="cuisineType"
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="chinese">chinese</option>
          {/* <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="fanstore">Fanstore</option> */}
        </select>
      </div>
      <div className="flex flex-row p-4">
        <label className="mb-2 text-lg">Meal Type:</label>
        <select
          className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
          name="mealType"
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="lunch/dinner">lunch/dinner</option>
          {/* <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="fanstore">Fanstore</option> */}
        </select>
      </div>
      <div className="flex flex-row p-4">
        <label className="mb-2 text-lg">Health Label: </label>
        <select
          className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
          name="healthLabels"
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="Sugar-Conscious">Sugar-Conscious</option>
          <option value="Keto-Friendly">Keto-Friendly</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Tree-Nut-Free">Tree-Nut-Free</option>
        </select>
      </div>
      <div className="flex flex-row p-4">
        <label className="mb-2 text-lg">Dish Type: </label>
        <select
          className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
          name="dishType"
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="sstarterhoes">starter</option>
          {/* <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="fanstore">Fanstore</option> */}
        </select>
      </div>

      {/* <div className="flex flex-row p-4">
        <label htmlFor="cars">Cuisine: </label>
        <input type="text" className="border-2 mx-2" ref={FoodName} />
      </div> */}
      <button
        className="bg-black p-2 rounded-lg text-white"
        onClick={giveRecipe}
      >
        Submit
      </button>
      {/*
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
        <tbody className="p-4 mx-2 border-2 border-red-900">
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
        </tbody>
      </table> */}
    </div>
  );
};

export default MealPlanner;
