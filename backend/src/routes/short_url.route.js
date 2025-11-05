import express from "express";
import {
  createShortUrl,
  createShortUrlwithAI,
} from "../controller/short_url.controller.js";
const router = express.Router();

router.post("/", createShortUrl);
router.post("/ai", createShortUrlwithAI);

export default router;
