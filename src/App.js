import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MealTracker from './components/MealTracker';
import Dashboard from './components/Dashboard';
import Blogs from './components/Blogs';
import Feedback from './components/Feedback';
import NutritionCalculator from './components/NutritionCalculator';
import MealPlanner from './components/MealPlanner';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nutritionCalculator" element={<MealTracker/>}/>
        <Route path="/user/:id" element={<Dashboard/>}/>
        <Route path="/MealPlanner" element={<MealPlanner/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
