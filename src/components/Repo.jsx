import React from "react";
import Recipe from "./Recipe";
import { UserAuth } from "../Context/AuthContext";

const Repo = () => {
  const { Food, setList, handleListChange } = UserAuth();
  return (
    <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Food[0]?.map((food) => {
        return (
          <div>
            <a href={food.recipe.shareAs} target="_blank">
              <Recipe
                key={food.recipe.label}
                dataImage={food.recipe.image}
                header={food.recipe.label}
                content={food.recipe.dishType[0]}
              />
            </a>
            <button
              onClick={() => handleListChange(food, 1)}
              className="flex origin-right  px-2 py-1 bg-amber-300 rounded"
            >
              Add to list
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Repo;
