import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitles,
  generateImage,
  removeBackground,
  removeObject,
  reviewResume,
} from "../controllers/aiController.js";
const router = express.Router();

import { toggleLike } from "../controllers/aiController.js";

router.post("/like/:id", auth, toggleLike);

import { getCommunityPosts } from "../controllers/aiController.js";

router.get("/community", auth, getCommunityPosts);


// 🔥 IMPORTANT
router.post("/generate-article", auth, generateArticle);
router.post("/blog-titles", auth, generateBlogTitles);
router.post("/generate-image", auth, generateImage);
router.post("/remove-background", auth, removeBackground);
router.post("/remove-object", auth, removeObject);
router.post("/review-resume", auth, reviewResume);


// ✅ test route
router.get("/test", (req, res) => {
  res.send("AI ROUTE WORKING ✅");
});

export default router;
