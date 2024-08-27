import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { db } from '../Firebase';
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { UserAuth } from '../Context/AuthContext';
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [Food, setFood] = useState([]);
  const { user, List } = UserAuth();
  let Protein = 0;
  let Carbs = 0;
  let Sodium = 0;
  let Fat = 0;
  for (let i = 0; i < List.length; i++) {
    Protein += List[i].protein;
    Carbs += List[i].carbs;
    Fat += List[i].fat;
    Sodium += (List[i].sodium / 1000);
  }

  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);

  const [Meals, setMeals] = useState([]);
  const data = [
    ["Task", "Amount"],
    ["Fats", Fat],
    ["Carbs", Carbs],
    ["Protein", Protein],
    ["Fibre", Carbs],
    ["Sodium", Sodium],
  ];
  const options = {
    title: "My DAILY NUTRITION CHART",
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMeals(doc.data()?.meals);
    });
  }, [user?.email]);

  const FetchData = async () => {
    const q = `${FoodQuantity.current.value}g ${FoodName.current.value}`;
    console.log(q);
    const options = {
      method: "GET",
      url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
      params: { query: q },
      headers: {
        "X-RapidAPI-Key": "5a039eaa0dmsh0845f457c18724cp123e21jsn195f802a65ff",
        "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const updatedData = [...Food, response.data];
      console.log(response.data);
      setFood(updatedData);
      localStorage.setItem("foodEat", JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("foodEat"));
    if (data) {
      setFood(data);
    }
  }, []);

  return (
    <div className="w-full mt-28 p-4 lg:p-12 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Food Name</th>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Calories</th>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Carbs</th>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Protein</th>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Fat</th>
              <th className="p-2 lg:p-4 text-xs lg:text-sm font-medium">Sodium</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {List.map((food, index) => (
              <tr key={index}>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{food.name}</td>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{(Math.round(food.calories * 100) / 100).toFixed(2)}</td>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{(Math.round(food.carbs * 100) / 100).toFixed(2)}</td>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{(Math.round(food.protein * 100) / 100).toFixed(2)}</td>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{(Math.round(food.fat * 100) / 100).toFixed(2)}</td>
                <td className="p-2 lg:p-4 text-xs lg:text-sm">{(Math.round(food.sodium * 100) / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full lg:w-1/3">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
