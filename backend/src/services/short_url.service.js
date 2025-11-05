import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { redis } from "../config/redis.config.js";
import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI({
  apiKey: "AIzaSyAb6QqZ8x4UTTMEN5rsO6Be2HnMXtygV14",
});

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL not generated");

  const mightExist = await redis.command([
    "BF.EXISTS",
    "custom_urls",
    shortUrl,
  ]);

  if (mightExist === 1) {
    // Possible collision → confirm in DB
    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");
  }

  // 3️⃣ Add to Bloom Filter
  await redis.command(["BF.ADD", "custom_urls", shortUrl]);
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);
  const mightExist = await redis.command([
    "BF.EXISTS",
    "custom_urls",
    shortUrl,
  ]);

  if (mightExist === 1) {
    // Possible collision → confirm in DB
    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");
  }

  // 2️⃣ Save to DB
  await saveShortUrl(shortUrl, url, userId);

  // 3️⃣ Add to Bloom Filter
  await redis.command(["BF.ADD", "custom_urls", shortUrl]);

  return shortUrl;
};

export const generateSlugWithGemini = async (url, userId) => {
  const prompt = `
    You are an SEO and branding assistant.

Given a webpage URL: ${url}
1. Read or infer the content of the page.
2. Generate 4 short, creative, SEO-friendly slugs.
3. Each slug must:
   - Use 4 to 6 words.
   - Be lowercase.
   - Use hyphens between words.
   - Contain no special characters or numbers.
   - Represent the topic of the page.
4. Return ONLY a JSON array of strings (no explanations, no extra text).

Example output:
["ai-tools-trends", "best-ai-products", "machine-learning-insights", "tech-innovations"]

  `;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  // Clean + parse
  const clean = text.replace(/```json|```/g, "").trim();
  let slugs = [];

  try {
    slugs = JSON.parse(clean);
  } catch (e) {
    console.error("❌ Error parsing Gemini response:", text);
    return [];
  }

  // Remove spaces, lowercase, sanitize
  slugs = slugs.map((s) =>
    s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
  );

  // Filter duplicates
  const unique = [...new Set(slugs)];

  // Check availability with Bloom filter and DB
  let available;
  for (const slug of unique) {
    const existsInRedis = await redis.sendCommand([
      "BF.EXISTS",
      "custom_urls",
      slug,
    ]);
    if (existsInRedis === 1) {
      const inDb = await getCustomShortUrl(slug);
      if (inDb) continue; // skip if truly exists
    } else {
      available = slug;
      await saveShortUrl(available, url, userId);

      // 3️⃣ Add to Bloom Filter
      await redis.command(["BF.ADD", "custom_urls", available]);
      break;
    }
  }

  // Return available slugs (max 4)
  return available;
};
