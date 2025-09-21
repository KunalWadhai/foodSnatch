import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerProfile() {
  const { id } = useParams(); // FoodPartner ID from URL
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);

  // Fetch partner details + videos
  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((res) => {
        setPartner(res.data.foodPartner);
        setVideos(res.data.foodPartner.videos || []);
      })
      .catch((err) => console.log("Error fetching partner profile:", err));
  }, [id]);  // [id] -> dependancy array is id

  if (!partner) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Loading Partner Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      {/* Partner Info */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">{partner.businessName}</h1>
        <p className="text-gray-300 mt-2">{partner.address}</p>
        <p className="text-gray-300">📞 {partner.phone}</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-2xl font-bold">{partner.totalMeals}</p>
            <p className="text-sm text-gray-400">Total Meals</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-2xl font-bold">{partner.servedCount}</p>
            <p className="text-sm text-gray-400">Meals Served</p>
          </div>
        </div>
      </div>

      {/* Partner Videos */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Food Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-md"
              >
                <video
                  src={video.src}
                  controls
                  className="w-full h-60 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-gray-400">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
