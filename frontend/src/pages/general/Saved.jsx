
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, ArrowLeft } from "lucide-react";

export default function Saved() {
  const [savedFoods, setSavedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedFoods();
  }, []);

  const fetchSavedFoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/save`, { withCredentials: true });
      console.log(response.data);
      if (response.data && response.data.savedFoods) {
        const savedFoods = response.data.savedFoods.map((item) => ({
          id: item._id,
          food: {
            id: item.food._id,
            name: item.food.name,
            video: item.food.video,
            description: item.food.description,
            likeCount: item.food.likeCount,
            savesCount: item.food.savesCount,
            commentsCount: item.food.commentsCount || 0,
            foodpartner: item.food.foodpartner
          },
          createdAt: item.createdAt
        }));
        setSavedFoods(savedFoods);
      } else {
        setSavedFoods([]);
      }
    } catch (error) {
      console.error("Error fetching saved foods:", error);
      setSavedFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (foodId) => {
    console.log(foodId);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/save`, { foodId: foodId }, { withCredentials: true });
      // Refresh the saved foods list after successful unsave
      fetchSavedFoods();
    } catch (error) {
      console.error("Error unsaving food:", error);
      // Optionally show user feedback here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading saved foods...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/reels" className="flex items-center gap-2 text-white hover:text-gray-300">
            <ArrowLeft size={24} />
            <span>Back to Reels</span>
          </Link>
          <h1 className="text-xl font-bold">Saved Foods</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {savedFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Bookmark size={64} className="text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No saved foods yet</h2>
            <p className="text-gray-400 mb-6">Start saving your favorite food reels to see them here!</p>
            <Link
              to="/reels"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-xl transition font-semibold"
            >
              Browse Reels
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedFoods.map((savedFood) => (
              <div
                key={savedFood.id}
                className="bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-colors"
              >
                <div className="relative">
                  <video
                    src={savedFood.food.video}
                    className="w-full h-48 object-cover"
                    muted
                    autoPlay
                    loop
                    preload="metadata"
                    onError={(e) => {
                      console.error('Video failed to load:', savedFood.food.video);
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    onClick={() => handleUnsave(savedFood.food.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Bookmark size={16} className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{savedFood.food.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {savedFood.food.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Saved {new Date(savedFood.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/food-partner/${savedFood.food.foodpartner}`}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      Visit Store
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex justify-around items-center text-white">
        <Link to="/" className="flex flex-col items-center text-sm">
          <Home size={22} />
          <span>Home</span>
        </Link>
        <Link to="/reels" className="flex flex-col items-center text-sm">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            📱
          </div>
          <span>Reels</span>
        </Link>
      </div>
    </div>
  );
}

