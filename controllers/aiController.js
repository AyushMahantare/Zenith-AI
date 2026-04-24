import pool from "../confgs/db.js";
import { clerkClient } from "@clerk/express";

// ================= SMART MOCK GENERATOR =================
const generateSmartMock = (topic, length) => {
  const intros = [
    `${topic} is rapidly gaining attention in today's world.`,
    `In recent years, ${topic} has become an important subject.`,
    `${topic} plays a significant role in modern society.`,
  ];

  const bodies = [
    `${topic} offers multiple advantages including improved efficiency and better decision-making.`,
    `One of the key aspects of ${topic} is its ability to solve real-world problems effectively.`,
    `${topic} is widely used across industries due to its flexibility and scalability.`,
    `Experts believe ${topic} will shape the future significantly.`,
    `${topic} continues to evolve with new innovations and applications.`,
  ];

  const conclusions = [
    `In conclusion, ${topic} is a valuable area to explore.`,
    `Overall, understanding ${topic} can open new opportunities.`,
    `To sum up, ${topic} is essential for future growth.`,
  ];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // 🔥 FIX: LENGTH BASED CONTENT GENERATION
  let paragraphs = Math.floor(length / 80); // controls size
  paragraphs = Math.max(4, paragraphs); // minimum size

  let content = `📝 Introduction:\n${random(intros)}\n\n`;
  content += `📖 Main Content:\n`;

  for (let i = 0; i < paragraphs; i++) {
    content += `- ${random(bodies)}\n`;
  }

  // 🔥 Extra section for long articles
  if (length > 1000) {
    content += `\n📊 Additional Insights:\n`;
    content += `- ${random(bodies)}\n`;
    content += `- ${random(bodies)}\n`;
  }

  content += `\n✅ Conclusion:\n${random(conclusions)}`;

  return content;
};

// ================= ARTICLE =================
export const generateArticle = async (req, res) => {
  try {
    console.log("MOCK API HIT 🚀");

    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ success: false });
    }

    const { prompt, length } = req.body;

    if (!prompt || !length) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    // ✅ Clean prompt
    const cleanPrompt = prompt
      .replace(/write about/gi, "")
      .replace(/article on/gi, "")
      .trim();

    // ✅ Generate content based on length
    const content = generateSmartMock(cleanPrompt, length);

    // ⏳ Delay for realism
    await new Promise((r) => setTimeout(r, 1500));

    // ✅ Save in DB
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, prompt, content, "article"]
    );

    // ✅ Update usage
    const user = await clerkClient.users.getUser(userId);
    const free_usage = user.privateMetadata?.free_usage || 0;

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });

    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log("ERROR:", error);
    
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= BLOG TITLES =================
export const generateBlogTitles = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false });
    }

    const styles = [
      `Top 10 Powerful Facts About ${prompt}`,
      `Why ${prompt} Will Change Everything`,
      `The Ultimate Guide to ${prompt}`,
      `7 Shocking Truths About ${prompt}`,
      `How ${prompt} Is Transforming The World`,
      `Beginner's Guide to ${prompt}`,
      `Is ${prompt} The Future?`,
      `${prompt}: What Nobody Tells You`,
    ];

    const shuffled = [...styles].sort(() => Math.random() - 0.5);
    const titles = shuffled.slice(0, 5);

    // 🔥 STORE IN DB
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, prompt, JSON.stringify(titles), "blog_titles"]
    );

    res.json({ success: true, titles });

  } catch (err) {
    console.log("BLOG TITLES ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= IMAGE =================
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false });
    }

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt required",
      });
    }

    // 🧠 REALISTIC IMAGE MAP (main logic)
    const imageMap = {
      car: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      ],
      ai: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      ],
      nature: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      ],
      food: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      ],
    };

    const lowerPrompt = prompt.toLowerCase();

    let images = null;

    // 🔥 SMART MATCH (works for "red car", "sports car")
    for (let key in imageMap) {
      if (lowerPrompt.includes(key)) {
        images = imageMap[key];
        break;
      }
    }

    // 🔁 FALLBACK (only if no match found)
    if (!images) {
      images = Array.from({ length: 4 }).map((_, i) => {
        return `https://picsum.photos/seed/${encodeURIComponent(
          prompt + i
        )}/800/500`;
      });
    }

    // ⏳ Delay for realism
    await new Promise((r) => setTimeout(r, 1500));

    // 💾 Save in DB
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, prompt, JSON.stringify(images), "image"]
    );

    return res.json({
      success: true,
      images,
    });

  } catch (err) {
    console.log("IMAGE ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= REMOVE BG =================
export const removeBackground = async (req, res) => {
  try {
    const { userId } = req.auth();

    // ✅ FIX: Check if userId exists
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // ⏳ Fake processing delay
    await new Promise((r) => setTimeout(r, 1500));

    // 🔥 Fake "background removed" image
    const image =
      "https://pngimg.com/uploads/car/car_PNG1640.png"; // transparent bg example

    // 💾 Save in DB
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, "remove-bg", image, "remove_bg"]
    );

    res.json({
      success: true,
      image,
    });

  } catch (err) {
    console.log("REMOVE BG ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= REMOVE OBJECT =================
export const removeObject = async (req, res) => {
  try {
    const { userId } = req.auth();

    // ✅ FIX: Check if userId exists
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const { prompt } = req.body;

    // ⏳ fake delay
    await new Promise((r) => setTimeout(r, 1200));

    // 💾 save action (no image needed)
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, prompt || "remove-object", "interaction-based", "remove_object"]
    );

    // ✅ IMPORTANT: no image return
    return res.json({
      success: true,
    });

  } catch (err) {
    console.log("REMOVE OBJECT ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= RESUME REVIEW =================
export const reviewResume = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { text } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false });
    }

    if (!text) {
      return res.json({ success: false });
    }

    const resume = text.toLowerCase();

    // 🎯 ATS KEYWORDS (for software roles)
    const keywords = [
      "javascript",
      "react",
      "node",
      "api",
      "database",
      "git",
      "project",
      "team",
      "problem solving",
    ];

    // 🔍 Find matched & missing
    const matched = keywords.filter((k) => resume.includes(k));
    const missing = keywords.filter((k) => !resume.includes(k));

    const matchScore = Math.floor((matched.length / keywords.length) * 100);

    // 🧠 Mistake detection
    const mistakes = [];

    if (!resume.includes("project")) {
      mistakes.push("No projects mentioned");
    }

    if (!resume.includes("experience")) {
      mistakes.push("No experience section");
    }

    if (text.length < 300) {
      mistakes.push("Resume too short");
    }

    if (!resume.includes("github")) {
      mistakes.push("No GitHub/portfolio link");
    }

    const result = {
      score: matchScore,
      matched,
      missing,
      mistakes,
    };

    // 💾 Save
    await pool.query(
      `INSERT INTO creations (user_id, prompt, content, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, "resume-analysis", JSON.stringify(result), "resume_review"]
    );

    await new Promise((r) => setTimeout(r, 1200));

    res.json({ success: true, result });

  } catch (err) {
    console.log("RESUME REVIEW ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= TOGGLE LIKE =================
export const toggleLike = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.params;

    // ✅ FIX: Check if userId exists
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // ✅ FIX: Check if post exists before accessing
    const post = await pool.query(
      "SELECT likes FROM creations WHERE id=$1",
      [id]
    );

    if (!post.rows || post.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    let likes = post.rows[0].likes || [];

    if (likes.includes(userId)) {
      likes = likes.filter((u) => u !== userId);
    } else {
      likes.push(userId);
    }

    await pool.query(
      "UPDATE creations SET likes=$1 WHERE id=$2",
      [likes, id]
    );

    res.json({ success: true, likes });

  } catch (err) {
    console.log("TOGGLE LIKE ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= GET COMMUNITY POSTS =================
export const getCommunityPosts = async (req, res) => {
  try {
    // ✅ FIX: Add try-catch wrapper
    const result = await pool.query(
      "SELECT * FROM creations ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      posts: result.rows || [],
    });

  } catch (err) {
    console.log("GET COMMUNITY POSTS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};