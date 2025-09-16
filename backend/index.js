import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// App Routes
import userRoutes from "./src/modules/users/users.routes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://kamrankhizri4749:kam123456@cluster0.3jksbr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my backend API 🚀</h1><p>Server is running on localhost:5000</p>");
});

// User routes
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`✅ Server Is Running on http://localhost:${port} 🚀`);
});
