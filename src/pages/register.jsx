import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/register", data);
      console.log("Registration successful:", res.data);

      // 🎉 Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      alert("Account created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 px-6 py-12">
      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.15),transparent),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent)] animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-purple-400 mb-4 text-center drop-shadow-lg">
          Create an Account
        </h1>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/90 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Register
          </motion.button>
        </motion.form>

        <p className="mt-6 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <a href="/" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
