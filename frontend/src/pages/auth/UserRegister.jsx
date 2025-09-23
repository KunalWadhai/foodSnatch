import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiUrl, axiosConfig } from "../../config/config";

export default function UserRegister() {
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault();
     const fullname = e.target.fullname.value; // fields declared as ID in the form data 
     const email = e.target.email.value;
     const password = e.target.password.value; 
     console.log(fullname + " " + email + " " + password);

     try {
       const response = await axios.post(getApiUrl("/api/auth/user/register"), {
         fullname,
         email,
         password
       },
       axiosConfig
      );
      // if cookie should to store at the frontend then we must use withCredentials:true
       console.log(response);

       navigate("/");
     } catch (error) {
       console.error("Registration error:", error);
       alert("Registration failed. Please try again.");
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md p-8 rounded-2xl bg-transparent border border-zinc-900 shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-purple-500 mb-6">
          User Signup
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input id="fullname" type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="password" type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          
          <button type="submit" className="w-full py-3 rounded-lg bg-purple-400 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
            Register
          </button>
        </form>

        {/**
              <button className="w-full mt-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white">
            Sign up with Google
          </button>
         */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/user/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
