import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './confgs/db.js'; 
import { clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('Server is Live'));

app.use(requireAuth())
app.use('/api/ai',aiRouter)


// ✅ DB TEST ROUTE
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send('DB Error');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on PORT', PORT);
});