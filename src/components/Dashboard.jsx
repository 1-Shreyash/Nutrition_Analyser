import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [Food, setFood] = useState([]);
  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);

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
