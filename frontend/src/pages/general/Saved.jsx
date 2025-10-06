import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Saved() {
  const [savedFoods, setSavedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedFoods();
  }, []);

  const fetchSavedFoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { withCredentials: true }
      );
      if (response.data && response.data.savedFoods) {
        const saved = response.data.savedFoods.map((item) => ({
          food: {
            id: item.food._id,
            name: item.food.name,
            video: item.food.video,
            description: item.food.description,
            likeCount: item.food.likeCount,
            savesCount: item.food.savesCount,
            commentsCount: item.food.commentsCount || 0,
            foodpartner: item.food.foodpartner,
          },
          createdAt: item.createdAt,
        }));
        setSavedFoods(saved);
      } else setSavedFoods([]);
    } catch (error) {
      console.error("Error fetching saved foods:", error);
      setSavedFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (foodId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { foodId },
        { withCredentials: true }
      );
      fetchSavedFoods();
    } catch (error) {
      console.error("Error unsaving food:", error);
    }
  };

  // Shimmer skeleton for loading state
  const Loader = () => (
    <div className="min-h-screen bg-black flex flex-wrap items-center justify-center gap-6 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-72 h-64 bg-white/5 rounded-2xl animate-pulse bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 bg-black/70 backdrop-blur-lg border-b border-white/10 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <Link
            to="/reels"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition"
          >
            <ArrowLeft size={22} />
            <span>Back to Reels</span>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Saved Foods
          </h1>
          <div className="w-12" />
        </div>
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <Loader />
      ) : (
        <main className="p-6 pb-24">
          <AnimatePresence>
            {savedFoods.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[70vh] text-center"
              >
                <Bookmark size={80} className="text-gray-500 mb-4" />
                <h2 className="text-3xl font-extrabold mb-2">No saved foods yet</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Save your favorite food reels to see them here!
                </p>
                <Link
                  to="/reels"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition"
                >
                  Browse Reels
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {savedFoods.map((saved, i) => (
                  <motion.div
                    key={saved.food.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(236,72,153,0.3)",
                    }}
                    className="bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 shadow-lg hover:shadow-pink-500/10 transition-all"
                  >
                    <div className="relative">
                      <video
                        src={saved.food.video}
                        className="w-full h-56 object-cover rounded-t-2xl"
                        muted
                        loop
                        autoPlay
                      />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUnsave(saved.food.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                      >
                        <Bookmark
                          size={18}
                          className="text-pink-400 fill-pink-500"
                        />
                      </motion.button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 text-white">
                        {saved.food.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {saved.food.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>
                          Saved on{" "}
                          {new Date(saved.createdAt).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/food-partner/${saved.food.foodpartner}`}
                          className="text-pink-400 hover:text-pink-300 font-medium"
                        >
                          Visit Store
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center py-4 text-gray-300"
      >
        <Link to="/" className="flex flex-col items-center text-sm hover:text-white transition">
          <Home size={22} />
          <span>Home</span>
        </Link>
        <Link
          to="/reels"
          className="flex flex-col items-center text-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)] group-hover:scale-110 transition">
            📱
          </div>
          <span className="mt-1 group-hover:text-white transition">Reels</span>
        </Link>
      </motion.nav>
    </div>
  );
}
