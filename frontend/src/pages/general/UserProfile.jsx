import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Edit3, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ fullname: "", email: "", username: "" });
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/logout`,
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white px-6 py-10">
      {/* Profile Card */}
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold shadow-lg">
            {user?.fullname?.[0]?.toUpperCase() || <User size={36} />}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold">{user?.fullname}</h1>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-105 transition"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 font-semibold hover:scale-105 transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* User Activity */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-5">📊 Recent Activity</h2>
          <ul className="space-y-4">
            {["❤️ Liked 12 food reels", "🔖 Saved 5 items", "🍝 Viewed Hot Sauce Pasta"].map(
              (act, i) => (
                <li
                  key={i}
                  className="relative bg-white/5 border border-white/10 px-4 py-3 rounded-full flex justify-between items-center"
                >
                  <span className="text-gray-300 text-sm">{act}</span>
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_#d946ef]" />
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900/90 border border-white/20 rounded-2xl p-8 shadow-2xl w-[90%] max-w-lg">
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
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Username</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
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
