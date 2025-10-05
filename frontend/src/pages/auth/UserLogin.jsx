import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/reels");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-fadeIn scale-100">
        {/* App Logo / Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            FoodSnatch 🍽️
          </div>
          <p className="text-gray-400 text-center mt-3 text-sm max-w-xs leading-relaxed">
            Discover and share your favorite meals!  
            From street bites to gourmet delights — join the community that loves food as much as you do.
          </p>
        </div>

        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6 drop-shadow-lg">
          Welcome Back 👋
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
          />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 
              ${
                loading
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white opacity-80 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/user/register"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Register Now
          </Link>
        </p>

        {/* Decorative Bottom Line */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold">
            FoodSnatch
          </span>{" "}
          — Share, Discover & Relish Every Bite 🍕
        </div>
      </div>
    </div>
  );
}
