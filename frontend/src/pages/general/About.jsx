import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react"; // modern icon

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white flex flex-col">
      {/* NAV with Home Icon */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-extrabold flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-black">🍴</span>
          <span className="text-purple-400">FoodSnatch</span>
        </h1>

        {/* Home Button */}
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </header>

      {/* ABOUT CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          About <span className="text-purple-400">FoodSnatch</span>
        </h2>
        <p className="mt-6 max-w-3xl text-gray-400 text-lg leading-relaxed">
          FoodSnatch is more than just a food platform — it’s a community for food lovers.  
          We connect <span className="text-purple-300">foodies</span> with local food partners, 
          giving you access to <span className="text-pink-400">mouth-watering reels</span>, 
          exciting food experiences, and the opportunity to discover hidden gems near you.
        </p>
        <p className="mt-4 max-w-2xl text-gray-400">
          Whether you’re here to explore new tastes or showcase your culinary skills, 
          FoodSnatch makes food discovery social, fun, and easy.
        </p>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} FoodSnatch. Built with ❤️ for food lovers.
      </footer>
    </div>
  );
}
