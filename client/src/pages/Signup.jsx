import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", formData);

      alert("Signup successful");

      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button className=" w-full bg-black text-white py-3 rounded flex items-center justify-center gap-2 group cursor-pointer">
          Signup
        </button>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;