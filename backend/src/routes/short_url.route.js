import express from "express";
import {
  createShortUrl,
  createShortUrlwithAI,
} from "../controller/short_url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, createShortUrl);
router.post("/ai", authMiddleware, createShortUrlwithAI);

export default router;
