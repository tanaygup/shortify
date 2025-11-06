import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
import { redis } from "./src/config/redis.config.js";

const app = express();

app.use(
  cors({
    origin: "https://shortify-coral.vercel.app", // your React app
    credentials: true, // 👈 this allows cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, async () => {
  connectDB();
  console.log("🚀 Server running on http://localhost:3000");

  try {
    // Initialize Bloom filter once
    await redis.sendCommand(["BF.RESERVE", "custom_urls", "0.01", "100000"]);
    console.log("✅ Bloom filter 'custom_urls' created");
  } catch (error) {
    if (error.message.includes("exists")) {
      console.log("ℹ️ Bloom filter already exists");
    } else {
      console.error("❌ Error initializing Bloom filter:", error.message);
    }
  }
});

// GET - Redirection
