import User from "./users.model.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered ❌" });
    }

    // Save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully ✅",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email ❌" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    res.json({ message: "Login successful ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
