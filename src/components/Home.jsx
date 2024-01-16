import React from "react";
import himg from "../resources/HFimg.gif";
import NutritionAnalysis from "../resources/NutritionAnalysis.jpeg";
import MealPlanner from "../resources/MealPlanner.webp";


const Home = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-row items-center justify-center">
        <div className="w-[50%] lemon-regular text-5xl pl-40 text-center">
          <span className="text-green-600">Healthy</span> eating is a form of
          self-respect. Choose foods that love you back.
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <img className="w-[70%]" src={himg} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center text-5xl my-16 lemon-regular pt-6">
        UNIQUE FEATURES :{" "}
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col justify-center items-center text-center w-[70%]">
          <div className="flex justify-center items-center text-4xl text-green-800 lemon-regular pt-6">
            NUTRITION ANALYSER
          </div>
          <div className="text-2xl font-bold  pt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus voluptates at porro harum architecto laboriosam
            doloremque libero molestias, est, eveniet sit. Minima, totam.
            Laborum explicabo fuga id vitae temporibus exercitationem odio fugit
            quis corporis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
