// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const connectDB = require("./config/db");
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use('/api/auth', authRoutes);
// app.use('/api/user', require('./routes/userRoutes'));       // profile, password
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/profile', profileRoutes);

// const FRONTEND_URL = process.env.FRONTEND_URL || 'https://vedi-gorakh.github.io/BIASBOX/';

// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(5000, () => console.log('✅ Server running on http://localhost:5000')))
//   .catch(err => console.error('❌ MongoDB connection failed:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(express.json());

// CORS - allow only your frontend
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://vedi-gorakh.github.io/BIASBOX';
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);       // profile, password, addresses
app.use('/api/orders', orderRoutes);
app.use('/api/profile', profileRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
