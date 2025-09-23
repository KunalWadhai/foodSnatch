import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react"; // modern icon

export default function Contact() {
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
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </header>

      {/* CONTACT CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Get in <span className="text-purple-400">Touch</span>
        </h2>
        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Have questions, feedback, or ideas to share?  
          We’d love to hear from you. Drop us a message and our team will get back to you soon.
        </p>

        <form className="mt-10 w-full max-w-lg space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transform active:scale-95 transition"
          >
            Send Message
          </button>
        </form>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} FoodSnatch. Built with ❤️ for food lovers.
      </footer>
    </div>
  );
}
