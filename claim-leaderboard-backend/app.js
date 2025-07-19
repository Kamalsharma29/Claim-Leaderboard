const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ CORS Configuration (Allow localhost + Vercel)
const allowedOrigins = [
  'http://localhost:5173',
  'https://claim-leaderboard.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Port & Mongo URI
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/claim-leaderboard';

// Start server and DB connection
async function startServer() {
  try {
    if (!MONGO_URI) throw new Error("Missing MongoDB URI");

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

startServer();




