import { useState } from "react";
import { Upload, Loader2, CheckCircle2 } from "lucide-react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config/config";

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

    axios.post(`${backendUrl}/api/food`, formData, { withCredentials: true })
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
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white flex flex-col relative">
      {/* Navbar */}
      <header className="border-b border-zinc-800">
        <h1 className="px-6 py-4 text-2xl font-extrabold tracking-tight">
          food<span className="text-purple-500">Snatch</span>
        </h1>
      </header>

      {/* Main Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md bg-zinc-900/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-zinc-800 ${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <h2 className="text-xl font-semibold mb-1">Create Food</h2>
          <p className="text-gray-400 text-sm mb-6">
            Upload a short video, give it a name, and add a description.
          </p>

          {/* Video Upload */}
          <label
            htmlFor="video"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer bg-zinc-950/50 hover:bg-zinc-900 transition"
          >
            {video ? (
              <video
                src={URL.createObjectURL(video)}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={36} className="text-purple-400 mb-2" />
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
          <div className="mt-5">
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Spicy Paneer Wrap"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows="3"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Food"}
          </button>
        </form>
      </main>

      {/* Success Popup */}
      {successPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-xl shadow-xl p-6 text-center border border-zinc-700">
            <CheckCircle2 className="text-green-400 w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Food added successfully 🎉</h3>
            <p className="text-sm text-gray-400 mt-1">Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPartnerCreate;
