import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { getApiUrl, axiosConfig } from "../../config/config";

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
        getApiUrl("/api/auth/food-partner/register"),
        { businessName, contactName, email, password, phone, address },
        axiosConfig
      );

      console.log(res.data);

      setPopup({
        show: true,
        success: true,
        message: "Food Partner Created Successfully 🎉",
      });

      setTimeout(() => {
        setPopup({ show: false, success: false, message: "" });
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        success: false,
        message: "Registration Failed. Please try again!",
      });

      setTimeout(() => {
        setPopup({ show: false, success: false, message: "" });
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-4">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-extrabold text-center text-purple-500 mb-6">
          Partner Signup
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="businessName"
            type="text"
            placeholder="Business Name"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            id="contactName"
            type="text"
            placeholder="Contact Name"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            id="phone"
            type="text"
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <textarea
            id="address"
            placeholder="Address"
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        
        {/*
        <button className="w-full mt-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white font-medium">
          Sign up with Google
        </button>
        */
        } 

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already a partner?{" "}
          <Link to="/food-partner/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-80 text-center shadow-xl">
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
