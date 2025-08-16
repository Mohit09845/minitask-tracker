import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path'

import authRoutes from './routes/authRoute.js';
import taskRoutes from './routes/taskRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
  
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});