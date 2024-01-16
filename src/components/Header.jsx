import React, { useState, useEffect,useNavigate} from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { db } from '../Firebase';
import {updateDoc,doc,onSnapshot,setDoc} from "firebase/firestore"
import MealPlanner from "./MealPlanner";
import { UserAuth } from '../Context/AuthContext';

const Header = () => {
  const {user,logOut}=UserAuth();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-black rounded-xl w-[98%] m-4">
      {/* <Image src={zetlogo} className='h-10 -ml-5'/> */}
      <button className="bg-[#2075f0] rounded p-2">Nutrition Tracker</button>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/nutritionCalculator">Nutrition Calculator</Link>
        </li>
        {user && <li className="p-4">
          {user.email}
        </li>}

        {user && (
          <li className="p-4">
            <Link
              className="text-lg font-semibold duration-300 text-white hover:text-xl"
              onClick={logOut}
            >
              Log out
            </Link>
          </li>
        )}
         {!user && (
          <li className="p-4">
            <Link
              className="text-lg font-semibold duration-300 text-white hover:text-xl"
              to="/Login"
            >
              Log In
            </Link>
          </li>
        )}
        {user && (
          <>
            <li className="p-4">
              <Link to={`/user/${user.email}`}>Dashboard</Link>
            </li>
            <li className="p-4">
              <Link to="/MealPlanner">MealPlanner</Link>
            </li>

            <li className="p-4">
              <div className="flex gap-2 place-items-center">
                {/* <img
                  src={user.image}
                  className="w-8 rounded-full"
                  alt="user avatar"
                /> */}
                {/* <div>{user?.name}</div> */}
              </div>
            </li>
          </>
        )}
      </ul>

      {/** For Mobile */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} className="fixed right-10" />
        ) : (
          <AiOutlineMenu size={20} className="fixed left-10" />
        )}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r bg-[#110011] border-r-gray-900 ease-in-out duration-500 z-50 "
            : "fixed left-[-100%] z-50 "
        }
      >
        <ul className="pt-12 uppercase p-4">
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => handleNav()}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => handleNav()}
          >
            <Link to="/nutritionCalculator">Nutrition Calculator</Link>
          </li>
          <li
            className="p-4 border-b border-gray-600"
            onClick={() => handleNav()}
          >
            <Link to="/Contact">Contact us</Link>
          </li>
          {!user && (
            <li>
              {/* <Link onClick={() => loginWithRedirect()}>Log In</Link> */}
            </li>
          )}
          {user && (
            <>
              <li className="p-4 border-b border-gray-600">
                <Link to={`/user/${user.email}`}>Dashboard</Link>
              </li>
              <li className="p-4 border-b border-gray-600">
                <button
                  onClick={
                    logOut
                  }
                >
                  Log Out
                </button>
              </li>

              <li className="p-4 border-b border-gray-600">
                <div className="flex gap-2 place-items-center">
                  <img
                    src={user.image}
                    className="w-8 rounded-full"
                    alt="user avatar"
                  />
                  {/* <div>{user.name}</div> */}
                </div>
              </li>
            </>
          )}
          <li className="p-2">
            <button
              className="bg-[#2075f0] rounded p-2"
              onClick={() => handleNav()}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;