import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Truck, Clock, Star, Menu } from "lucide-react";

export default function Home() {
  const [role, setRole] = useState("user");

  const fade = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } };
  const pop = { hidden: { scale: 0.98, opacity: 0 }, show: { scale: 1, opacity: 1 } };

  // Utility to check login
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-zinc-950 to-black text-white flex flex-col">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-sm/20 bg-white/3 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-2 flex items-center justify-center shadow-2xl">
              <span className="text-black text-xl">🍴</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
                FoodSnatch
              </h1>
              <p className="text-xs text-white/50 -mt-1">Connect • Share • Inspire</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/About" className="hover:text-white transition">About</Link>
            <Link to="/Contact" className="hover:text-white transition">Contact</Link>
            <Link to={role === "user" ? "/user/login" : "/food-partner/login"} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/8 transition">Sign in</Link>
          </nav>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 rounded-lg bg-white/2">
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.section initial="hidden" animate="show" variants={fade} className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full px-3 py-1.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-white/6 shadow-md">
              <span className="text-sm">🚀</span>
              <span className="text-sm font-medium text-white/85">Join 500+ Creators & Food Enthusiasts — Share your passion</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Create. Share.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
                Inspire.
              </span>
            </h2>

            <p className="text-lg text-white/70 max-w-xl">
              Welcome to <span className="text-purple-300 font-semibold">FoodSnatch</span> — your social hub for food lovers and culinary creators. Watch trending reels, share your food moments, and connect with local food partners who make your city’s taste come alive.
            </p>

            {/* Role Switcher */}
            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white/3 p-1 flex items-center shadow-sm backdrop-blur-md border border-white/6">
                <button
                  onClick={() => setRole("user")}
                  aria-pressed={role === "user"}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    role === "user"
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-xl scale-105'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  For Users
                </button>
                <button
                  onClick={() => setRole("partner")}
                  aria-pressed={role === "partner"}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    role === "partner"
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-black shadow-xl scale-105'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  For Partners
                </button>
              </div>

              <motion.div initial="hidden" animate="show" variants={pop} className="ml-3">
                <span className="text-xs text-white/60">Selected:</span>
                <div className="text-sm font-semibold">{role === 'user' ? 'Foodie Mode' : 'Partner Dashboard'}</div>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to={role === "user" ? "/user/register" : "/food-partner/register"}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-black font-semibold shadow-2xl transform hover:scale-[1.03] active:scale-95 transition"
              >
                {role === "user" ? "Join as User" : "Join as Partner"}
                <span aria-hidden>→</span>
              </Link>

              <Link
                to={role === "user" ? "/user/login" : "/food-partner/login"}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 text-white/90 font-medium hover:bg-white/8 transition"
              >
                {role === "user" ? "User Login" : "Partner Login"}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" /> <span>Trending food reels</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> <span>Quick connections</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" /> <span>Local discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> <span>Loved by creators</span>
              </div>
            </div>
          </motion.section>

          {/* PREVIEW CARD */}
          <motion.aside initial="hidden" animate="show" variants={pop} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/6 backdrop-blur-md bg-gradient-to-br from-white/3 via-white/2 to-transparent">
              <div className="px-4 py-3 flex items-center justify-between bg-white/3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-black font-bold shadow">🎥</div>
                  <div>
                    <div className="text-sm font-semibold">Flavor Stories</div>
                    <div className="text-xs text-white/60">Featured • 2.1k views</div>
                  </div>
                </div>
                <div className="text-xs text-white/50">By @flavorkeeper</div>
              </div>

              <div className="aspect-[16/10] bg-[linear-gradient(45deg,#11182770,#0f172a70)] flex items-end p-6">
                <div className="w-full">
                  <div className="rounded-2xl p-4 bg-gradient-to-b from-white/4 to-white/2 border border-white/6 backdrop-blur-md">
                    <h3 className="text-lg font-bold">Behind the Taste</h3>
                    <p className="text-sm text-white/60 mt-1">Watch creators reveal how their signature dishes are made and share your own story.</p>

                    <div className="mt-4 flex items-center gap-3">
                      {/* Conditional watch link: goes to /reels if logged in, otherwise to login */}
                      <Link
                        to={isLoggedIn() ? "/reels" : "/user/login"}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-black font-semibold"
                      >
                        Watch Now
                      </Link>
                      <button className="px-3 py-2 rounded-lg bg-white/5">Save</button>
                      <button className="px-3 py-2 rounded-lg bg-white/5">Share</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-6 left-6">
              <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 text-black font-semibold shadow-lg">Featured</div>
            </div>
          </motion.aside>
        </div>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10">
          <motion.div initial="hidden" animate="show" variants={fade} className="grid gap-6 md:grid-cols-3">
            <FeatureCard title="Creator Reels" desc="Explore authentic short food videos and connect with passionate foodies." icon={<Star />} />
            <FeatureCard title="Local Connections" desc="Discover chefs, cafés, and partners around you instantly." icon={<Truck />} />
            <FeatureCard title="Interactive Community" desc="Like, comment, and collaborate on culinary creations and stories." icon={<Heart />} />
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10">
          <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-white/6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">Join the FoodSnatch movement</h4>
              <p className="text-sm text-white/70">Sign up to share your favorite dishes, inspire others, or collaborate as a partner.</p>
            </div>
            <div className="flex gap-3">
              <Link to={role === "user" ? "/user/register" : "/food-partner/register"} className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-black font-semibold">Create account</Link>
              <Link to={role === "user" ? "/user/login" : "/food-partner/login"} className="px-4 py-3 rounded-lg bg-white/5">Sign in</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-white/60 border-t border-white/6">
        © {new Date().getFullYear()} FoodSnatch — Built with ❤️ for food lovers.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/6 backdrop-blur-md shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center text-black">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-white/70 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}
