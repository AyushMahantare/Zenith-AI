import OpenAI from "openai";
import pool from "../confgs/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { prompt, length } = req.body;

    if (!prompt || !length) {
      return res.json({
        success: false,
        message: "Missing prompt or length"
      });
    }

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Limit check
    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to Continue."
      });
    }

    // AI call
    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: length
    });

    const content = response.choices[0].message.content;

    // ✅ CORRECT DB INSERT (pg)
    const query = `
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [userId, prompt, content, "article"];

    const result = await pool.query(query, values);

    console.log("Inserted:", result.rows[0]);

    // Update usage
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({
      success: true,
      content
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};