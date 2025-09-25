import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function UserLogin() {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try{
       const respone = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/login`, {
          email,
          password
        }, { withCredentials: true });
       console.log(respone.data);
       navigate("/reels"); 
    }
    catch(error){
        console.error("Login error:", error);
       alert("Login Failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 border">
      <div className="w-full max-w-md p-8 rounded-2xl bg-transparent border border-zinc-900 shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-purple-500 mb-6">
          User Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input id="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="password" type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          
          <button type="submit" className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
            Login
          </button>
        </form>
        
        {/**
          
        <button className="w-full mt-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white">
          Login with Google
        </button>
         */}

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/user/register" className="text-purple-400 hover:text-purple-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
