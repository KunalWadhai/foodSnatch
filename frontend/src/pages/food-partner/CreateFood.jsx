import { useState } from "react";
import { Upload, Loader2, CheckCircle2, Utensils, Type, FileText } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerCreate = () => {
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["video/mp4", "video/webm", "video/quicktime"].includes(file.type)) {
      setVideo(file);
    } else {
      alert("Please upload a valid video (MP4, WebM, MOV).");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("video", video);
    formData.append("description", description);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/food`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setSuccessPopup(true);

        // Redirect after 2.5 seconds
        setTimeout(() => {
          setSuccessPopup(false);
          navigate("/");
        }, 2500);
      })
      .catch((error) => {
        console.log("Error while creating food.", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white flex flex-col relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Navbar */}
      <header className="border-b border-zinc-800 relative z-10">
        <h1 className="px-6 py-4 text-2xl font-extrabold tracking-tight">
          food<span className="text-purple-500">Snatch</span>
        </h1>
      </header>

      {/* Main Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 relative z-10">
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 transition ${loading ? "opacity-70" : ""}`}
        >
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Food 🍲
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Upload a short video, give it a name, and add a description.
          </p>

          {/* Video Upload */}
          <label
            htmlFor="video"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-600 rounded-xl cursor-pointer bg-zinc-900/50 hover:bg-zinc-800/70 transition group relative"
          >
            {video ? (
              <video
                src={URL.createObjectURL(video)}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
            ) : (
              <div className="flex flex-col items-center transition group-hover:scale-105">
                <Upload size={42} className="text-purple-400 mb-2 group-hover:animate-bounce" />
                <p className="text-sm text-gray-300">
                  Tap to upload <span className="text-gray-500">or drag & drop</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV • Up to 100MB</p>
              </div>
            )}
            <input
              id="video"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Name */}
          <div className="mt-5 relative">
            <Utensils className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Spicy Paneer Wrap"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-4 relative">
            <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition"
              rows="3"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Save Food"
            )}
          </button>
        </form>
      </main>

      {/* Success Popup */}
      {successPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 text-center border border-zinc-700 animate-bounceIn">
            <CheckCircle2 className="text-green-400 w-14 h-14 mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl font-semibold">Food added successfully 🎉</h3>
            <p className="text-sm text-gray-400 mt-1">Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPartnerCreate;
