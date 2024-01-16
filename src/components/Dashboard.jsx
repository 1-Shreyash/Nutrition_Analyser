import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { db } from '../Firebase';
import {updateDoc,doc,onSnapshot} from "firebase/firestore"
import { UserAuth } from '../Context/AuthContext';
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [Food, setFood] = useState([]);
  const {user,List}=UserAuth();
  var Protein=0;
  var Carbs=0;
  var Sodium=0;
  var Fat=0;
  for(var i=0;i<List.length;i++){
    Protein+=List[i].protein;
    Carbs+=List[i].carbs;
    Fat+=List[i].fat;
    Sodium+=(List[i].sodium/1000);
  }
  const FoodName = useRef(null);
  const FoodQuantity = useRef(null);

    const [Meals,setMeals]=useState([]);
   const data = [
      ["Task", "Hours per Day"],
      ["Fats", Fat],
      ["Carbs", Carbs],
      ["Protein", Protein],
      ["Fibre", Carbs],
      ["Sodium", Sodium],
      
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

         <table className="table">
        <thead>
          <tr>
            <th className="p-2">Food Name</th>
            <th className="p-2">Calories</th>
            <th className="p-2">Carbs</th>
            <th className="p-2">Protein</th>
            <th className="p-2">Fat</th>
            <th className="p-2">Sodium</th>
          </tr>
        </thead>
        <tbody className="p-4 mx-2 border-2 border-red-900">
          {List.map((food) => {
            return (
              <tr>
                <td className="p-2">{food.name}</td>
                <td className="p-2">{food.calories}</td>
                <td className="p-2">{food.carbs}</td>
                <td className="p-2">{food.protein}</td>
                <td className="p-2">{food.fat}</td>
                <td className="p-2">{food.sodium}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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