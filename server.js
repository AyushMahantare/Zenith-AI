import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './confgs/db.js';
import { clerkMiddleware } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite default)
  credentials: true
}));
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Basic route
app.get('/', (req, res) => {
  res.send('Server is Live 🚀');
});

// ✅ AI Routes
app.use('/api/ai', aiRouter);

// ✅ DB Test Route
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      time: result.rows[0]
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

// ✅ Global Error Handler (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

// ✅ Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});