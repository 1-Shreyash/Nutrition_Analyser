import React from "react";
import himg from "../resources/HFimg.gif";
import NutritionAnalysis from "../resources/NutritionAnalysis.jpeg";
import MealPlanner from "../resources/MealPlanner.webp";
import UI from "../resources/UI2.gif"
import Fade from 'react-reveal/Fade';

const Home = () => {
  return (
    <div className="flex flex-col p-6 pt-48">
      <Fade top>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full lg:w-[50%] lemon-regular text-2xl md:text-3xl lg:text-5xl lg:pl-40 text-center">
          <span className="text-green-600">Healthy</span> eating is a form of
          self-respect. Choose foods that love you back.
        </div>
        <div className="w-full lg:w-[50%] flex items-center justify-center">
          <img className="w-[70%] m-12" src={himg} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center text-3xl md:text-4xl lg:text-5xl my-16 lemon-regular pt-6">
        UNIQUE FEATURES {" "}
      </div>
      </Fade>
<Fade left>
      <div className="w-full flex flex-col justify-center items-center lg:flex-row my-8">
        <div className="flex flex-col justify-center items-center text-center w-full lg:w-[70%] pt-4 lg:p-24">
          <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl text-green-800 lemon-regular pt-6">
            NUTRITION ANALYSER
          </div>
          <div className="text-xl md:text-2xl font-bold pt-4">
            
Introducing a Nutrition Analysis App: Effortlessly log meals, analyze macronutrients, and set personalized dietary goals for a comprehensive view of your nutritional intake. Elevate your well-being with a tool that goes beyond calorie counting, providing education and insights for a balanced and sustainable lifestyle.
          </div>
        </div>
        <img src={NutritionAnalysis} className="w-[70%] lg:w-[30%] rounded-md m-12" alt="" />
      </div>
</Fade>
      <Fade right>
      <div className="w-full flex flex-col justify-center items-center lg:flex-row my-8">
  <div className="flex flex-col justify-center items-center text-center w-full lg:w-[70%] pt-4 lg:p-24">
    <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl text-green-800 lemon-regular pt-6">
      MEAL PLANNER
    </div>
    <div className="text-xl md:text-2xl font-bold pt-4">
      Introducing a Nutrition Analysis App: Effortlessly log meals, analyze macronutrients, and set personalized dietary goals for a comprehensive view of your nutritional intake. With features like barcode scanning, allergen alerts, and progress tracking, this user-friendly app empowers individuals to make informed and healthy choices. Elevate your well-being with a tool that goes beyond calorie counting, providing education and insights for a balanced and sustainable lifestyle.
    </div>
  </div>
  <img src={MealPlanner} className="w-[90%] lg:w-[30%] lg:h-[50%] rounded-md m-12" alt="Meal Planner" />
</div>

      </Fade>


      <Fade left>
      <div className="w-full flex flex-col justify-center items-center lg:flex-row my-8">
  <div className="flex flex-col justify-center items-center text-center w-full lg:w-[70%] pt-4 lg:p-24">
    <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl text-green-800 lemon-regular pt-6">
      INTERACTIVE UI
    </div>
    <div className="text-xl md:text-2xl font-bold pt-4">
      Immerse yourself in a seamless online experience with our website's interactive UI. Navigate effortlessly through dynamic menus, engaging visuals, and personalized content tailored to your interests. Elevate user satisfaction with a responsive interface that transforms browsing into a captivating journey.
    </div>
  </div>
  <img src={UI} className="w-[90%] lg:w-[30%] rounded-md m-12" alt="Interactive UI" />
</div>

      </Fade>
    </div>
  );
};

export default Home;
