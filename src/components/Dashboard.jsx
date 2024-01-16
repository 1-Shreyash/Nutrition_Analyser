import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { db } from '../Firebase';
import {updateDoc,doc,onSnapshot} from "firebase/firestore"
import { UserAuth } from '../Context/AuthContext';
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [Food, setFood] = useState([]);
  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);
  const {user}=UserAuth();
    const [Meals,setMeals]=useState([]);
   const data = [
      ["Task", "Hours per Day"],
      ["Fats", 11],
      ["Carbs", 2],
      ["Protein", 2],
      ["Fibre", 2],
      
    ];
    const options = {
      title: "My Daily Activities",
    };
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMeals(doc.data()?.meals);
        });
      }, [user?.email]);
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
    <div className="w-full min-h-screen h-screen flex justify-between border-blue-900">
        <div>
        {Meals.map((item) => (
            <div
              className='flex flex-col space-y-2'
            >
              {item}

            </div>
          ))}
        </div>
      
              <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
    </div>
  );
};

export default Dashboard;