import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Reels() {
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const [mutedMap, setMutedMap] = useState({});
  const [likes, setLikes] = useState({});
  const [videos, setVideos] = useState([]);

  // Fetch videos from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        if (response.data.foodItem) {
          const fetchedVideos = response.data.foodItem.map((item, index) => ({
            id: index + 1,
            src: item.video,
            description: item.description,
            storeUrl: `/food-partner/${item.foodpartner}`,   // this contains the food-partner id 
            itemName: item.name,
          }));
          setVideos(fetchedVideos);
        }
      })
      .catch((err) => {
        console.log("Error While Fetching Videos", err);
      });
  }, []);

  // Auto-play / pause logic
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

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id]
        ? { count: prev[id].count + (prev[id].liked ? -1 : 1), liked: !prev[id].liked }
        : { count: 1, liked: true },
    }));
  };

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
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth"
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
            {/* Video container (centered like YouTube Shorts) */}
            <div className="relative w-[350px] md:w-[400px] lg:w-[450px] h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.src}
                className="w-full h-full object-cover"
                playsInline
                muted
                loop
                preload="metadata"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Bottom content (description, store, actions) */}
              <div className="absolute bottom-4 left-0 right-0 px-4 text-white flex justify-between items-end">
                {/* Left: Description + Store */}
                <div className="max-w-[70%]">
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

                {/* Right: Action buttons */}
                <div className="flex flex-col items-center gap-5">
                  <button
                    onClick={() => toggleLike(video.id)}
                    className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xl transition-transform ${
                      likes[video.id]?.liked
                        ? "bg-red-500/20 text-red-400 scale-110 shadow-lg"
                        : "bg-white/10 text-white hover:scale-105"
                    }`}
                  >
                    ❤️
                    <span className="text-xs">{likes[video.id]?.count || 0}</span>
                  </button>
                  <button
                    onClick={() => toggleMutedFor(video.id)}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:scale-105 transition-transform"
                  >
                    {mutedMap[video.id] ? "🔊" : "🔇"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="absolute left-4 bottom-4 z-30 text-xs text-gray-400">
        Tap video to toggle mute. Scroll/swipe to change reels.
      </div>
    </div>
  );
}
