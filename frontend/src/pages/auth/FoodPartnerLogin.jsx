import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function FoodPartnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((Response) => {
        console.log(Response.data);
        navigate("/create-food");
      })
      .catch((error) => {
        alert("Food Partner Login Error", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-zinc-950 to-purple-950 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Partner Login
          </span>
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition disabled:opacity-70"
          >
            {loading && <Loader2 className="animate-spin mr-2" size={20} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google login placeholder (optional) */}
        {/* 
        <button className="w-full mt-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white">
          Login with Google
        </button>
        */}

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/food-partner/register"
            className="text-purple-400 hover:text-purple-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
