import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister"
import UserLogin from "../pages/auth/UserLogin"
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister"
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin"
import Home from "../pages/general/Home"
import CreateFood from "../pages/food-partner/CreateFood";
import Reels from "../pages/general/Reels"
import FoodPartnerProfile from "../pages/food-partner/FoodPartnerProfile";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister/>}></Route>
                <Route path="/user/login" element={<UserLogin/>}></Route>
                <Route path="/food-partner/register" element={<FoodPartnerRegister/>}></Route>
                <Route path="/food-partner/login" element={<FoodPartnerLogin/>}></Route>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/create-food" element={<CreateFood/>}></Route>
                <Route path="/reels" element={<Reels/>}></Route>
                <Route path="/food-partner/:profile" element={<FoodPartnerProfile/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;
