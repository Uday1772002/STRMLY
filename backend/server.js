require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./src/config/database");
const rateLimit = require("./src/middleware/rateLimiter");
const authRoutes = require("./src/routes/auth");
const videoRoutes = require("./src/routes/videos");
const app = express();


connectDB();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(rateLimit);

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
