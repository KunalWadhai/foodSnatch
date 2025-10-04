import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function UserRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/register`,
        { fullname, email, password },
        { withCredentials: true }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Background animated orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[180px] top-10 left-[-200px] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-pink-700/20 rounded-full blur-[200px] bottom-0 right-[-200px] animate-ping"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Left side - Branding */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left mb-12 md:mb-0 md:pr-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent leading-tight">
            Welcome to <span className="text-purple-300">FoodSnatch</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            Discover the ultimate way to <span className="text-purple-400">snatch your food</span> 
            in seconds. From street bites to gourmet delights, FoodSnatch brings 
            your cravings to your doorstep faster than ever.
          </p>
          <ul className="mt-6 space-y-3 text-gray-400 text-base">
            <li>🍔 Order food in just a click</li>
            <li>⚡ Superfast delivery at your location</li>
            <li>🌙 Sleek, dark-mode experience</li>
            <li>💳 Secure payments & exclusive rewards</li>
          </ul>
        </div>

        {/* Right side - Register form */}
        <div className="flex-1">
          <div className="w-full max-w-md mx-auto p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  id="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 transition transform hover:scale-105 active:scale-95"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
