import React from "react";
import Repo from "./Repo";
import MealPlanner from "./MealPlanner";

const MealPlannerPage = () => {
  return (
    <div className="w-full flex flex-row max-lg:flex-col justify-center items-start gap-3 mt-28">
    <div className="w-[90%] lg:w-[30%]">
      <MealPlanner />
    </div>
      <div className="w-[90%] flex justify-center items-center lg:w-[70%]">
        <Repo />
      </div>
    </div>
  );
};

export default MealPlannerPage;
