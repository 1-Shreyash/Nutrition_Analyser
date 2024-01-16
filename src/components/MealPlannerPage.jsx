import React from "react";
import Repo from "./Repo";
import MealPlanner from "./MealPlanner";

const MealPlannerPage = () => {
  return (
    <div className="w-full flex gap-3">
      <div className="w-[70%]">
        <Repo />
      </div>
      <div className="w-[30%]">
        <MealPlanner />
      </div>
    </div>
  );
};

export default MealPlannerPage;
