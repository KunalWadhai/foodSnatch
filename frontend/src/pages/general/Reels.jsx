import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, MessageCircle, TruckElectric } from "lucide-react";


export default function Reels() {
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const [mutedMap, setMutedMap] = useState({});
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [comments, setComments] = useState({});
  const [videos, setVideos] = useState([]);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", { withCredentials: true });
        if (response.data.foodItem) {
          const fetchedVideos = response.data.foodItem.map((item) => ({
            id: item._id,
            src: item.video,
            description: item.description,
            storeUrl: `/food-partner/${item.foodpartner}`,
            itemName: item.name,
            likeCount: item.likeCount || 0,
          }));
          setVideos(fetchedVideos);

          // Fetch like and save status for all videos
          const foodIds = fetchedVideos.map(v => v.id);
          await fetchLikeAndSaveStatus(foodIds);
        }
      } catch (err) {
        console.log("Error While Fetching Videos", err);
      }
    };

    fetchVideos();
  }, []);

  //Fetch like and save status for videos
  const fetchLikeAndSaveStatus = async (foodIds) => {
    try {
      // Fetch like status
      const likeResponse = await axios.post("http://localhost:3000/api/food/like-status", { foodIds });
      const likedFoodIds = likeResponse.data.likedFoodIds || [];

      // Fetch saved foods
      const savedResponse = await axios.get("http://localhost:3000/api/food/saved");
      const savedFoods = savedResponse.data.savedFoods || [];
      const savedFoodIds = savedFoods.map(sf => sf.food._id);

      // Update state
      const likesState = {};
      const savedState = {};

      foodIds.forEach(id => {
        likesState[id] = { liked: likedFoodIds.includes(id), count: 0 };
        savedState[id] = savedFoodIds.includes(id);
      });

      setLikes(likesState);
      setSaved(savedState);
    } catch (error) {
      console.log("Error fetching like/save status:", error);
      // Set default states if API calls fail
      const likesState = {};
      const savedState = {};
      foodIds.forEach(id => {
        likesState[id] = { liked: false, count: 0 };
        savedState[id] = false;
      });
      setLikes(likesState);
      setSaved(savedState);
    }
  };

  // Autoplay / pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoEl = entry.target.querySelector("video");
          if (!videoEl) return;
          if (entry.isIntersecting) videoEl.play().catch(() => {});
          else videoEl.pause();
        });
      },
      { root: null, threshold: 0.6 }
    );

    const nodes = containerRef.current?.querySelectorAll(".reel-item") || [];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [videos]);

  
  // Like Video
  const likeVideo = async (videoId) => {
      try {
          const response = await axios.post("http://localhost:3000/api/food/like", {foodId: videoId}, {withCredentials: true});

          if(response.data.message === "Like Added Successfully" || response.data.message === "Like Added Successfully (Guest)"){
              setVideos( (prev) => prev.map((v) => v.id == videoId ? {...v, likeCount: v.likeCount + 1 } : v ));
          } else if(response.data.message === "Food Unliked Successfully"){
              setVideos( (prev) => prev.map( (v) => v.id == videoId ? {...v, likeCount: v.likeCount - 1} : v));
          }
      } catch (error) {
          console.error("Error liking video:", error);
          alert("Error liking video. Please try again.");
      }
  }

  // Save logic
  const toggleSave = async (videoId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/food/save", {foodId: videoId}, {withCredentials: true});

      if(response.data.message === "Food Saved Successfully"){
        setSaved((prev) => ({
          ...prev,
          [videoId]: true,
        }));
      } else if(response.data.message === "Saved Food Deleted Successfully."){
        setSaved((prev) => ({
          ...prev,
          [videoId]: false,
        }));
      }
    } catch (error) {
      console.error("Error saving video:", error);
      if (error.response && error.response.status === 401) {
        alert("Please log in to save videos.");
      } else {
        alert("Error saving video. Please try again.");
      }
    }
  };

  // Mute toggle
  const toggleMutedFor = (id) => {
    const el = videoRefs.current[id];
    if (el) {
      el.muted = !el.muted;
      setMutedMap((m) => ({ ...m, [id]: el.muted }));
    } else {
      setMutedMap((m) => ({ ...m, [id]: !m[id] }));
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
    >
      {videos.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-white text-xl">
          Loading videos...
        </div>
      ) : (
        videos.map((video) => (
          <div
            key={video.id}
            className="reel-item relative h-screen w-full flex items-center justify-center snap-center"
          >
            {/* Reel container */}
            <div className="relative w-[350px] md:w-[400px] lg:w-[450px] h-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.src}
                className="w-full h-full object-cover"
                playsInline
                muted
                loop
                preload="metadata"
              />



              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Right-side vertical action buttons */}
              <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 text-white">

                {/* Like */}
                <button
                  onClick={() => likeVideo(video.id)}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xl transition-transform ${
                    likes[video.id]?.liked
                      ? "bg-pink-500/20 text-pink-400 scale-110 shadow-lg"
                      : "bg-white/10 text-white hover:scale-105"
                  }`}
                >
                  ❤️
                  <span className="text-xs">{video.likeCount || 0}</span>
                </button>

                {/* Save */}
                <button
                  onClick={() => toggleSave(video.id)}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xl transition-transform ${
                    saved[video.id]
                      ? "bg-white text-black scale-110 shadow-lg"
                      : "bg-transparent border border-white/40 text-white hover:bg-white/20"
                  }`}
                >
                  <Bookmark size={22} />
                  <span className="text-xs">{saved[video.id] ? 1 : 0}</span>
                </button>

                {/* Comments */}
                <button
                  onClick={() =>
                    setComments((c) => ({
                      ...c,
                      [video.id]: (c[video.id] || 0) + 1,
                    }))
                  }
                  className="w-12 h-12 rounded-full flex flex-col items-center justify-center text-xl bg-white/10 text-white hover:scale-105 transition-transform"
                >
                  <MessageCircle size={22} />
                  <span className="text-xs">{comments[video.id] || 0}</span>
                </button>

                {/* Mute */}
                <button
                  onClick={() => toggleMutedFor(video.id)}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:scale-105 transition-transform"
                >
                  {mutedMap[video.id] ? "🔊" : "🔇"}
                </button>
              </div>

              {/* Reel Info Section above bar */}
              <div className="absolute bottom-20 left-0 right-0 px-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-black font-bold">
                    {video.itemName?.[0] || "F"}
                  </div>
                  <span className="font-semibold">{video.itemName}</span>
                </div>
                <p className="text-sm text-gray-200 mb-2">{video.description}</p>
                <Link
                  to={video.storeUrl}
                  className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl transition font-semibold text-sm"
                >
                  Visit Store
                </Link>
              </div>

              {/* Bottom reel bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex justify-around items-center text-white">
                <Link to="/" className="flex flex-col items-center text-sm">
                  <Home size={22} />
                  <span>Home</span>
                </Link>
                <Link to="/saved" className="flex flex-col items-center text-sm">
                  <Bookmark size={22} />
                  <span>Saved</span>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
