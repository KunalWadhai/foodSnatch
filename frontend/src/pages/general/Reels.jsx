import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, BookmarkCheck, User } from "lucide-react";

export default function Reels() {
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  //const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hearts, setHearts] = useState([]); // heart animation list

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/food`,
          { withCredentials: true }
        );

        if (response.data.foodItem?.length > 0) {
          const fetchedVideos = response.data.foodItem.map((item) => ({
            id: item._id,
            src: item.video,
            description: item.description || "Delicious food item",
            storeUrl: `/food-partner/${item.foodpartner || "unknown"}`,
            itemName: item.name,
            likeCount: item.likeCount || 0,
            savesCount: item.savesCount || 0,
           // commentsCount: 0,
          }));
          setVideos(fetchedVideos);

          // init states
          const likesState = {};
          const savedState = {};
          fetchedVideos.forEach((video) => {
            likesState[video.id] = false;
            savedState[video.id] = false;
          });
          setLikes(likesState);
          setSaved(savedState);

          // Fetch saved foods to set initial saved state
          try {
            const savedResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
              { withCredentials: true }
            );
            const savedIds = savedResponse.data.savedFoods.map(s => s.food._id);
            setSaved(prev => {
              const newSaved = {...prev};
              savedIds.forEach(id => newSaved[id] = true);
              return newSaved;
            });
          } catch {
            // User not logged in or error, ignore
          }
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Intersection observer: autoplay/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    const nodes = containerRef.current?.querySelectorAll(".reel-item") || [];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [videos]);

  // Like Video with animation
  const likeVideo = async (videoId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/like`,
        { foodId: videoId },
        { withCredentials: true }
      );

      if (response.data.message === "Like Added Successfully") {
        setLikes((prev) => ({ ...prev, [videoId]: true }));
        setVideos((prev) =>
          prev.map((v) =>
            v.id === videoId ? { ...v, likeCount: v.likeCount + 1 } : v
          )
        );
        triggerHeart(videoId);
      } else if (response.data.message === "Food Unliked Successfully") {
        setLikes((prev) => ({ ...prev, [videoId]: false }));
        setVideos((prev) =>
          prev.map((v) =>
            v.id === videoId ? { ...v, likeCount: v.likeCount - 1 } : v
          )
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Save Video toggle
  const toggleSave = async (videoId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { foodId: videoId },
        { withCredentials: true }
      );

      if (response.data.message === "Food Saved Successfully") {
        setSaved((prev) => ({ ...prev, [videoId]: true }));
        setVideos((prev) =>
          prev.map((v) =>
            v.id === videoId ? { ...v, savesCount: v.savesCount + 1 } : v
          )
        );
      } else if (response.data.message === "Food unsaved successfully") {
        setSaved((prev) => ({ ...prev, [videoId]: false }));
        setVideos((prev) =>
          prev.map((v) =>
            v.id === videoId ? { ...v, savesCount: v.savesCount - 1 } : v
          )
        );
      }
    } catch (error) {
      console.error("Error saving video:", error);
      console.error("Error response data:", error.response?.data);
      if (error.response?.status === 401) {
        alert("Please log in to save this food item.");
      } else {
        alert("Failed to save. Please try again.");
      }
    }
  };

  // Heart animation trigger
  const triggerHeart = (videoId) => {
    const newHeart = { id: Date.now(), videoId };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl text-center">
          <div className="mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="h-screen w-full bg-black flex items-center justify-center">
    {/* Wrapper mimicking mobile frame */}
    <div
      ref={containerRef}
      className="h-full w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[9/16] bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth relative rounded-xl shadow-xl"
    >
      {videos.length === 0 ? (
        <div className="h-full flex items-center justify-center text-white text-xl">
          No videos available
        </div>
      ) : (
        videos.map((video) => (
          <div
            key={video.id}
            className="reel-item relative h-full w-full flex items-center justify-center snap-center"
          >
            {/* Video inside fixed aspect ratio */}
            <video
              ref={(el) => videoRefs.current.set(video.id, el)}
              src={video.src}
              className="w-full h-full object-cover rounded-xl"
              playsInline
              autoPlay
              loop
              preload="metadata"
            />

            {/* Floating hearts */}
            {hearts
              .filter((h) => h.videoId === video.id)
              .map((heart) => (
                <div
                  key={heart.id}
                  className="absolute inset-0 flex items-center justify-center animate-bounce"
                >
                  <span className="text-6xl text-pink-500 drop-shadow-lg">
                    ❤️
                  </span>
                </div>
              ))}

            {/* Right side actions */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 text-white">
              {/* Like */}
              <button
                onClick={() => likeVideo(video.id)}
                className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-transform ${
                  likes[video.id]
                    ? "bg-pink-600 text-white scale-110 shadow-lg"
                    : "bg-black/40 border border-white/30 text-white hover:scale-105"
                }`}
              >
                ❤️
                <span className="text-xs">{video.likeCount}</span>
              </button>

              {/* Save */}
              <button
                onClick={() => toggleSave(video.id)}
                className={`w-12 h-12 rounded-full flex flex-col items-center hover:cursor-pointer justify-center transition-transform ${
                  saved[video.id]
                    ? "bg-yellow-400 text-black scale-110 shadow-lg hover:bg-yellow-500 hover:scale-125"
                    : "bg-black/40 border border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105"
                }`}
              >
                {saved[video.id] ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
                <span className="text-xs">{video.savesCount || 0}</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-20 left-4 right-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
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

            {/* Bottom nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-around items-center text-white rounded-b-xl">
              <Link to="/" className="flex flex-col items-center text-sm">
                <Home size={22} />
                <span>Home</span>
              </Link>
              <Link to="/save" className="flex flex-col items-center text-sm">
                <Bookmark size={22} />
                <span>Saved</span>
              </Link>
              <Link to="/user-profile" className="flex flex-col items-center text-sm">
                <User size={22} />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}
