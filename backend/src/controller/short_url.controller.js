import { getShortUrl } from "../dao/short_url.js";
import shortUrl from "../models/short_url.model.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
  generateSlugWithGemini,
} from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, customUrl);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const createShortUrlwithAI = wrapAsync(async (req, res) => {
  const { url } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const aiSlugs = await generateSlugWithGemini(url, req.user._id);
    if (aiSlugs.length === 0)
      return res.status(500).json({ error: "Failed to generate slugs" });

    res.status(200).json({
      message: "AI slugs generated successfully",
      shortUrl: process.env.APP_URL + aiSlugs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini slug generation failed" });
  }
});
