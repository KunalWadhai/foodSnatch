import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Loader2, Store, Rocket, Sparkles } from "lucide-react";

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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-purple-950 overflow-hidden text-white">
      {/* Floating glow effects */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-between backdrop-blur-2xl border border-white/10 bg-white/5 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden">
        {/* Left side - brand context */}
        <div className="hidden md:flex flex-col justify-center p-10 w-1/2 bg-gradient-to-b from-purple-700/30 to-pink-700/10 backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f')] bg-cover bg-center opacity-10 rounded-l-3xl" />
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Welcome Back, Food Partner 🍴
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Manage your dishes, upload reels, and engage thousands of local foodies. 
              FoodSnatch helps your store shine with video-first discovery and community-powered growth.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3 text-gray-200">
                <Store className="text-pink-400" size={20} />
                <span>Showcase your best-selling dishes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Rocket className="text-purple-400" size={20} />
                <span>Grow your brand through short food reels</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Sparkles className="text-pink-300" size={20} />
                <span>Connect directly with passionate food lovers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-zinc-950/70 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Partner Login
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Your business email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none transition"
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

          {/* Register redirect */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don’t have a partner account?{" "}
            <Link
              to="/food-partner/register"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
