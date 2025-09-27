import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Edit3, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/"); // if not logged in, redirect
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-10">
      {/* Profile Card */}
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg">
            {user?.name?.[0]?.toUpperCase() || <User size={32} />}
          </div>
          <h1 className="mt-4 text-2xl font-extrabold">{user?.name}</h1>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:scale-105 transition">
            <Edit3 size={18} /> Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 font-semibold hover:scale-105 transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* User Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">📊 Recent Activity</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>❤️ Liked 12 food reels</li>
            <li>🔖 Saved 5 items</li>
            <li>🍝 Viewed Hot Sauce Pasta</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
