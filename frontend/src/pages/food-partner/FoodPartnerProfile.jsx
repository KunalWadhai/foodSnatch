import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerProfile() {
  const { profile } = useParams(); 
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${profile}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.foodPartner);
        setPartner(res.data.foodPartner);
        setVideos(res.data.foodPartner.videos || []);
      })
      .catch((err) => console.log("Error fetching partner profile:", err));
  }, [profile]);

  if (!partner) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Loading Food Partner Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-4 py-8">
      {/* Partner Info */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">{partner.businessName}</h1>
        <p className="text-gray-400 mt-1">{partner.address}</p>
        <p className="text-gray-400">📞 {partner.phone}</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:scale-105 transition">
            <p className="text-2xl font-bold">{partner.totalMeals}</p>
            <p className="text-xs text-gray-400">Total Meals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:scale-105 transition">
            <p className="text-2xl font-bold">{partner.servedCount}</p>
            <p className="text-xs text-gray-400">Meals Served</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:scale-105 transition">
            <p className="text-2xl font-bold">{videos.length}</p>
            <p className="text-xs text-gray-400">Videos</p>
          </div>
        </div>
      </div>

      {/* Partner Videos */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Food Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-500 text-sm">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {videos.map((vid) => (
              <div
                key={vid.profile}
                className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition"
              >
                <video
                  src={vid.video}
                  controls
                  className="w-full h-[400px] object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1">{vid.title}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{vid.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
