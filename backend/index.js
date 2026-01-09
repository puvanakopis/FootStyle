const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require('./routes/googleAuthRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json({
  strict: true,
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      throw new Error("Invalid JSON received");
    }
  }
}));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/authGoogle', googleAuthRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  res.status(400).json({
    message: "Something went wrong!",
    error: err.message
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });