import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerRegister() {
  // use hook to navigate 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bussinessName = e.target.bussinessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    console.log(bussinessName + " " + contactName + " "  + address) 
    try {
    const res = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
        bussinessName,
        contactName,
        email,
        password,
        phone,
        address
      }, {
        withCredentials: true
      });
      console.log(res.data);
      navigate("/create-food");
    }catch(error){
       alert("Food Partner Registration Failed", error);
    }
      // .then( res => {
      //     console.log(res.data);
      //     navigate("/create-food")
      // })
      // .catch(error => {
      //   alert("Food Partner Registration Failed", error);  
      // });

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-transparent border border-zinc-900 shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
          Partner Signup
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input id="bussinessName" type="text" placeholder="Business Name" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="contactName" type="text" placeholder="Contact Name" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="password" type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <input id="phone" type="text" placeholder="Phone" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"/>
          <textarea id="address" placeholder="Address" rows="3" className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
          
          <button type="submit" className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition">
            Register
          </button>
        </form>

        <button className="w-full mt-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white">
          Sign up with Google
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already a partner?{" "}
          <Link to="/food-partner/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
