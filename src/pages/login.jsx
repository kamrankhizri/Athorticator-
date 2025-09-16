import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Eye, EyeOff } from "lucide-react";

// ---------------- Dark Background (Framer Motion blobs) ----------------
const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Blob 1 */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-3xl"
        initial={{ x: -300, y: -250 }}
        animate={{
          x: [-300, 150, -100, 250, -300],
          y: [-250, -80, 120, -60, -250],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Blob 2 */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] bg-blue-500/20 rounded-full blur-3xl"
        initial={{ x: 300, y: 250 }}
        animate={{
          x: [300, -120, 80, -200, 300],
          y: [250, 80, -140, 40, 250],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      {/* Noise overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-10 [background:radial-gradient(transparent_0,transparent_50%,rgba(255,255,255,0.05)_51%)] [background-size:3px_3px]" />
    </div>
  );
};
// ----------------------------------------------------------------------

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ role: res.data.user.role })
      );

      setErrorMessage("");
      setSuccessMessage("Login successful! 🎉");

      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 text-gray-100">
      <AnimatedBackground />

      {/* Page title */}
      <motion.h1
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute top-10 text-4xl font-bold text-purple-400 drop-shadow-lg"
      >
        Login to Your Account
      </motion.h1>

      {/* Card */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6"
      >
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
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
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Messages */}
        <AnimatePresence>
          {errorMessage && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-red-400 text-sm"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {successMessage && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-green-400 text-sm"
            >
              {successMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Login
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-400 text-center mt-4"
        >
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Login;
