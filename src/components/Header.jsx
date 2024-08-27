import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    try {
      toggleMenu();
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center fixed top-0 z-50 pt-4">

    <nav
      className={`tracking-wider w-[98vw] max-md:w-[96vw] p-4 md:p-6 transition-all duration-300 ${
        isScrolled ? "bg-blue-500" : "bg-blue-500"
      } text-black bg-[#EAF4E6]  rounded-xl`}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold hover:scale-105 transition-transform text-2xl md:text-4xl text-green-800 lemon-regular">
          HEALTHIFY
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden relative flex items-center justify-center w-10 h-10"
        >
          <svg
            className={`ham hamRotate ham4 ${isOpen ? "active" : ""}`}
            viewBox="0 0 100 100"
            width="50"
            height="50"
          >
            <path
              className="line top black"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              stroke="black"
              fill="none"
            />
            <path
              className="line middle black"
              d="m 70,50 h -40"
              stroke="black"
              fill="none"
            />
            <path
              className="line bottom black"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              stroke="black"
              fill="none"
            />
          </svg>
        </button>
        <ul className="hidden lg:flex space-x-6">
          <li className="hover:scale-110 transition-transform text-lg">
            <Link to="/" className="text-black">
              Home
            </Link>
          </li>
          <li className="hover:scale-110 transition-transform text-lg">
            <Link to="/nutritionCalculator" className="text-black">
              Nutrition Calculator
            </Link>
          </li>
          {user ? (
            <>
              <li className="hover:scale-110 transition-transform text-lg">
                <Link to={`/user/${user.email}`} className="text-black">
                  Dashboard
                </Link>
              </li>
              <li className="hover:scale-110 transition-transform text-lg">
                <Link to="/MealPlanner" className="text-black">
                  MealPlanner
                </Link>
              </li>
              <li className="text-lg">
                {user.email}
              </li>
              <li className="hover:scale-110 transition-transform text-lg">
                <div className="text-black" onClick={handleLogOut}>
                  Logout
                </div>
              </li>
            </>
          ) : (
            <li className="hover:scale-110 transition-transform text-lg">
              <Link to="/login" className="text-black">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen pb-4" : "max-h-0"
        } overflow-hidden lg:hidden transition-all duration-500 text-lg`}
      >
        <ul className="mt-4 space-y-2 text-black">
          <Slide direction="down" duration={300}>
            <li>
              <Link to="/" className="block px-4 py-2" onClick={toggleMenu}>
                Home
              </Link>
            </li>
          </Slide>
          <Slide direction="down" duration={300}>
            <li>
              <Link
                to="/nutritionCalculator"
                className="block px-4 py-2"
                onClick={toggleMenu}
              >
                Nutrition Calculator
              </Link>
            </li>
          </Slide>
          {user ? (
            <>
              <Slide direction="down" duration={300}>
                <li>
                  <Link
                    to={`/user/${user.email}`}
                    className="block px-4 py-2"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                </li>
              </Slide>
              <Slide direction="down" duration={300}>
                <li>
                  <Link
                    to="/MealPlanner"
                    className="block px-4 py-2"
                    onClick={toggleMenu}
                  >
                  MealPlanner
                  </Link>
                </li>
              </Slide>

              <Slide direction="down" duration={300}>
                <li className="block px-4 py-2">
                  {user.email}
                </li>
              </Slide>
              <Slide direction="down" duration={300}>
                <li>
                  <div onClick={handleLogOut} className="block px-4 py-2">
                    LogOut
                  </div>
                </li>
              </Slide>
            </>
          ) : (
            <Slide direction="down" duration={300}>
              <li>
                <Link to="/login" className="block px-4 py-2" onClick={toggleMenu}>
                  Log In
                </Link>
              </li>
            </Slide>
          )}
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Header;
