import express from 'express';
import cors from 'cors';
import "dotenv/config"
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json()); 
app.use(cookieParser());

app.get('/ping', (_, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});