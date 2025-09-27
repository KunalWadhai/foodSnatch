import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, MapPin, Phone, ArrowLeft } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function FoodPartnerProfile() {
  const { profile } = useParams(); 
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/food-partner/${profile}`, { withCredentials: true })
      .then((res) => {
        setPartner(res.data.foodPartner);
        setVideos(res.data.foodPartner.videos || []);
      })
      .catch((err) => console.log("Error fetching partner profile:", err));
  }, [profile]);

  if (!partner) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-3" />
        <p className="text-lg text-gray-400">Loading Food Partner Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-10">
      {/* Partner Info */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {partner.businessName}
          </h1>
          <div className="mt-3 space-y-1 text-gray-300">
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-purple-400" /> {partner.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-purple-400" /> {partner.phone}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 p-6 rounded-2xl text-center shadow-lg hover:shadow-purple-500/30 transition hover:-translate-y-1">
              <p className="text-3xl font-bold">{partner.totalMeals}</p>
              <p className="text-sm text-gray-400">Total Meals</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/20 p-6 rounded-2xl text-center shadow-lg hover:shadow-cyan-500/30 transition hover:-translate-y-1">
              <p className="text-3xl font-bold">{partner.servedCount}</p>
              <p className="text-sm text-gray-400">Meals Served</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/20 p-6 rounded-2xl text-center shadow-lg hover:shadow-emerald-500/30 transition hover:-translate-y-1">
              <p className="text-3xl font-bold">{videos.length}</p>
              <p className="text-sm text-gray-400">Videos</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/reels")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition text-white"
            >
              <ArrowLeft size={18} /> Back to Foods
            </button>
          </div>
        </div>

        {/* Partner Videos */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">🍴 Food Videos</h2>
          {videos.length === 0 ? (
            <p className="text-gray-500 text-sm">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/70 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 hover:scale-[1.02] hover:shadow-purple-500/20 transition"
                >
                  <div className="relative group">
                    <video
                      src={vid.video}
                      controls
                      className="w-full h-[250px] object-cover group-hover:opacity-90 transition"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold truncate">{vid.title}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {vid.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
