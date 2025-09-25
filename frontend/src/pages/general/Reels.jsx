import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, MessageCircle } from "lucide-react";

export default function Reels() {
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [comments, setComments] = useState({});
  const [mutedMap, setMutedMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food`, { withCredentials: true });

        if (response.data.foodItem && response.data.foodItem.length > 0) {
          const fetchedVideos = response.data.foodItem.map((item) => ({
            id: item._id,
            src: item.video,
            description: item.description || "Delicious food item",
            storeUrl: `/food-partner/${item.foodpartner || 'unknown'}`,
            itemName: item.name,
            likeCount: item.likeCount || 0,
            savesCount: item.savesCount || 0,
            commentsCount: 0, // Backend doesn't support comments yet
          }));
          setVideos(fetchedVideos);

          // Initialize like/save state as false for all videos
          const likesState = {};
          const savedState = {};
          fetchedVideos.forEach((video) => {
            likesState[video.id] = false;
            savedState[video.id] = false;
          });
          setLikes(likesState);
          setSaved(savedState);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);



  // Autoplay / pause logic
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

  // Like Video
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

  // Save Video
  const toggleSave = async (videoId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { foodId: videoId },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.message === "Food Saved Successfully") {
        setSaved((prev) => ({ ...prev, [videoId]: true }));
      } else if (response.data.message === "Food unsaved successfully") {
        setSaved((prev) => ({ ...prev, [videoId]: false }));
      }
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  // Mute toggle
  const toggleMutedFor = (id) => {
    const el = videoRefs.current.get(id);
    if (el) {
      el.muted = !el.muted;
      setMutedMap((m) => ({ ...m, [id]: el.muted }));
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading videos...</div>
      </div>
    );
  }

  // Show error state
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
    <div
      ref={containerRef}
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
    >
      {videos.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-white text-xl">
          No videos available
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
                ref={(el) => videoRefs.current.set(video.id, el)}
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
                    likes[video.id]
                      ? "bg-pink-500/20 text-pink-400 scale-110 shadow-lg"
                      : "bg-white/10 text-white hover:scale-105"
                  }`}
                >
                  ❤️
                  <span className="text-xs">{video.likeCount}</span>
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
                  <span className="text-xs">{video.savesCount || 0}</span>
                </button>

                {/* Comments (local count) */}
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
                  <span className="text-xs">
                    {comments[video.id] || video.commentsCount}
                  </span>
                </button>

                {/* Mute */}
                <button
                  onClick={() => toggleMutedFor(video.id)}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:scale-105 transition-transform"
                >
                  {mutedMap[video.id] ? "🔊" : "🔇"}
                </button>
              </div>

              {/* Reel Info Section */}
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

              {/* Bottom nav bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex justify-around items-center text-white">
                <Link to="/" className="flex flex-col items-center text-sm">
                  <Home size={22} />
                  <span>Home</span>
                </Link>
                <Link to="/save" className="flex flex-col items-center text-sm">
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
