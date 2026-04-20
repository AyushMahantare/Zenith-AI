import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-article", auth, generateArticle);

export default router;