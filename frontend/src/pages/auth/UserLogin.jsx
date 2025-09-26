import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
          User Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition transform hover:scale-105 active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/user/register"
            className="text-purple-400 hover:text-purple-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
