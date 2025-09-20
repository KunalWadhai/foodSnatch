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
    axios.get("http://localhost:3000/api/food", {}, {withCredentials:true})
    .then((response) => {
         if (response.data.foodItem) {
          console.log(response.data);
          const fetchedVideos = response.data.foodItem.map((item, index) => ({
            id: index + 1,
            src: item.video,
            description: item.description,
            storeUrl: `/food-partner/${item.foodpartner}`,
            author: item.name,
          }));
          setVideos(fetchedVideos);
        }
    })
    .catch((err) => {
        console.log("Error While Fetching Videos", err);
    })

    // axios
    //   .get("http://localhost:3000/api/food"),{
    //     withCredentials: true
    //   }
    //   .then((res) => {
    //     if (res.data.foodItem) {
    //       console.log(res.data);
    //       const fetchedVideos = res.data.foodItem.map((item, index) => ({
    //         id: index + 1,
    //         src: item.video,
    //         description: item.description,
    //         storeUrl: `/food-partner/${item.foodpartner}`,
    //         author: item.name,
    //       }));
    //       setVideos(fetchedVideos);
    //     }
    //   })
    //  .catch((err) => console.error("Error fetching videos:", err));
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
            <video
              ref={(el) => (videoRefs.current[video.id] = el)}
              src={video.src}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
              loop
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Right-side buttons */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
              <button
                onClick={() => toggleLike(video.id)}
                className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-xl transition-transform ${
                  likes[video.id]?.liked
                    ? "bg-red-500/20 text-red-400 scale-110 shadow-lg"
                    : "bg-white/10 text-white hover:scale-105"
                }`}
              >
                ❤️
                <span className="text-xs mt-1">{likes[video.id]?.count || 0}</span>
              </button>
              <button
                onClick={() => toggleMutedFor(video.id)}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-white hover:scale-105 transition-transform"
              >
                {mutedMap[video.id] ? "🔊" : "🔇"}
              </button>
            </div>

            {/* Bottom-left description */}
            <div className="absolute left-4 bottom-12 z-20 max-w-[65%]">
              <div className="bg-black/60 rounded-xl px-4 py-3 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-black font-bold">
                    {video.author?.[0] || "F"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{video.author}</div>
                    <p className="text-sm text-gray-300 mt-1">{video.description}</p>
                  </div>
                </div>
              </div>

              <Link
                to={video.storeUrl}
                className="mt-3 inline-block px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition font-semibold text-white"
              >
                Visit Store
              </Link>
            </div>

            {/* Top-left reel counter */}
            <div className="absolute left-4 top-6 z-20 bg-white/10 px-3 py-2 rounded-xl text-sm text-gray-200">
              Reel {video.id} • {video.author}
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
