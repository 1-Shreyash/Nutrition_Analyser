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
      console.log(response.data.hits);
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
    <div className="w-full flex flex-col items-center mt-4">
      <div className="m-6 text-5xl font-bold">Meal Planner</div>
      <div className="w-[60%]">
        <div className="p-2">
          <label className="mb-2 text-lg">Cuisine:</label>
          <br />
          <select
            className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
            name="cuisineType"
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="chinese">Chinese</option>
            <option value="south american">South American</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="american">American</option>
            <option value="korean">Korean</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
          </select>
        </div>
        <div className="p-2">
          <label className="mb-2 text-lg">Meal Type:</label>
          <br />
          <select
            className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
            name="mealType"
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="lunch/dinner">Lunch/Dinner</option>
            <option value="breakfast">Breakfast</option>
            <option value="teatime">Teatime</option>
          </select>
        </div>
        <div className="p-2">
          <label className="mb-2 text-lg">Health Label: </label>
          <br />
          <select
            className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
            name="healthLabels"
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="Sugar-Conscious">Sugar-Conscious</option>
            <option value="Vegan">Vegan</option>
            <option value="Alcohol-Free">Alcohol-Free</option>
            <option value="Keto-Friendly">Keto-Friendly</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Tree-Nut-Free">Tree-Nut-Free</option>
          </select>
        </div>
        <div className="p-2">
          <label className="mb-2 text-lg">Dish Type: </label>
          <br />
          <select
            className="mb-3 p-2 w-full border-2 hover:border-slate-400 rounded"
            name="dishType"
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="starter">Starter</option>
            <option value="bread">Bread</option>
            <option value="desserts">Desserts</option>
            <option value="cereals">Cereals</option>
            <option value="biscuits and cookies">Biscuits and Cookies</option>
            <option value="salad">Salad</option>
          </select>
        </div>
      </div>
      <button
        className="mt-4 bg-slate-800 duration-300 hover:bg-slate-600 p-2 rounded-lg text-xl text-white w-40"
        onClick={giveRecipe}
      >
        Submit
      </button>
    </div>
  );
};

export default MealPlanner;