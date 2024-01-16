import React from "react";
import Recipe from "./Recipe";
import { UserAuth } from "../Context/AuthContext";

const Repo = () => {
  const { Food, setList } = UserAuth();
  return (
    <div className="grid grid-cols-4">
      {Food[0]?.map((food) => {
        return (
          <a href={food.recipe.shareAs} target="_blank">
            <Recipe
              dataImage={food.recipe.image}
              header={food.recipe.label}
              content={food.recipe.dishType[0]}
            />
            {/* <button onClick={()=>{}} className="flex origin-right  px-2 py-1 bg-amber-300 rounded">
              Add to list
            </button> */}
          </a>
        );
      })}
    </div>
  );
};

export default Repo;
