
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
const cors = require('cors');
app.use(cors({
  origin: 'https://vedi-gorakh.github.io/BIASBOX'
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
