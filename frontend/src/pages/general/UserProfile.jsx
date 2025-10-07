import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Edit3, User, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ fullname: "", email: "", username: "" });
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
        setEditData({
          fullname: res.data.user.fullname,
          email: res.data.user.email,
          username: res.data.user.username || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Save updated user data
  const handleEditSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/update`,
        editData,
        { withCredentials: true }
      );
      setUser({ ...user, ...editData });
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Navigate back to reels
  const goToReels = () => {
    navigate("/reels");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-xl animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white px-6 py-12 overflow-hidden">
      {/* Glowing Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Floating Back Button */}
      <button
        onClick={goToReels}
        className="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:scale-110 active:scale-95 transition z-50"
      >
        <ArrowLeft size={18} /> Back to Food Reels
      </button>

      {/* Profile Card */}
      <div className="relative max-w-xl mx-auto mt-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:shadow-[0_0_80px_rgba(236,72,153,0.4)] transition-all duration-500">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-lg ring-4 ring-white/10">
            {user?.fullname?.[0]?.toUpperCase() || <User size={40} />}
          </div>
          <h1 className="mt-5 text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {user?.fullname}
          </h1>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <p className="text-gray-500 text-sm mt-1">@{user?.username || "foodlover"}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-5">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* User Activity */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            📊 Recent Activity
          </h2>
          <ul className="space-y-4">
            {["❤️ Liked 12 food reels", "🔖 Saved 5 items", "🍝 Viewed Hot Sauce Pasta"].map(
              (act, i) => (
                <li
                  key={i}
                  className="relative bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex justify-between items-center hover:bg-white/10 transition"
                >
                  <span className="text-gray-300 text-sm">{act}</span>
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_#d946ef]" />
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-zinc-900/90 border border-white/20 rounded-2xl p-8 shadow-2xl w-[90%] max-w-lg scale-100 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setEditing(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400">Full Name</label>
                <input
                  type="text"
                  value={editData.fullname}
                  onChange={(e) => setEditData({ ...editData, fullname: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Username</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none transition"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
