// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [role, setRole] = useState("user");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white flex flex-col">
      {/* NAV */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-extrabold flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-black">🍴</span>
          <span className="text-purple-400">FoodSnatch</span>
        </h1>

        <nav className="hidden md:flex gap-6 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Order. Share. <span className="text-purple-400">Enjoy.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Welcome to FoodSnatch — where foodies connect with partners. Sign up or login to watch delicious food reels and discover local stores instantly.
        </p>

        {/* Role Switcher */}
        <div className="mt-10 inline-flex bg-white/5 p-1 rounded-2xl backdrop-blur border border-white/6">
          <button
            onClick={() => setRole("user")}
            className={`px-6 py-3 rounded-lg font-medium transition ${role === "user"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105"
              : "text-gray-300 hover:text-white"
            }`}
          >
            For Users
          </button>
          <button
            onClick={() => setRole("partner")}
            className={`px-6 py-3 rounded-lg font-medium transition ${role === "partner"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl scale-105"
              : "text-gray-300 hover:text-white"
            }`}
          >
            For Food Partners
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-6 justify-center flex-wrap">
          <Link
            to={role === "user" ? "/user/register" : "/food-partner/register"}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition text-white font-medium transform active:scale-95"
          >
            {role === "user" ? "User Signup" : "Partner Signup"}
          </Link>
          <Link
            to={role === "user" ? "/user/login" : "/food-partner/login"}
            className="px-6 py-3 rounded-xl bg-transparent border border-white/8 hover:bg-white/6 transition text-gray-300 font-medium transform active:scale-95"
          >
            {role === "user" ? "User Login" : "Partner Login"}
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} FoodSnatch. Built with ❤️ for food lovers.
      </footer>
    </div>
  );
}
