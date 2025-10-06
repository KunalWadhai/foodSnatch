import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";

export default function FoodPartnerRegister() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, success: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/register`,
        { businessName, contactName, email, password, phone, address },
        { withCredentials: true }
      );

      console.log(res.data);
      setPopup({
        show: true,
        success: true,
        message: "🎉 Partner Registered Successfully!",
      });

      setTimeout(() => {
        setPopup({ show: false, success: false, message: "" });
        navigate("/food-partner/login");
      }, 2200);
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        success: false,
        message: "❌ Registration Failed. Please try again!",
      });

      setTimeout(() => {
        setPopup({ show: false, success: false, message: "" });
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-zinc-950 to-purple-950 relative overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-2xl p-10 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Top section with Icon + Tagline */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 mb-4">
            <UtensilsCrossed className="text-purple-300" size={44} />
          </div>
          <h1 className="text-4xl font-extrabold text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Join as a Food Partner
            </span>
          </h1>
          <p className="text-gray-400 text-center mt-3 max-w-md">
            Become part of <span className="text-purple-400 font-semibold">FoodSnatch</span> — 
            showcase your dishes, reach new food lovers, and grow your business digitally!
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business Name */}
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                id="businessName"
                type="text"
                placeholder="Business Name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
                required
              />
            </div>

            {/* Contact Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                id="contactName"
                type="text"
                placeholder="Contact Name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="email"
              type="email"
              placeholder="Business Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="password"
              type="password"
              placeholder="Set Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              id="phone"
              type="text"
              placeholder="Contact Number"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition"
              required
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <textarea
              id="address"
              placeholder="Complete Business Address"
              rows="3"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 outline-none transition resize-none"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition disabled:opacity-70"
          >
            {loading && <Loader2 className="animate-spin mr-2" size={20} />}
            {loading ? "Creating Account..." : "Register as Partner"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/food-partner/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl p-6 w-80 text-center shadow-xl animate-fadeIn">
            {popup.success ? (
              <CheckCircle2 className="mx-auto text-green-400 mb-3" size={40} />
            ) : (
              <XCircle className="mx-auto text-red-400 mb-3" size={40} />
            )}
            <p className="text-white text-lg font-medium">{popup.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
